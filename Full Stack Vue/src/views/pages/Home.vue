<template>
    <div class="container mt-5">
        <ul class="list-group" v-if="posts.length">
            <li class="list-group-item" v-for="post in posts" :key="post.post_id">
                <router-link :to="'/posts/' + post.post_id" class="text-dark d-block">
                    {{ post.text }}
                </router-link>
            </li>
        </ul>
        <div v-if="error" class="alert alert-danger mt-3">
            {{ error }}
        </div>
    </div>
</template>
  
<script>
import { feedService } from "../../services/getFeed"

export default {
    data() {
        return {
            posts: [],
            error: "",
            loading: true
        }
    },

    mounted() {
        feedService.getFeed()
            .then(posts => {
                this.posts = posts
            })
            .catch(error => this.error = error);
    }
}

</script>

<style>
.list-group-item {
    margin-bottom: 20px; 
    border: none; 
    border-radius: 5px; 
    background-color: #f8f9fa; 
    text-align: center; 
}

.list-group-item:last-child {
    margin-bottom: 0; 
}

.list-group-item:hover {
    background-color: #e9ecef; 
}

.list-group-item .router-link,
.list-group-item .router-link-active, 
.list-group-item .router-link:active, 
.list-group-item .router-link:visited {
    text-decoration: none !important;
    color: inherit;
    display: block;
    padding: 10px 0; 
}

@media (max-width: 768px) {
    .list-group-item {
        font-size: 14px;
        margin-bottom: 15px; 
    }
}
</style>
