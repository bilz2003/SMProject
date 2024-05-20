<template>
    <div>
        <form>
        <ul>
            <li v-for="user in users.posts" :key="user.post_id">
                {{ post.text }}
            </li>
        </ul>
        </form>
    </div>
</template>

<script>
    export default {
    data() {
        return {
            // Variable for the text field
            newItem: '',
            // Array to hold the list items
            todo_list: []
        }
    },
    methods: {
        handleSubmit() {
            // Validate that the text field isn’t empty
            if (this.newItem.trim() !== '') {
                // Add the item to the list
                this.todo_list.push(this.newItem);
                // Clear the text field
                this.newItem = '';
            } else {
                // Handle empty input (optional, e.g., display an alert or a message)
                alert('Please enter an item.');
            }
        }
    }
}
</script>