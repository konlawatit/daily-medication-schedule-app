export const SET_MEDICINE = "SET_MEDICINE";
export const SET_TIME = "SET_TIME"
export const SELECT_MEDICINE = "GET_MEDICINE";
export const STACK_TIME = "STACK_TIME"
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
