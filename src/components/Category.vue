<template>
    <div>
        <h2>{{ category }} quizzes</h2>
        <div></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

let category = ref('')

axios.get('http://localhost:3333/category')
.then(data => {
    
})
.catch(err => {
    console.log(err.message)
})


</script> 