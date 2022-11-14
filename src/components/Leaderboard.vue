<template>
<section>
    <h3>Leaderboard</h3>
    <section id="scores">
        <ul>
            <li v-for="leaderboard in highScores" :key="leaderboard">
                {{ leaderboard }}
            </li>
        </ul>
    </section>
</section>
</template>

<script setup lang="ts">
import { ref }from 'vue'
import axios from 'axios'
import { useQuizStore } from '@/stores/quiz'

const store = useQuizStore()

const props = defineProps({
    quiz: {
        required: true,
        type: String
    }
})

let highScores = ref([])

axios.get("http://localhost:3333/quizleadingscores/" + props.quiz)
.then(data => {
    console.log('Leading scores: ', data)
    highScores.value = data.data
})
.catch(err => {
    console.log(err.message)

})
</script>


<style scoped>
    #scores {
        color: white;
    }
h3 {
    color: white;
}

section { 
    display: none;
}
</style>