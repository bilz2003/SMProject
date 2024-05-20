<template>
    <button @click="goBack" class="btn btn-outline-purple">
      Go Back
    </button>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        this.$router.go(-1); 
      },
    },
  };
  </script>
  
  <style>

  .btn-outline-purple {
    color: #6a1b9a;
    border-color: #6a1b9a;
  }
  
  .btn-outline-purple:hover {
    background-color: #6a1b9a;
    color: white;
  }
  </style>
  