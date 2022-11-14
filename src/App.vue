<template>
<div id="main-layout">
  <Header id="header" />
  <Nav id="nav" />
  <Info id="info" />
  <Categories id="categories" />
  <RouterView id="view" />
  <component :is="Stats" id="sidebar"/>
  <component :is="Leaderboard" id="aside" />
</div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import Nav from '@/components/Nav.vue'
import Info from './components/InfoText.vue'
import Categories from './components/Categories.vue'
import Stats from '@/components/SidebarComponents/Stats.vue'
import Leaderboard from '@/components/Leaderboard.vue'
import SearchViewList from '@/components/SearchViewList.vue'

</script>

<style scoped>
#app {
  margin: 0;
  padding:0;
}

#main-layout {
  background-color: var(--primary-background-color);
  display:grid;
  grid-template-areas: "header" "nav" "info" "categorys" "view";

}

#sidebar {
  color: white;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

#categories  {
  grid-area: categorys;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5px;
  height: 100%;
  padding:10px;
  max-height:400px;
}

#view {
  display:grid;
  grid-area: view;
  justify-content: flex-start;
}

#categories .category-button {
  width:300px;
}


@media screen and (min-width: 780px) {
  #main-layout {
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "header header header" "nav nav nav" "info info sidebar" "view view ." "categories categories categories";
    gap: 30px;
  }

  #header {
    grid-area: header;
  }

  #nav {
    grid-area: nav;
  }

  #info {
    grid-area: info;
    justify-content: center;
    padding:0 10px;
  }

  #categories {
    grid-area: categories;
    display:flex;
    flex-direction:row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
  }

  #sidebar {
    grid-area: sidebar;
    justify-content: start;
    align-items:center;
    padding:0 10px;
  }

  
}

@media screen and (min-width: 1500px) {
  #main-layout {
    padding:20px 5vw;
    display:grid;
    grid-template-columns: 350px 1fr 350px;
    grid-template-areas: "header header header" "nav nav nav" "info info sidebar" "categories view .";
  }

  #categories {
    grid-area: categories;
    display:flex;
    flex-direction:column;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  #view {
    grid-area: view;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    color: white;
    text-align:center;
    }

  #content {
    display:flex;
    flex-direction: column;
    justify-content: center;
  }

}



</style>
