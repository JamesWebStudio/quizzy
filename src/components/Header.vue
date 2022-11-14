<template>
  <header id="header">
    <h1 class="glow">QUIZZY</h1>
    <h3>Your gateway to the world of Quizzing</h3>
  </header>
</template>

<style scoped>
#header {
   background: rgb(2,0,36);
   background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(226,100,123,1) 67%, rgba(72,80,82,1) 100%); 
   background-color: var(--red-gradient);
   background-position: center;
   color: white;
   padding:10px;
   margin:0;
   width:100vw;
   max-width:100%;
   box-shadow: var(--box-shadow1);
   text-align:center;
}

h1 {
  font-size:4rem;
  margin-top: 20px;
  font-weight: 800;
  letter-spacing: 5px;
}

h3 {
  margin: 15px auto;
  font-weight: 500;
  font-size: 2.2vw;

}


/**********MEDIUM SCREEN ***********/
@media screen and (min-width:768px) {
  
}
</style>
