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



const Checking = () => {    
    const [data, setData] = useState<Info>();
    const theme = createTheme({
        direction: 'rtl',
        typography:{
            fontFamily:"Vazir"
        }
      });
return(
    <ThemeProvider theme={theme}>
         <FormControl className="marg-t-36" sx={{display:"flex", flexDirection:"column", textAlign:"left",}}>
          <label>نماینده محترم: </label>
          <Typography>
            درخواست ثبت‌نام شما در حال بررسی است. در صورت تأیید اطلاعات، اپلیکیشن موردنظر فعال خواهد شد.
          </Typography>
      
       </FormControl>
    </ThemeProvider>
)
}
export default Checking;