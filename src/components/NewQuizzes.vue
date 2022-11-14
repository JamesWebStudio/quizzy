<template v-once>
<div id="latest-quizzes">
    <!-- <h4>Latest Quizzes</h4> -->
    <div  class="quiz-info-section">
        <div v-for="quiz in store.newestQuizzes" :key="quiz">
            <QuizInfo :id=quiz[0] :name=quiz[1] :category=quiz[2] :author=quiz[6] :questions=quiz[4] :desc=quiz[3] :timed="quiz[6]" />
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
    import QuizInfo from '@/components/QuizzInfo.vue'
    import { useQuizStore } from '@/stores/quiz'

    const store = useQuizStore()
    store.setNewestQuizzes()
</script> 
   
<style scoped>
#latest-qizzes {
    background: var(--primary-background-color);
    color: white;
    margin-top: 30px;
    display:flex;
    flex-wrap: wrap;
}

.quiz-info-section {
    width: 100%;
    display:flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    gap: 10px;
    
} 

h4 {
    color: white;
    text-align:center;
}

@media screen and (min-widrth: 500px) {

}
</style>