import { createStore } from 'vuex'
import {User} from "../../config";

export default createStore({
  state: {
    token: '' as string,
    user:{
      id: 0 as number,
      username: '' as string,
      role: 'guest' as string
    } as User
  },
  getters: {
  },
  mutations: {
    setToken: (state, token: string): void => {
      state.token = token
      localStorage.setItem('token', token)
    },
    setUser: (state, user: User): void => {
      state.user = user
    },
    logout: (state): void => {
      state.token = ''
      state.user = {
        id: 0,
        username: '',
        role: 'guest'
      }
    }
  },
  actions: {
    setToken({commit}, token: string): void {
      commit('setToken', token)
      commit('setUser', atob(token.split('.')[1]))
    },
    logout({commit}) {
      commit('logout')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },
  modules: {
  }
})
