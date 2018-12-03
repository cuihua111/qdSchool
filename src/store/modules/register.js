const register = {
  state: {
    setStyle: 'z-index: 1;right:0%',
    setClass: 'steps-gray',
    setClass2: 'steps-gray'
  },
  mutations:{
    SET_STYLE(state, setStyle) {
      state.style = setStyle
    },
    SET_CLASS(state, setClass){
      state.class = setClass
    }
  }
}
export default register
