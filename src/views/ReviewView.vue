<template>
<div>
    <h4>Review Your Quiz</h4>
    <section>
        <ul>
            <li v-for="(question, index) in store.quizResult" :key="question.question">
                <div id="review-data">
                    <h4>{{ index + 1 }}: {{ question.question }}</h4>
                    <h5>Your answer: {{ question.answer }}</h5>
                    <h5>Correct answer: {{ question.correctanswer }}</h5>
                    <img id="correct-svg" v-if="question.answer === question.correctanswer" @load="score++" src="@/assets/check-solid.svg">
                    <img id="incorrect-svg" v-else src="@/assets/xmark-solid.svg">
                </div>
            </li>
            <h4 style="text-align: center;">You scored {{ score }}</h4>
            <button @click="saveScore" v-if="store.user.username">Save Score</button>
        </ul>
        
    </section>
</div>

</template>

<script setup lang="ts">
import { useQuizStore } from '@/stores/quiz'
import { ref, onBeforeUnmount } from 'vue'
import axios from 'axios'

const store = useQuizStore()
const results = store.quizResult
let score = ref<number>(0)

function saveScore() {
    if(store.user.username.length < 3) {
        return
    }
    axios.post('http://localhost:3333/savescore', { id: 'T', user: store.user.username, score: score.value })
    .then(data => {
        console.log('Data: ', data)
    })
    .catch(err => {
        console.log(err.message)
    })
    
}

onBeforeUnmount(() => {
    store.quizResult = []
    store.activeQuiz = []
})

</script>
<style scoped>
#review-data {
    margin: auto;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 650px;
    border: 3px solid white;
    border-radius: 10px;
    padding: 10px;
}

h4 {
    margin-bottom:40px;
    color: white;
}
h5, section {
    color: white;
}

h5:first-of-type {
    margin-bottom:25px;
}

li {
    list-style: none;
    margin-bottom:20px;
}

button {
    margin: 30px auto;
    width:100%;
}

</style>