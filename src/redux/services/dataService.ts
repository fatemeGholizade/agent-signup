import {
  SET_PHONE_NUMBER ,
  SET_FAMILY,
  SET_NAME,
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
export function name(details:any) {
  return {
    type: SET_NAME,
    payload: details,
  };
}
export function family(details:any) {
  return {
    type: SET_FAMILY,
    payload: details,
  };
}




