import { SELECT_MEDICINE, SET_MEDICINE } from "../actions/medicineAction";

const initialState = {
    medicine: [],
    selectMedicine: {}
    
  };
  const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_MEDICINE:
        return {...state, medicine: action.getMedicine}
      case SELECT_MEDICINE:
        const medicine = state.medicine.filter((data) => data.id == action.id)[0]
        console.log('id', action.id)
        return {...state,selectMedicine: medicine}
      default:
        return state;
    }
  };
  
  export default mealsReducer;