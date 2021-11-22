
export const SET_USER = "SET_USER"
export const CLEAR_USER = "CLEAR_USER"

export const setUser = (payload) => {
  return {type: SET_USER, payload}
}

export const clearUser = () => {
  return {type: CLEAR_USER}
}