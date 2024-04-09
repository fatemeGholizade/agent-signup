import { phoneNumber } from "../services/dataService";
import {
  SET_PHONE_NUMBER,
  SET_STEP,
} from "../type";

const initialState = {
  phone_number:"",
  step:0,

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
    default:
      return state;
  }
};

export default dataReducer;
