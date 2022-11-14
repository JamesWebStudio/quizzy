<template>
<section id="review">
    <h2>Review Your Quiz</h2>
    <hr>
    <div id="head-section">
        <label>Quiz Name</label> 
        <input type="text" v-model="store.newQuiz.quizName">
        <label>Quiz Category</label>
        <input type="text" v-model="store.newQuiz.quizCategory">
        <label>Quiz Description</label>
        <input type="text" v-model="store.newQuiz.quizDesc">
        <label style="display:block;" class="mb-3">Total Questions : {{ store.newQuiz.questionData.length }}</label>
    </div>
    <div id="body-section">
        <div v-for="(question, index) in store.newQuiz.questionData">
            <label for="">{{ index + 1 }}.  Question</label>
            <input type="text" v-model="question.question"/>
            <div class="question-data-section">
                <div class="correct-answer-section">
                    <label>Correct Answer</label>
                    <input type="text" v-model="question.correctAnswer">
                </div>
                <div class="answer-section">
                    <label>Answers</label>
                    <input type="text" v-model="question.answerA">
                    <input type="text" v-model="question.answerB">
                    <input type="text" v-model="question.answerC">
                    <input type="text" v-model="question.answerD">
                </div>
            </div>
            <hr>
        </div>
    </div>
    <button class="btn btn-priimary" @click="uploadQuiz">Accept and Upload</button>
</section>
</template>
<script setup lang="ts">
import { useQuizStore } from '@/stores/quiz'
import { onMounted } from 'vue';
import axios from 'axios'
import router from '@/router';

const store = useQuizStore()

onMounted(() => {
    if(!store.user || !store.newQuiz) {
        router.push('/signin')
    }
})

function uploadQuiz() {
    store.newQuiz.creator_id = store.user.id
    store.newQuiz.creator = store.user.username   
    store.newQuiz.questionCount = store.newQuiz.questionData.length
    axios.post('http://localhost:3333/newquiz', store.newQuiz)
    .then(data => {

    })
    .catch(err => {
        console.log(err.message)
    })
}
</script>

<style scoped>
#review {
    color: white;
    display:flex;
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
    background: white;
}

h4, h2 {
    color: white;
    font-weight: bold;
    text-align:center;
}

#head-section {
    display:flex;
     align-items: center;
    padding: 0;
    justify-content:center;
    flex-direction:column;
    border: 3px solid white;
    background: white;
}

#head-section label {
    
}

#body-section {
    display:flex;
    /* border: 2px solid bisque; */
    align-items: center;
    padding-top: 20px;
    justify-content:center;
    flex-direction:column;
    
}

#body-section div {
    display:flex;
    align-items: center;
    width:100%;
    padding-top: 20px;
    justify-content:center;
    flex-direction:column;
}

#body-section div input, #head-section input {
    width:100%;
    min-width:600px;
    font-size: 1rem;
}
/* .answer-section {
    display:flex;
    flex-wrap: wrap;
} */
.question-data-section {
    display: flex;
    align-items: center;
    padding: 0;
    justify-content:flex-start;
    flex-direction:column;
    border-bottom: 1px solid grey;
    
}

/* .correct-answer-section {
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items: center;
} */

h2 { 
    margin-bottom:20px;
}

label {
    margin-bottom:0;
    font-size: 1.2rem;
    color: white;
    display:block;
    background: var(--btn-gradient);
    width: 100%;
    text-align: center;
    padding:10px;
}

input {
    margin-top:5px;
    margin-bottom: 20px;
    padding:10px;
    border-radius: 5px;
    /* max-width: fit-content; */
    width: 90%;
    max-width:320px;
    font-weight: bold;
    border:none;
    text-align:center;
    background: bisque;
}

input:focus {
    border: 4px solid red;
    padding:7px;
}

hr {
    color: var(--btn-gradient);
    height: 2px;
}

.btn {
    background: var(--btn-gradient);
    color: white;
    display:flex;
    justify-content: center;
    margin-bottom: 20px;
    width:90%;
    margin: 20px auto;
}
</style>
