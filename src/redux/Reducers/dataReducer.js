import {
  SET_PHONE_NUMBER ,
  SET_FAMILY,
  SET_NAME,
  SET_STEP, 
} from "../type";

const initialState = {
  phone_number:"",
  step:0,
  name:"",
  family:"",

};

const dataReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_PHONE_NUMBER:
      return {
        ...state,
        phone_number: action.payload,
      };
      case SET_STEP : 
      return {
        ...state,
        step: action.payload,
      };
      case SET_NAME : 
      return {
        ...state,
        name: action.payload,
      };
      case SET_FAMILY : 
      return {
        ...state,
        family: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
