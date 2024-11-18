<script setup lang="ts">
import { useStore } from "vuex";
import { useRouter } from "vue-router"
import AdminPanel from "@/views/admin/AdminPanel.vue";
const store = useStore()
const router = useRouter()
</script>

<template>
  <header>
    <h1 @click="router.push('/')">Graduate</h1>
    <nav>
        <router-link to="/">Accueil</router-link>
        <router-link to="/auth/login" v-if="!store.state.token">Connexion</router-link>
        <router-link to="/auth/register" v-if="!store.state.token">Créer un compte</router-link>
        <router-link to="/" @click="store.dispatch('logout')" v-if="store.state.token">Déconnexion</router-link>
        <router-link to="/quizz" v-if="store.state.token">Liste des Quizz</router-link>
    </nav>
  </header>
  <AdminPanel v-if="store.state.user.role === 'admin'" />
</template>

<style scoped lang="scss">
h1 {
  cursor: pointer;
}
</style>
