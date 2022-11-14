<template>
<div id="categories-section">
    <div class="alert alert-danger" v-if="store.errorMessage">{{ store.errorMessage }}</div>
    <button v-for="category in store.categoriesList" :key="category" class="category-button" @click="loadCategory(category)">{{ category }}</button>
</div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useQuizStore } from '@/stores/quiz'

const store = useQuizStore()

store.setCategoriesList()

function loadCategory(category: string) {
    store.setCategoryList(category)
    router.push('/Quizzies')
}

</script>

<style scoped>
#categories-section {
    color: white;
    margin-bottom:30px;
    width:100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    text-align:center;
    
}

.category-button {
    display: flex;
    justify-content: center;
    width:300px;
    margin:0 auto;
    padding:3px;
    color: white;
    background: var(--btn-gradient);
    height: 40px;
    font-size: 1.2rem;
    border: none;
}

.category-button:hover {
    border: 3px solid white;
    padding:0;
}
</style>