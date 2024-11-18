import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from "@/components/auth/Register.vue";
import Login from "@/components/auth/Login.vue";
import UsersList from "@/components/admin/UsersList.vue";
import AdminPanel from "@/views/admin/AdminPanel.vue";
import QuizzList from "@/components/admin/QuizzList.vue";
import UserProfile from "@/components/UserProfile.vue";
import QuizCreation from "@/views/admin/QuizCreation.vue";
import QuizEdit from "@/views/admin/QuizEdit.vue";
import TakeQuiz from "@/views/Quizz/TakeQuiz.vue";
import QuizResults from "@/views/Quizz/QuizResults.vue";
import QuizUsersResults from "@/views/Quizz/QuizUsersResults.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
    //AUTH
  {
    path: '/auth/register',
    name: 'register',
    component: Register
  },
  {
    path: '/auth/login',
    name: 'login',
    component: Login
  },
  //ADMIN
  {
    path: '/admin',
    name: 'admin',
  component: AdminPanel
  },
  {
    path: '/admin/users',
    name: 'users-list',
    component: UsersList
  },
  {
   path: '/admin/quiz/new',
   name: 'quiz-creation',
   component: QuizCreation
  },
  {
    path: '/admin/quiz/edit/:id',
    name: 'quiz-edit',
    component: QuizEdit
  },
    //USERS
  {
    path: '/user/:id',
    name: 'user-profile',
    component: UserProfile
  },
  //Quizz
  {
    path: '/quizz',
    name: 'quizz-list',
    component: QuizzList
  },
  {
    path: '/quizz/take/:id',
    name: 'quiz-take',
    component: TakeQuiz
  },
  //Results
  {
    path: '/quizz/results/:id',
    name: 'quiz-results',
    component: QuizResults
  },
  {
    path: '/quizz/results/users/:id',
    name: 'quiz-results-users',
    component: QuizUsersResults
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
