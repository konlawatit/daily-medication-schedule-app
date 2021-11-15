import { SELECT_MEDICINE, SET_MEDICINE, SET_TIME, STACK_TIME, CLEAR_STACK_TIME } from "../actions/medicineAction";

const initialState = {
    medicine: [],
    time: [],
    selectMedicine: {},
    stackTime: []
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
      case STACK_TIME:
        return {...state, stackTime: [...state.stackTime, action.time]}
      case CLEAR_STACK_TIME:
        return {...state, stackTime: []}
      default:
        return state;
    }
  };
  
  export default mealsReducer;