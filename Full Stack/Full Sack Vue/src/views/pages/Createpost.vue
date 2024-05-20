<template>
    <div class="container d-flex h-100">
        <div class="row justify-content-center align-self-center w-100">
            <div class="col-md-6">
                <form @submit.prevent="handleSubmit" class="p-3 mb-2 bg-light text-dark rounded">
                    <div class="form-group">
                        <label for="text" class="font-weight-bold text-purple">Post:</label>
                        <input type="text" name="text" v-model="text" class="form-control" placeholder="Enter your text" required/>
                        <div v-show="text && !text" class="text-danger">Text is required</div>
                    </div>
                    <br><br>
                    <div class="button-container"><button type="submit" class="btn btn-outline-purple">Post</button></div>
                </form>
            </div>
        </div>
    </div>
</template>


<script>

import { createService } from '@/services/createPost';
import { Text } from 'vue';

export default {
    data() {
        return {
            text: "",
            submitted: false
        };
    },
    methods: {
        handleSubmit(e) {
            this.submitted = true;
            const { text } = this;
            if (!(text)) {
                return;
            }
            createService.createPost(text)
                .then(result => {
                console.log("Post Created");
                this.$router.push("/");
            })
                .catch(error => {
                this.error = error;
                this.submitted = false;
            });
        }
    },
    components: { Text }
}
</script>

<style>
/* ... (other styles) ... */

/* Ensure the container takes full height of the viewport */
html, body {
  height: 100%;
}

.container {
  min-height: 100%;
}

.text-purple {
  color: #6a1b9a !important; /* Example purple color */
}

.btn-outline-purple {
  color: #6a1b9a;
  border-color: #6a1b9a;
}

.btn-outline-purple:hover {
  background-color: #6a1b9a;
  color: white;
}

/* Style adjustments for error message */
.text-danger {
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.button-container {
  display: flex;
  justify-content: center; /* Centers the button horizontally */
}
</style>
