import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
} from "../constants/userConstant";

const userInitialState = {
  user: {},
  isAuthenticated: false
};

export const userReducer = (state = userInitialState, action) => {
  if (action.type === LOGIN_USER_SUCCESS){
    //localStorage.setItem("user", JSON.stringify(action.user))
    console.log(state);
    console.log(action.user);
    return {
      ...state,
      user: action.user,
      isAuthenticated: true
    };
  } else if (action.type === LOGIN_USER_FAIL) {
    return {
      ...state,
      user: null,
      isAuthenticated: false
    };
  } else {
    return {
      ...state,
      user: action.user,
      isAuthenticated:false,
      data:"redux"
    };
  }
};
