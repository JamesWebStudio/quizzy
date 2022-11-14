<!-- Templete for a single quiz -->
<template>
    <div id="quizView">
        <section id="quizMetaSection">
            <h3 id="question-title">{{ quiz[0].name }}</h3> 
            <div id="subMeta">
                <h4>Created By {{ quiz[0].creator }}</h4>
                <h4>{{ quiz.length / 4 }} Questions</h4>
            </div> 
            <p id="info">{{ quiz[0].description }}</p>
            <h5 id="timed" v-if="quiz[0].timed">Time Limit {{ quiz[0].time_limit }} minutes</h5>
            <section id="clock" v-if="1">
                
            </section>
            <div id="time-group" v-if="quiz[0].timed">
                <button class="btn" id="start-btn" @click="startQuiz">START</button>
                <div><h3>{{ remainingTime }} seconds</h3></div>
                <button class="btn" id="stop-btn" @click="endQuiz">STOP</button>
            </div>
        </section>
        <section id="loader" v-if="loading">
            <h4>Loading Quiz...</h4>
        </section>  
        <section id="content" v-else>
            <section v-if="quizCompleted === false"> 
                {{ quiz[0] }}
                <hr>
                {{ quiz[4] }}
                <hr>
                {{ quiz[8] }}
                <hr>
                {{ count }} 
                <h4 id="question-title">{{ quiz[count].question }}</h4>
                <section id="answers">
                    <button class="btn answer-btn" @click="selectedAnswer = quiz[count].answer">{{ quiz[count].answer }}</button>
                    <button class="btn answer-btn" @click="selectedAnswer = quiz[count + 1].answer">{{ quiz[count + 1].answer }}</button>
                    <button class="btn answer-btn" @click="selectedAnswer = quiz[count + 2].answer">{{ quiz[count + 2].answer }}</button>
                    <button class="btn answer-btn" @click="selectedAnswer = quiz[count + 3].answer">{{ quiz[count + 3].answer }}</button>
                </section>
                <button id="submit-btn" class="submit-btn" @click="submit">Submit</button>
            </section>
            <section v-else>
                <QuizCompleted />
            </section>
        </section>
        <section id="leaderboard">
            <!-- <Leaderboard quiz= /> -->
        </section>
    </div>
</template>

<script setup lang="ts">
    import { useQuizStore } from '@/stores/quiz'
    import axios from 'axios';
    import { ref, reactive, computed, onBeforeUnmount } from 'vue'
    import { useRouter } from 'vue-router'
    import QuizCompleted from '@/components/QuizCompleted.vue'
    import Leaderboard from '../components/Leaderboard.vue'
    
    const router = useRouter()    
    const store = useQuizStore()
    let quiz = store.getActiveQuiz
    let count = ref<number>(0)
    let selectedAnswer = ref<string>('')
    let loading = ref<boolean>(true)
    let remainingTime = ref<number>(0)
    let started = ref<boolean>(false)
    let quizCompleted = ref<boolean>(false)
    //let timeExpired = ref<boolean>(false)
    let result = ref<object>({
        question: '',
        correctanswer: '',
        answer: ''
    })
    let timer = 0
    
    // remainingTime.value = store.quizMeta[7] * 60
    function quizTimer() {
        remainingTime.value--
        if(remainingTime.value === 0 || quizCompleted.value) {
            console.log('Time Up')
            clearInterval(timer)
        }
    }
        
    axios.get('http://localhost:3333/quiz/' + store.quizIndex)
    .then(data => {
        quiz.value = data.data
        loading.value = false
    })
    .catch(err => { 
        console.log(err.message)
    })

    function startQuiz() {
        started.value = true
        count.value = 0
        timer = setInterval(quizTimer, 1000)
    }

    function endQuiz() {
        started.value = false
        count.value = 0
        clearInterval(timer)
    }

    function submit() {
        if(quizCompleted.value === true) { return }
        result.value = {}
        
        if(count.value <= (quiz.length - 4)) {
            result.value = {
                question: quiz[count.value].question,
                answer: selectedAnswer.value,
                correctAnswer: quiz[count.value].correctanswer
            }
            store.setQuizResult(result)
            count.value += 4
            if(count.value > (quiz.length - 1)) {
                quizCompleted.value = true
            }
        }
        else {
            // result.value = {
            //     question: quiz[count.value - 1].question,
            //     answer: selectedAnswer.value,
            //     correctAnswer: quiz[count.value - 1].correctanswer
            // }
            // store.setQuizResult(result)
            
            count.value = 0
            quizCompleted.value = true
        }
    }

    onBeforeUnmount(() => {
        clearTimeout(timer)
    }) 

    components: {
        QuizCompleted
    }
    
 </script>

<style scoped>
    #view {
        color: white;
        display:flex;
        flex-direction:column;
    }

    #question-title {
        margin:80px auto;
    }

    #quizMetaSection {
        background-color:black;
        padding:20px 10px;
        display:flex;
        justify-content: center;
        flex-direction: column;
    }

    #quizMetaSection h3 {
        margin: 0 auto;
    }

    #subMeta {
        margin: 20px;
        display:flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items:center;
    }

    #info {
        text-align:center;
        padding: 10px 1em;
        font-style: italic;
    }

    #timed {
        margin: 0 auto;
    }

    h5, p {
        font-size: 0.9rem;
    }

    #content {
        text-align:center;
        margin-bottom: 30px;
    }

    #content h3 {
        margin: 20px auto 30px;
    }

    #answers {
        display:flex;
        justify-content:space-evenly;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom:20px;
        gap: 1em;
        margin-bottom:20px;
    }
    .answer-btn {
        padding: 15px;
        color:white;
        background: var(--btn-gradient);
        min-width:100px;
    }
    .answer-btn:hover, .answer-btn:focus {
        border: 3px solid white;
        padding: 12px;
    }

    #time-group {
        display:flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
    }

    #time-group div {
        margin-top:20px;
        height: 100%;
        border-radius:10px;
        background-color: black;
        color: red;
        font-size: 2rem;
        padding:20px;
        display:flex;
        justify-content: center;
        align-items: center;
    }

    #start-btn, #stop-btn {
        background: var(--btn-gradient);
        margin: auto 15px;
        color: white;
        padding: 15px;
        font-size: 1.2rem;
    }

    #submit-btn {
        padding:10px;
        margin-top:50px;
        min-width: 150px;
    }


    @media screen and (min-width: 1500px) {
        #quizView {
            display: grid;
            flex-direction: column;
            justify-content: space-evenly;
            grid-area: quizView;
            grid-template-columns: 1fr 300px;
            grid-template-rows: 1fr 1fr;
        }

        #quizMetaSection {
            grid-column: 1 / 2;
            grid-row: 1 / 2;
        }

        #question-title {
            margin:40px auto;
        }

        #content {
            /* display: grid;
            grid-template-columns: 1fr 300px;
            grid-template-areas: "quizView leaderboard" */
        }

        #leaderboard {
            grid-column: 2 / 3;
        }
    }
</style>
