<template>
    <div>
        <h1>Comments</h1>
        <Comment v-for="(comment, index) in comments" :key="index"
            :comment_text="comment.comment_text"
            :author="comment.author"
            :date_published="comment.date_published" />

    </div>
</template>

<script>
    export default{
        data(){
            return{
                comments:[
                {comment_text:"Nice Shirt", author: "Ben", date_published:"10/1/2023"},
            {comment_text:"Nice jeans", author: "Ben", date_published:"10/1/2023"},
            {comment_text:"Nice car", author: "Ben", date_published:"10/1/2023"}
                ]
            }
        }   
    }
</script>