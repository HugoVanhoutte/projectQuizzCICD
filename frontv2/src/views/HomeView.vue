<script setup lang="ts">
import router from "@/router";

const goToRegister = () => {
  router.push('/auth/register')
}
</script>

<template>
  <main>
    <section>
      <h1>Bienvenue sur Graduate</h1>
      <p>Graduate est un site permettant aux formateurs de créer et de gérer leurs quiz et aux apprenants d'y participer et de consulter leurs résultats.</p>
      <button class="primary" @click="goToRegister">Créer un compte</button>
    </section>
    <div class="image">

    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: row;
  height: calc(100dvh - 250px);

  margin: 75px 50px;

  section {
    width: 40%;
    padding-right: 25px;
    h1 {
      font-family: Graduate, serif;
      font-size: 56px;
      padding-bottom: 50px
    }
    p {
      font-family: Varela Round, sans-serif;
      font-size: 16px;
      text-align: justify;
    }
    button {
      margin: 25px 0;
    }
  }
  .image {
    background-image: url('/src/assets/cover.jpg');
    background-repeat: no-repeat;
    background-size: contain;
    width: 60%;
    height: auto;
  }
}
</style>
