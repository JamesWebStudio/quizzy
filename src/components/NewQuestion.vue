<template>
    <div id="newQuiz=section" :class="{ error: v$.question.$errors.length }">
        <label for="question">Question</label>
        <textarea name="question" placeholder="Your Question" cols="30" rows="2" v-model="data.question" id="question-input"></textarea>
        <span class="input-errors" v-for="(error, index) of v$.question.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
        </span>
        <hr>
        <ul>
            <li>
                <label for="correctAnswer">Correct Answer</label>
                <textarea name="correctAnswer" id="" cols="60" rows="1" v-model="data.correctAnswer" placeholder="correct answer" class="mb-1 answer-input"></textarea>
                <span class="input-errors mb-4" v-for="(error, index) of v$.correctAnswer.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                </span>
            </li>
            <li>
                <label for="answerA">Answer 1</label>
                <textarea name="answerA" id="" cols="60" rows="1" v-model="data.answerA" class="mb-1 answer-input"></textarea>
                <span class="input-errors mb-3" v-for="(error, index) of v$.answerA.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                </span>
            </li>
            <li>
                <label for="answerA">Answer 2</label>
                <textarea name="answerB" id="" cols="60" rows="1" v-model="data.answerB" class="mb-1 answer-input"></textarea>
                <span class="input-errors mb-3" v-for="(error, index) of v$.answerB.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                </span>
            </li>
            <li>
                <label for="answerA">Answer 3</label>
                <textarea name="answerC" id="" cols="60" rows="1" v-model="data.answerC" class="mb-1 answer-input"></textarea>
                <span class="input-errors mb-3" v-for="(error, index) of v$.answerC.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                </span>
            </li>
            <li>
                <label for="answerA">Answer 4</label>
                <textarea name="answerD" id="" cols="60" rows="1" v-model="data.answerD" class="mb-1 answer-input"></textarea>
                <span class="input-errors mb-3" v-for="(error, index) of v$.answerD.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                </span>
            </li>
        </ul>
        <button @click.prevent="setQuestion" name="submit">Next Question</button>  <!-- :disabled="v$.$invalid" -->
    </div>

</template>
<script setup lang="ts">
import { reactive, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { useQuizStore } from '@/stores/quiz';

const store = useQuizStore()
let data = reactive({
    question: <string>'',
    correctAnswer: <string>'',
    answerA: <string>'',
    answerB: <string>'',
    answerC: <string>'',
    answerD: <string>''
})

const rules = computed(() => {
    return {
        question: { required, minLength: minLength(10)},
        correctAnswer: { required },
        answerA: { required },
        answerB: { required },
        answerC: { required },
        answerD: { required }
    }
})

function resetQuestionData() {
    data.question = '',
    data.correctAnswer = '',
    data.answerA = '',
    data.answerB = '',
    data.answerC = '',
    data.answerD = ''
}

const v$ = useVuelidate(rules, data)

async function setQuestion() {
    const validated = await v$.value.$validate()
    const subData = {...data}

    if(validated) {
        store.newQuiz.questionData.push(subData)
        let questionInput = document.getElementById('question-input') as HTMLInputElement
        resetQuestionData()
        questionInput.focus()
    } 
}

</script>

<style scoped>
#newQuiz-section {
    display:flex;
    flex-direction: column;
    margin: 0 1em;
    position: relative;
    border: 2px solid white;
}

ul {
    padding:0;
}

li {
    list-style-type:upper-alpha;
    display:flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 100vw;
    margin: 0;
}

textarea {
    max-width:100vw;
    padding-left:10px;
    display: block;
}

label {
    margin-right: 20px;
}

span {
    color: red;
    font-size: 1em;
}

#question-input {
    width:100%;
}

.answer-input {
    width:100%;
}

</style>

      