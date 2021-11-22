import { SET_USER, CLEAR_USER ,SET_SPINNER} from "../actions/userAction";

const initialState = {
  user: {
    email: "",
    uid: "",
    provider: ""
  },
  spinner: false
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPINNER:
      return {...state, spinner: action.bool}
    case SET_USER:
      return { ...state, user: action.payload };
    case CLEAR_USER:
      return {
        ...state,
        user: {
          email: "",
          uid: "",
          provider: ""
        }
      };
    default:
      return state;
  }
};

export default userReducer;
