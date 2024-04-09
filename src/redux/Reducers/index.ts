import { combineReducers } from "@reduxjs/toolkit";
import dataReducer from "./dataReducer";

export default combineReducers({
  data: dataReducer,
});
