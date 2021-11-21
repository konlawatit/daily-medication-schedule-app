export const SET_MEDICINE = "SET_MEDICINE";
export const SET_TIME = "SET_TIME"
export const SELECT_MEDICINE = "GET_MEDICINE";
export const STACK_TIME = "STACK_TIME"
export const CLEAR_STACK_TIME = "CLEAR_STACK_TIME"
export const STACK_DELETE_TIME = "STACK_DELETE_TIME"
export const REDUCE_STACK_DELETE_TIME = "REDUCE_STACK_DELETE_TIME" 
export const CLEAR_STACK_DELETE_TIME = "CLEAR_STACK_DELETE_TIME"
export const setMedicine = (medicineList) => {
  return { type: SET_MEDICINE, getMedicine: medicineList };
};

export const setTime = (timeList) => {
  return { type: SET_TIME, getTime: timeList };
};

export const selectMedicine = (id) => {
  return { type: SELECT_MEDICINE, id };
};

export const stackTime = (time) => {
  return {type : STACK_TIME, time }
}

export const clearStackTime = () => {
  return {type: CLEAR_STACK_TIME}
}

export const stackDeleteTime = (id) => {
  return {type: STACK_DELETE_TIME, id}
}

export const reduceStackDeleteTime = (id) => {
  return {type: REDUCE_STACK_DELETE_TIME, id}
}

export const clearStackDeleteTime = () => {
  return {type: CLEAR_STACK_DELETE_TIME}
}