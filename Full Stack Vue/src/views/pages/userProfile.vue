<template>
    <div class="container mt-4">
        <div class="user-profile p-4 shadow-sm rounded text-center">
            <h2 class="text-purple mb-3">{{ users.first_name + " " + users.last_name }}</h2>
            <p class="text-dark mb-2"><strong>Username:</strong> {{ users.username }}</p>
            <p>
                <strong>Followers:</strong> {{ users.followers.length }}
                <strong>Following:</strong> {{ users.following.length }}
            </p>
        </div>
    </div>
</template>


<script>
import { postService } from '@/services/getUserProfile';

export default{
    data(){
        return{
            users:[],
            error: "",
            loading: true,
            storage:localStorage.getItem('user_id')
        }
    },

    created(){
        postService.getUserProfile(this.storage)
        .then(users =>{
            this.users = users
        })
        .catch(error => this.error = error);
    }
}

</script>

<style>
.container {
  padding-top: 70px; 
}

.text-purple {
  color: #6a1b9a; 
}
</style>



