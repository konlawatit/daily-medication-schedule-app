import {
  SELECT_MEDICINE,
  SET_MEDICINE,
  SET_HISTORY,
  SET_TIME,
  STACK_TIME,
  CLEAR_STACK_TIME,
  STACK_DELETE_TIME,
  CLEAR_STACK_DELETE_TIME,
  REDUCE_STACK_DELETE_TIME,
  SELECT_TIME,
  UPDATE_TINE_IN_TINE,
  CLEAR_TIME
} from "../actions/medicineAction";

const initialState = {
  medicine: [],
  time: [],
  selectMedicine: {},
  selectTime: {},
  stackTime: [],
  stackDeleteTime: [],
  history:[]
};
const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HISTORY:
      return { ...state, history:action.getHistory}
    case SET_MEDICINE:
      return { ...state, medicine: action.getMedicine };
    case SET_TIME:
      return { ...state, time: action.getTime };
    case CLEAR_TIME:
      return {...state, time: state.time.map(data => data.id !== action.id)}
    case UPDATE_TINE_IN_TINE:
      return {...state, time: state.time.map(data => {
        if (data.id === action.id) {
          return {...data, time: action.time, day: action.day}
        }
        return data
      })}
    case SELECT_MEDICINE:
      const medicine = state.medicine.filter((data) => data.id == action.id)[0];
      return { ...state, selectMedicine: medicine };
    case SELECT_TIME:
      return {...state, selectTime: state.time.filter(data => data.id === action.id)[0]}
    case STACK_TIME:
      return { ...state, stackTime: [...state.stackTime, action.time] };
    // case STACK_DELETE_TIME:
    //   let stack = [...state.stackDeleteTime, action.id]
    //   return { ...state, stackDeleteTime: stack.filter((item, pos) => stack.indexOf(item) == pos) };
    case STACK_DELETE_TIME:
      return {
        ...state,
        stackDeleteTime: state.time.filter(
          (data) => data.MEDICINE_id == action.id
        )
      };
    case REDUCE_STACK_DELETE_TIME:
      console.log(
        "action id",
        action.id,
        "condition",
        state.stackDeleteTime.filter((data) => {
          if (data.id !== action.id) {
            console.log(true)
            return data
          }
        })
      );
      // console.log(1111111, state.stackDeleteTime)
      return {
        ...state,
        stackDeleteTime: state.stackDeleteTime.filter(
          (data) => data.id !== action.id
        )
      };
    case CLEAR_STACK_TIME:
      return { ...state, stackTime: [] };
    case CLEAR_STACK_DELETE_TIME:
      return { ...state, stackDeleteTime: [] };
    default:
      return state;
  }
};

export default mealsReducer;
