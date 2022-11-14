<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/">
                            <button class="nav-link" aria-current="page">Home</button>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="store.user.username">
                        <router-link to="/dashboard">
                            <button class="nav-link">Dashboard</button>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="store.user.username">
                        <router-link to="/newquiz">
                            <button class="nav-link">New Quiz</button>
                        </router-link>
                    </li>
                    <li class="nav-item ml-auto" v-if="!store.user.username">
                        <router-link to="/signIn">
                            <button class="nav-link">Sign In</button>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="!store.user.username">
                        <router-link to="/register">
                            <button class="nav-link">Register</button>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="store.user.username">
                        <router-link to="/">
                            <button class="nav-link" @click="store.user = {}">Sign Out</button>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useQuizStore } from '@/stores/quiz.js';
import { RouterLink } from 'vue-router'

const store = useQuizStore()

</script>

<style scoped>
@import url('../assets/base.css'); 

.container-fluid {
    background-color: var(--primary-background-color);
    
}

#nav {
    padding:0;
}

.navbar-nav {
    background-color: var(--btn-gradient);
    width: clamp(280px, 280px, 50vw);
}

button:not(.navbar-toggler) {
    background: var(--btn-gradient);
    border-radius: 10px;
    padding:12px;
    font-size:1rem;
    color: var(--primary-text);
    cursor: pointer;
    width:130px;
    max-width: 200px;
    letter-spacing:2px;
    margin: 0 5px;
}

.navbar-toggler {
    background: #e2647b;
    margin: 10px 5px;
    margin-bottom: 1em;
    width:40px;
    height:40px;
    border-radius: 50%;
    border-color: transparent;
    color: transparent;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.navbar-toggler:hover {
    background: white;
    box-shadow: inset 0 0 10px 5px rgb(238, 149, 149), 0 0 20px 10px rgb(219, 117, 117), 0 0 250px 12px rgb(112, 55, 55); 
}

button:hover {
    background-color:black;
}

#navbarSupportedContent navbar-nav {
    align-items: flex-start;
    justify-content: flex-start;
}

ul {
    padding:0;
    margin:0;
}
.navbar-nav li {
    margin: 10px;
    text-decoration: none;
}

.navbar-nav li:hover {
    color: rgba(97, 94, 94, 0.5);
    font-weight: 900;
    letter-spacing:2px;
}

.nav-link {
    /* color: white; */
    margin: 20px 10px;
}

router-link-active-exact {
    background: black;
}



@media screen and (min-width:992px) {
    .navbar-nav {
        justify-content: center;
        padding: 0 60px;
        width:100%;
    }

    .navbar-toggler {
        display: none;
    }
}
</style>