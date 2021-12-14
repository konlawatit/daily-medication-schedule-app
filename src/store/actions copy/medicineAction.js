export const SET_MEDICINE = "SET_MEDICINE";
export const SET_TIME = "SET_TIME"
export const SET_HISTORY = "SET_HISTORY"
export const CLEAR_TIME = "CLEAR_TIME";

export const SELECT_MEDICINE = "GET_MEDICINE";
export const SELECT_TIME = "SELECT_TIME";
export const STACK_TIME = "STACK_TIME"
export const CLEAR_STACK_TIME = "CLEAR_STACK_TIME"
export const STACK_DELETE_TIME = "STACK_DELETE_TIME"
export const REDUCE_STACK_DELETE_TIME = "REDUCE_STACK_DELETE_TIME" 
export const CLEAR_STACK_DELETE_TIME = "CLEAR_STACK_DELETE_TIME"
export const UPDATE_TINE_IN_TINE = "UPDATE_TINE_IN_TINE"

export const SET_USER = "SET_USER"

export const setUser = (payload) => {
  return {type: SET_USER, payload}
}

export const setHistory = (historyList) => {
  return { type: SET_HISTORY, getHistory: historyList };
};

export const setMedicine = (medicineList) => {
  return { type: SET_MEDICINE, getMedicine: medicineList };
};

export const setTime = (timeList) => {
  return { type: SET_TIME, getTime: timeList };
};

export const selectMedicine = (id) => {
  return { type: SELECT_MEDICINE, id };
};

export const selectTime = (id) => {
  return {type: SELECT_TIME, id}
}

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

export const updateTimeInTime = (id,time, day) => {
  return {type: UPDATE_TINE_IN_TINE,id, time, day}
}

export const clearTime = (id) => {
  return {type: CLEAR_TIME, id}
}