<template>
    <div id="quiz-section">
        <h2 class="mb-5">Quizzes</h2>
        <div v-for="(quiz, index) in store.categoryList" :key="quiz[0]" class="quiz-meta mb-5">
            <h3>{{ quiz[1] }}</h3>
            <p>Author: {{ quiz[5] }}</p><p>{{ quiz[3] }}</p><p v-if="toBool(quiz[6])">Duration:  {{ quiz[7] }} minutes</p>
            <button class="btn" @click="play(quiz[0])">Play</button> 
        </div>
    </div>
</template>

<script setup lang="ts">
    import router from '@/router';
    import { useQuizStore } from '@/stores/quiz'
    import axios from 'axios'
    
    const store = useQuizStore()

    function toBool(t: number) {
        return t === 0 ? false : true
    }

    function play(id: number) {
        axios.get('http://localhost:3333/quiz/'+ id)
        .then(data => {
            store.setActiveQuiz(data.data)  
            store.setQuizMeta(id)      
            router.push('quiz')
        })
        .catch(err => {
            console.log(err.message)
        })
    }
</script>

<style scoped>
#quiz-section {
    color: white;
}

.quiz-meta {
    color: white;
    padding:10px 5px;
    border-bottom:2px solid black;
}

.quiz-meta h3 {
    margin-bottom:2rem;
    font-style: italic;
    letter-spacing: 2px;
}

.btn {
    background: var(--btn-gradient);
    color: white;
    font-size: 1.5rem;
    width: 200px;
    max-width: 200px;
    margin: 0 auto;
    display:flex;
    justify-content:center;}




</style>