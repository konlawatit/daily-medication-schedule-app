import { SELECT_MEDICINE, SET_MEDICINE, SET_TIME } from "../actions/medicineAction";

const initialState = {
    medicine: [],
    time: [],
    selectMedicine: {}
    
  };
  const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_MEDICINE:
        return {...state, medicine: action.getMedicine}
      case SET_TIME:
        return {...state, time: action.getTime}
      case SELECT_MEDICINE:
        const medicine = state.medicine.filter((data) => data.id == action.id)[0]
        console.log('id', action.id)
        return {...state,selectMedicine: medicine}
      default:
        return state;
    }
  };
  
  export default mealsReducer;