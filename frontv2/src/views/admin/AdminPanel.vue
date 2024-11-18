<script setup lang="ts">

</script>

<template>
<!--ADMIN NAV BAR-->
  <header>
      <h1>Admin</h1>
    <nav>
        <router-link to="/admin/users">Liste des Utilisateurs</router-link>
        <router-link to="/admin/quiz/new">Création d'un quiz</router-link>
    </nav>
  </header>
</template>

<style scoped lang="scss">
@import "../../assets/_variables.scss";
header {
  height: 3.5rem;
  border-top: dotted 2px $primary-color;
}
</style>
