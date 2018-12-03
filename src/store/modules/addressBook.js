const addressBook = {
  state: {
    title: '1',
    sumPeople: '1',
    uid:'',
  },
  mutations:{
    SET_TITLE(state, setTitle) {
      state.title = setTitle
    },
    SET_SUMPEOPLE(state, setSumPeople){
      state.sumPeople = setSumPeople
    }
  }
}
export default addressBook
