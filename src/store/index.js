import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'


import user from './modules/user'
import register from './modules/register'
import addressBook from './modules/addressBook'
import testScores from './modules/testScores'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    register,
    addressBook,
    testScores
  },
  getters
})

export default store
