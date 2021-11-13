export const SET_MEDICINE = "SET_MEDICINE";
export const SELECT_MEDICINE = "GET_MEDICINE"
export const setMedicine = (medicineList) => {
    return { type: SET_MEDICINE, getMedicine: medicineList };
   };

export const selectMedicine = (id) => {
    return {type: SELECT_MEDICINE, id}
}
   