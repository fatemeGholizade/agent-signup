import {
  SET_PHONE_NUMBER ,
  SET_STEP, 
} from "../type";

export function phoneNumber(details:any) {
  return {
    type: SET_PHONE_NUMBER,
    payload: details,
  };
}

export function step(details:any) {
  return {
    type: SET_STEP,
    payload: details,
  };
}




