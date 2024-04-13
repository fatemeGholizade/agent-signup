import { CustomButton, Input, InputTextLabel } from "../../components";
import React, { useEffect, useState } from "react";
import { Info, Insurance, User } from "../../../types";
import * as yup from 'yup'
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import DayImage from "../../../assets";
import { Autocomplete, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Slide, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { call_api, parseJSON } from "../../../core/service";
import { AppConstants } from "../../../core/constants";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import { phoneNumber, step, name, family } from "../../../redux/services/dataService";
import { TransitionProps } from '@mui/material/transitions';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { pink } from "@mui/material/colors";
import Checking from "./checking";



const FinalPage = () => {    
    const [data, setData] = useState<Info>();
    const theme = createTheme({
        direction: 'rtl',
        typography:{
            fontFamily:"Vazir"
        }
      });
   const retrieveData = () => {
        call_api({
            address_api: "https://stage-api.sanaap.co/api/v2/app/DEY/agent/app_user_status/",
            method_api: "GET",
            header:true
          })
            .then(parseJSON)
            .then(([status, j]) => {
              if (status === 200) {
                setData(j?.response)
            }      
              else {
                toast.error(j?.message);
              }
            })
            .catch((error) => {
              console.error(error);
    });  }
    useEffect(() =>{
        retrieveData();

    }, []);
return(
    <ThemeProvider theme={theme}>
        <ul>
            <li>نام: {data?.personal_info.first_name} { data?.personal_info.last_name}</li>
            <li>همراه: {data?.personal_info.phone_number}</li>
            <li>نام نمایندگی بیمه: {data?.agency_info.insurance.name}</li>
            <li>نقش: {data?.agency_info.role}</li>
        </ul>
        <Checking />
    </ThemeProvider>
)
}
export default FinalPage;