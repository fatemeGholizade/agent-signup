
import { CustomButton, Input, InputTextLabel } from "../../components";
import { useState } from "react";
import { User } from "../../../types";
import * as yup from 'yup'
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import DayImage from "../../../assets";
import { TextField, ThemeProvider, createTheme } from "@mui/material";
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { call_api, parseJSON } from "../../../core/service";
import { AppConstants } from "../../../core/constants";
import { toast } from "react-toastify";
import PhonePage from "../phonePage";
import { useSelector } from "react-redux";
import Otp from "../otp";

const theme = createTheme({
  direction: 'rtl',
});
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export function MainPage({}) {
  const [ data, setData] = useState<User>({phone: ""});
  const [errorsList, setErrorsList] = useState<Array<any>>([]);
  const [dataIsSet, setDataIsSet] = useState<boolean>(false);
  const [step, setStep] = useState(0)

const theme = createTheme({
  direction: 'rtl',
});
const reduxData = useSelector((state:{data:any}) => state.data);

  return (
    <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <div dir="rtl">
        <div className="main-page">
      <div className={`main-card ${dataIsSet ? "height-500" : ""}`}>
      <div className={`card-title`}>
        <img className="image" src={DayImage} alt = "..." />
      </div>
        <>
        <div className="form">
          {reduxData.step === 0 ?      
          <PhonePage />
            : reduxData.step === 1 ? 
            <Otp /> : reduxData.step === 2 ? <div></div> : reduxData.step === 3 ? <div></div> :
           reduxData.step === 4 ? <div></div> : <div>k</div>}
        </div>
        </>     
      </div>
    </div>
    </div>
    </ThemeProvider>
    </CacheProvider>
    );
}
export default MainPage;
