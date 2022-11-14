<template>
<div>
    <h3>Search Results</h3>
    <div>
        <!-- <ul id="quizSearchList">
            <li v-for="(quiz, index ) in store.getSearchedQuizzes">
                <h3>{{ quiz.id}} : {{ quiz.name }}</h3>
                
            </li>
        </ul> -->
        {{ store.getSearchedQuizzes.data}}
        <table id="table" class="table table-responsive">
            <tr>
                <th>Quiz Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Created By</th>
                <!-- <th>Created On</th> -->
                <th>Timed</th>
            </tr>
            <tbody>
                <tr v-for="quiz in store.getSearchedQuizzes.data" :key="quiz.id">
                    <td>{{ quiz.name }}</td>
                    <td>{{ quiz.category }}</td>
                    <td>{{ quiz.description }}</td>
                    <td>{{ quiz.creator }}</td>
                    <!-- <td>{{ quiz.createdAt }}</td> -->
                    <td>{{ quiz.timed == 0 ? 'NO' : 'YES' }}</td>
                    <td><button class="btn btn-success" @click="gotoQuiz(quiz.id)">View</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useQuizStore } from '@/stores/quiz'
import axios from 'axios'
const store = useQuizStore()

function gotoQuiz(id: number) {
    axios.get('http://localhost:3333/quiz/'+ id)
    .then(data => {
        store.setActiveQuiz(data.data)  
        // store.setQuizMeta(id)   
        router.push('quiz')
    })
    .catch(err => {
        console.log(err.message)
    })

    axios.get('http://localhost:3333/getmeta/' + id)
    .then(res => {
        store.setQuizMeta(res.data.id)
    })
    .catch(err => {
        console.log(err.message)
    })
}
    
</script>

<style scoped>
#quizSearchList, h3 {
    color: white;

}

li {
    list-style-type: none;
}

#table {
    width: 100%;
    color: white;
}

#table tr {
    /* margin:50px; */
}

</style>
