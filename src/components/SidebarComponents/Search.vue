<template>
<div id="search-box" class="ml-auto">
    <input class="form-control me-2" type="search" placeholder="Search Quiz Name" aria-label="Search" v-model="name">
    <button class="btn btn-outline-success" @click="search">Search</button>
</div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from 'axios'
import router from '@/router';
import { useQuizStore } from '@/stores/quiz';

let name = ref('')
let quiz = reactive({})

const store = useQuizStore()

function search() {
    // if(name.value.length < 2) return
    
    axios.get('http://localhost:3333/search/' + name.value)
    .then(data => {
        //store.searchedQuizList = data.data
        store.setSearchedQuizzes(data)
        
        router.push('QuizSearchView')
        name.value = ''
    })
    .catch(err => {
        console.log(err.message)
    })
}
</script>

<style scoped>
#search-box {
    display:flex;
    flex-wrap:wrap;
    align-items: baseline;
    margin: 20px auto;
    width: 300px;
}

button {
    margin-top:20px;
    width: 100%;
    
}
</style>