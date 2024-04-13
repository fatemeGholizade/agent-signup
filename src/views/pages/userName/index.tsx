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
import { useSelector, useDispatch } from 'react-redux';
import { phoneNumber, step, name, family } from "../../../redux/services/dataService";

const UserName = () => {    
    const [ shortName, setShortName] = useState("");
    const [ familyName, setFamilyName] = useState("");
    const dispatch = useDispatch();
    const [errorsList, setErrorsList] = useState<Array<any>>([]);
    async function handleValidation(){
        setErrorsList([]);
        const dataSchema = yup.object({
            shortName:yup.string().required("  نام الزامی می‌باشد  "),
            familyName:yup.string().required("  نام خانوادگی الزامی می‌باشد  "),
          })
        try {
          await dataSchema.validate({shortName, familyName}, { abortEarly: false }); 
          dispatch(step(3));
          dispatch(name(shortName));
          dispatch(family(familyName))
          
        }
        catch (err: any) {
          setErrorsList(err.inner);    
      }
    }
return(
    <>
<TextField type="text" minRows={0} id="outlined-basic" 
sx={{width:"100%", marginTop:"12px"}} label="نام" variant="outlined"
onChange={(e) => {setShortName(e.target.value)}}
 InputLabelProps={{
  style: { fontFamily:"Vazir" },
}}
InputProps={{
  style: { fontFamily:"Vazir", borderRadius:"8px", fontSize:"15px" },
}} />
<span className="error-text"> {errorsList && errorsList?.filter((obj: any) => obj.path.includes(`shortName`))[0]?.message} </span>
<TextField type="text" minRows={0} id="outlined-basic" 
sx={{width:"100%", marginTop:"12px"}} label="نام خانوادگی" variant="outlined"
onChange={(e) => {setFamilyName(e.target.value)}}
 InputLabelProps={{
  style: { fontFamily:"Vazir" },
}}
InputProps={{
  style: { fontFamily:"Vazir", borderRadius:"8px", fontSize:"15px" },
}} />
<span className="error-text"> {errorsList && errorsList?.filter((obj: any) => obj.path.includes(`familyName`))[0]?.message} </span>
   <CustomButton myStyle="blue-button marg-t-36" title="ادامه" onClick={() => handleValidation()} />
  </>
)
}
export default UserName;