import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      authenticated: ''
    }
  },
  mutations: {
    checkuser(state, payload) {
      state.authenticated = payload
    }
  },
  actions: {
    auth(context, payload) {
      context.commit("checkuser", payload)
    }
  },
  getters: {
    user: (state) => {
      return state.authenticated
    }
  },
  modules: {
  }
})
