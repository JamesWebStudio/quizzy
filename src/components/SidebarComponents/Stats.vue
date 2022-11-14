<template>
<div>
    <ul>
        <li>447 Quizzes</li>
        <li>1466 Members</li>
        <Search />
    </ul>
    
</div>


</template>

<script setup lang="ts">
import Search from '@/components/SidebarComponents/Search.vue'

</script>

<style scoped>

div {
    text-align: center;
    display:flex;
    flex-direction: column;
    padding:0;
}

ul {
    margin:0;
    padding:0;
}

li {
    background: var(--btn-gradient);
    margin: 0 auto 20px auto;
    font-size: 1.2rem;
    padding:5px;
    list-style: none;
    width:300px;
}
</style>