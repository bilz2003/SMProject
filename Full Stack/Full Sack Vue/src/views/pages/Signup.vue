<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-sm-8">
          <h1 class="text-center mt-5">Sign Up</h1>
  
          <form @submit.prevent="handleSubmit" class="mt-4">
              <div class="form-group">
                <label for="first_name">First Name:</label>
                <input type="text" name="first_name" v-model="first_name" class="form-control"/>
                <div v-show="submitted && !first_name" class="invalid-feedback">First name is required</div>
              </div>
              
              <div class="form-group mt-3">
                <label for="last_name">Last Name:</label>
                <input type="text" name="last_name" v-model="last_name" class="form-control"/>
                <div v-show="submitted && !last_name" class="invalid-feedback">Last name is required</div>
              </div>
  
              <div class="form-group mt-3">
                <label for="username">Username:</label>
                <input type="text" name="username" v-model="username" class="form-control"/>
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
              </div>
  
              <div class="form-group mt-3">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password" class="form-control"/>
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
              </div>
  
              <div class="d-grid gap-2 mt-4">
                <button class="btn btn-outline-purple">Sign Up</button>
              </div>
          </form>
        </div>
        <div class="back-button-container mt-3 d-flex justify-content-center">
      <BackButton/>
    </div>
      </div>
    </div>
  </template>
  

<script>
import {userService} from "../../services/loginForm";
import BackButton from "../../views/components/backButton.vue";

    export default {
    data() {
        return {
            first_name:"",
            last_name:"",
            username: "",
            password: "",
            error:"error",
            submitted: false
        };
    },
    methods: {
        handleSubmit(e) {
            this.submitted = true;
            this.error =""

            const { first_name, last_name, username, password } = this;
            if (!(first_name && last_name && username && password)) {
                return;
            }
            const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
            if (!(password_pattern.test(password))) {
                this.error = "Make a stronger password";
                return;
            }
            userService.signup(first_name, last_name, username, password)
                .then(result => {
                console.log("Auth Successful");
                alert("Sign Up Successful");
            })
                .catch(error => {
                this.error = error;
                this.submitted = false;
            });
        }
    },
    components: { BackButton }
}
</script>

<style>

.invalid-feedback {
  display: block;
  color: red;
}

.text-purple {
  color: #6a1b9a !important; 
}

.text-orange {
  color: #ff9800 !important; 
}

.btn-outline-purple {
  color: #6a1b9a;
  border-color: #6a1b9a;
}

.btn-outline-purple:hover {
  background-color: #6a1b9a;
  color: white;
}

.btn-outline-orange {
  color: #ff9800;
  border-color: #ff9800;
}

.btn-outline-orange:hover {
  background-color: #ff9800;
  color: white;
}

</style>