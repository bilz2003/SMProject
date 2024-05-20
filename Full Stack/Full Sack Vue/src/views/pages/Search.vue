<template>
  <div class="container mt-4">
    <div class="search-bar mb-4">
      <input type="text" class="form-control" placeholder="Search for users..." v-model="searchQuery"
        @input="handleSearch" />
    </div>
    <!-- <div if="error" class="alert alert-danger">
          {{ error }}
      </div> -->
    <div v-if="users.length > 0">
      <ul class="list-group">
        <li v-for="user in users" :key="user.user" class="list-group-item">
          {{ user.first_name }} {{ user.last_name }} - {{ user.username }}
        </li>
      </ul>
    </div>
    <div v-else class="no-results">
      No users found.
    </div>
  </div>
</template>
  
<script>
import { postService } from "../../services/getUserProfile"

export default {
  data() {
    return {
      searchQuery: '',
      users: [],
      error: ''
    };
  },
  methods: {
    handleSearch() {
      const searchQuery = this;
      if (this.searchQuery.trim() === '') {
        this.users = [];
        return;
      }

      postService.search(this.searchQuery)
        .then(data => {
          this.users = data;
        })
        .catch(error => {
          this.error = 'Failed to search';
        });
    },
  }
}

</script>
  
  