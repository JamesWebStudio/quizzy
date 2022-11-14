<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ props.name }}</h5>
            <div class="d-flex justify-content-between quiz-meta">
                <h6 class="card-subtitle">Created By: {{ props.author }}</h6>
            </div>
            <div class="quiz-meta">
                <p>{{ props.desc }}</p>
            </div>
            <div class="detail-group">
                <h6>Category: {{ props.category }}</h6>
                <h6>Questions: {{ props.questions }}</h6>
            </div>
            <div v-if="isTimed">
                <h6>Timed: {{ isTimed }}</h6>
            </div>
            <button class="card-link" @click="gotoQuiz(props.id)">Go To Quiz</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import { useRouter } from 'vue-router'
    import { useQuizStore } from '@/stores/quiz'

    const store = useQuizStore()
    const router = useRouter()
    const props = defineProps({ 
        id: {Number, required: true},
        name: {String, required: true},
        desc: {String, required: true},
        author: {String, required: true},
        questions: {Number, required: true},
        category: {String, required: true},
        timed: { Boolean, required: true}
    })

    let isTimed = computed(timed => {
        return props.timed == 0 ? 'No' : 'Yes'
    })

    function gotoQuiz(id: number) {
        store.setActiveQuiz(id)
        router.push('/quiz')
    }
</script>

<style scoped>
.card {
    width: 100%;
    min-width: 300px;
    max-width:100vw; 
    margin:10px 5px;
    color:white;
    box-shadow: 0px 0px 5px 0px var(--primary-background-color);
    
}

.card-body {
    border: 3px inset white;
    background-color: var(--primary-background-color);
    display:flex;
    justify-content: center;
    flex-direction:column;
    align-items:center;
}

.card-title {
    text-align: center;
    font-size: 1.3rem;
    font-weight:bold;
    margin-bottom:20px;
    background: var(--btn-gradient);
    width:100%;
    padding:5px;
} 
.card-link {
    background: var(--btn-gradient);
    margin: 20px auto;
    display:flex;
    border-radius: 10px;
    padding:10px;
    letter-spacing: 2px;
    color: white;
}

.card-link:hover {
    color: rgb(162, 196, 162); 
    font-weight:bold;
    padding:10px;
}

.card-subtitle {
    display:flex;
    margin-bottom:25px;
    width:100%;
    justify-content: center;
    background: transparent;
    
}

.detail-group {
    display:flex;
    justify-content: space-between;
    flex-direction:column;
    background: transparent;
    align-items:center;
    margin-top:10px;
}

div {
    background: transparent;
}



@media screen and (min-width:1100px) {
    card {
        width: 100%;
    }
}
</style>
