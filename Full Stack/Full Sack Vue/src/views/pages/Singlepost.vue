<template>
    <div class="container mt-4 d-flex justify-content-center align-items-center">
      <div class="post-content p-4 shadow-sm rounded w-100">
        <p class="author text-purple"><strong>Author:</strong> {{ firstname + " " + lastname }}</p>
        <p class="text"><strong>Text:</strong> {{ posts.text }}</p>
        <p class="date"><strong>Date:</strong> {{ posts.timestamp }}</p>
        <p class="likes"><strong>Likes:</strong> {{ likes }}</p>
        <button @click="likePost" class="btn btn-outline-purple mr-2">Like</button> 
        <button @click="unlikePost" class="btn btn-outline-purple mr-2">Unlike</button>

        <div v-if="storage === JSON.stringify(posts.author.user_id)">
        <button @click="deletePost(posts.post_id)" class="btn btn-danger mt-3">Delete Post</button>
      </div>
      </div>
    </div>
    <div class="back-button-container mt-3 d-flex justify-content-center">
      <BackButton/> 
    </div>
  </template>
  

<script>
import { createService } from '@/services/createPost';

import BackButton from '../components/backButton.vue';


export default{
    data() {
        return {
            posts: {},
            error: "",
            firstname: "",
            lastname: "",
            likes: "",
            storage: localStorage.getItem("user_id")
        };
    },
    created() {
        createService.getSinglePost(this.$route.params.id)
            .then((posts) => {
            this.posts = posts;
            this.firstname = posts.author.first_name;
            this.lastname = posts.author.last_name;
            console.log(this.firstname);
            this.likes = posts.likes.length;
        })
            .catch(error => this.error = error);
    },
    methods: {
        deletePost(postId) {
            // Call your delete service here
            createService.deletePost(postId)
                .then(response => {
                    // Handle the success (maybe redirect to a different page or refresh the list)
                    this.$router.push("/"); 
                  })
                .catch(error => {
                    this.error = error;
                });
        },
        likePost(){
          createService.like(this.$route.params.id)
          .then(post =>{
            alert("Post Liked")
          })
          .catch(error => this.error = error);
        },

        unlikePost(){
          createService.removeLike(this.$route.params.id)
          .then(post =>{
            alert("Post Unliked")
          })
          .catch(error => this.error = error);
        }
    },
    components: { BackButton, BackButton }
}
</script>

<style>

.post-content {
  background-color: white; 
  color: rgba(0, 0, 0, 0.8);
  max-width: 600px;
}
.author {
  color: #6a1b9a;
  font-size: 1.1em;
}

.text, .date, .likes {
  color: rgba(0, 0, 0, 0.7);
  margin-top: 0.5em;
}

.alert-danger {
  border-color: #6a1b9a; /* Consistent theme color */
}

.mr-2 {
  margin-right: 0.5rem; /* Bootstrap 4 spacing utility class */
}

</style>
