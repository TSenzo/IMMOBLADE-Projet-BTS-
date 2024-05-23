import { createStore } from 'vuex'
import { cloneDeep } from 'lodash'

export default createStore({
  state: {
    campagnes: [],
    TableauTemperatures: [],
    TableauLuminosites: [],
    TableauFluxSolaires: [],
    TemoinTemperatures: [],
    EquipeTemperatures: [],
    TemoinLuminosites: [],
    EquipeLuminosites: [],
    TemoinFluxSolaires: [],
    EquipeFluxSolaires: [],
    dateTemp: [],
    dateLum: [],
    showPopup: false,
    alertes: []
    // popupMessage: ''
  },
  getters: {
    lengthTableauTemperatures (state, getters) {
      return getters.TableauTemperatures.length
    },
    lengthTableauLuminosites (state, getters) {
      return getters.TableauLuminosites.length
    },
    lengthTableauFluxSolaires (state, getters) {
      return getters.TableauFluxSolaires.length
    },
    TableauTemperatures (state) {
      return cloneDeep(state.TableauTemperatures)
    },
    TableauLuminosites (state) {
      return cloneDeep(state.TableauLuminosites)
    },
    TableauFluxSolaires (state) {
      return cloneDeep(state.TableauFluxSolaires)
    },
    TemoinTemperature (state) {
      return cloneDeep(state.TemoinTemperatures)
    },
    EquipeTemperature (state) {
      return cloneDeep(state.EquipeTemperatures)
    },
    TemoinLuminosite (state) {
      return cloneDeep(state.TemoinLuminosites)
    },
    EquipeLuminosite (state) {
      return cloneDeep(state.EquipeLuminosites)
    },
    TemoinFluxSolaire (state) {
      return cloneDeep(state.TemoinFluxSolaire)
    },
    EquipeFluxSolaire (state) {
      return cloneDeep(state.EquipeFluxSolaire)
    },
    dateTemp (state) {
      return cloneDeep(state.dateTemp)
    },
    dateLum (state) {
      return cloneDeep(state.dateLum)
    },
    showPopup (state) {
      return cloneDeep(state.showPopup)
    },
    popupMessage (state) {
      return cloneDeep(state.popupMessage)
    }
  },
  mutations: {
    addTableauFluxSolaires (state, payload) {
      state.TableauFluxSolaires.push(payload)
    },
    addTableauLuminosites (state, payload) {
      state.TableauLuminosites.push(payload)
    },
    addTableauTemperatures (state, payload) {
      state.TableauTemperatures.push(payload)
    },
    shiftTableauTemperatures (state) {
      state.TableauTemperatures.shift()
    },
    shiftTableauLuminosites (state) {
      state.TableauLuminosites.shift()
    },
    shiftTableauFluxSolaires (state) {
      state.TableauFluxSolaires.shift()
    },
    addTemoinTemperatures (state, payload) {
      state.TemoinTemperatures.push(payload)
    },
    addEquipeTemperatures (state, payload) {
      state.EquipeTemperatures.push(payload)
    },
    addTemoinLuminosite (state, payload) {
      state.TemoinLuminosites.push(payload)
    },
    addEquipeLuminosite (state, payload) {
      state.EquipeLuminosites.push(payload)
    },
    addTemoinFluxSolaires (state, payload) {
      state.TemoinFluxSolaire.push(payload)
    },
    addEquipeFluxSolaires (state, payload) {
      state.EquipeFluxSolaires.push(payload)
    },
    addDateTemp (state, payload) {
      state.dateTemp.push(payload)
    },
    addDateLum (state, payload) {
      state.dateLum.push(payload)
    },
    setShowPopup (state, payload) {
      state.showPopup = payload
    },
    setPopupMessage (state, payload) {
      state.popupMessage = payload
    },
    ajouterAlerte (state, alerte) {
      state.alertes.push(alerte)
    }
  },
  actions: {
    addTableauLuminosites ({ commit }, e) {
      commit('addTableauLuminosites', e)
    },
    addTableauTemperatures ({ commit }, e) {
      commit('addTableauTemperatures', e)
    },
    shiftTableauTemperatures ({ commit }) {
      commit('shiftTableauTemperatures')
    },
    shiftTableauLuminosites ({ commit }) {
      commit('shiftTableauLuminosites')
    },
    shiftTableauFluxSolaires ({ commit }) {
      commit('shiftTableauFluxSolaires')
    },
    addTemoinTemperatures ({ commit }, e) {
      commit('addTemoinTemperatures', e)
    },
    addEquipeTemperatures ({ commit }, e) {
      commit('addEquipeTemperatures', e)
    },
    addTemoinLuminosite ({ commit }, e) {
      commit('addTemoinLuminosite', e)
    },
    addEquipeLuminosite ({ commit }, e) {
      commit('addEquipeLuminosite', e)
    },
    addTemoinFluxSolaire ({ commit }, e) {
      commit('addTemoinFluxSolaire', e)
    },
    addEquipeFluxSolaire ({ commit }, e) {
      commit('addEquipeFluxSolaire', e)
    },
    addDateTemp ({ commit }, e) {
      commit('addDateTemp', e)
    },
    addDateLum ({ commit }, e) {
      commit('addDateLum', e)
    },
    setShowPopup ({ commit }, e) {
      commit('setShowPopup', e)
    },
    setPopupMessage ({ commit }, e) {
      commit('setPopupMessage', e)
    },
    ajouterAlerte ({ commit }, alerte) {
      commit('ajouterAlerte', alerte)
    }
  },
  modules: {
  }
})
