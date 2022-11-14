<template>
  <NewQuizzes id="newQuizzies" />
</template>

<script setup lang="ts">
  import NewQuizzes from '@/components/NewQuizzes.vue'
</script>


<style scoped>
#newQuizzies {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items:center;
  padding:0;
  margin:0;

}

/******MEDIUM VIEW ******/
@media screen and (min-width:768px) {
  #main {
    grid-template-columns: 1fr 1fr;
  }
}


/******LARGE VIEW ******/
@media screen and ( min-width:1200px) {
  #main {
    grid-template-columns: 300px 1fr 300px;
  }
}
</style>
