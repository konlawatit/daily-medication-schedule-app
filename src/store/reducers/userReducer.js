import {
  SET_USER
} from "../actions/userAction";

const initialState = {
  user: {
    email: "",
    uid: "",
    provider: ""
  }
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.payload}
    default:
      return state;
  }
};

export default userReducer;
