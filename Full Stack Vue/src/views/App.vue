<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container-fluid">
        <router-link class="navbar-brand text-purple" to="/">Chirrup</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link text-orange" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-orange" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-orange" to="/userProfile/:id">My Profile</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-orange" to="/Createpost">Create Post</router-link>
            </li>
            <li class="nav-item"><router-link class="nav-link text-orange" to="/Search">Search</router-link></li>
            <li class="nav-item">
              <form @submit.prevent="handleSubmit">
                <button class="btn btn-outline-purple">Logout</button>
              </form> 
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>



<script>
import { userService } from '@/services/loginForm'

export default {


    data() {
        return {
            username: "",
            password: "",
            submitted: false
        }
    },
    methods: {
        handleSubmit(e) {
            userService.logout()
                .then(result => {
                    console.log("Auth Successful")
                    this.$router.push("/")
                })

                .catch(error => {
                    this.error = error;
                    this.submitted = false;
                })
        }
    }

}

</script>

<style>


.text-orange {
  color: #ff9800 !important; 
}

.navbar-light .navbar-nav .nav-link {
  color: rgba(0,0,0,.5);
}


.navbar .navbar-nav {
  align-items: center;
}


.navbar {
  background-color: white; 
  box-shadow: 0 2px 4px rgba(0,0,0,.1); 
}

.navbar-brand {
  font-weight: bold; 
  color: #6a1b9a !important; 
}


@media (max-width: 576px) {
  .navbar-nav .nav-item {
    margin-bottom: 10px;
  }

  .navbar-nav .nav-item:last-child {
    margin-bottom: 0;
  }
}

body {
  padding-top: 5%;
  padding-bottom: 5%;
}

@media (max-width: 768px) {
  .navbar-nav .nav-link {
    font-size: 14px; 
  }
  .navbar .navbar-brand {
    font-size: 18px;
  }
  .nav-item {
    padding: 0 5px; 
  }
}

</style>


