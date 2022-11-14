<template>
    <div>
        dashboard
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios'
    import { useQuizStore } from '@/stores/quiz.js'

    const store = useQuizStore()

    axios.get('http://localhost:3333/' + store.user.id)
    .then(user => {

    })
    .catch(err => {
        
    })
</script>

<style scoped>


</style>