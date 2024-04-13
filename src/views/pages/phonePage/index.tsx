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
import { phoneNumber, step } from "../../../redux/services/dataService";

const PhonePage = () => {    
    const [ phone, setPhone] = useState("");
    const dispatch = useDispatch();
    const [errorsList, setErrorsList] = useState<Array<any>>([]);
    async function handlePhoneValidation(){
        setErrorsList([]);
        const mobileRegExp = /^09\d{9}$/;
        const dataSchema = yup.object({
            phone:yup.string().required(" شماره تماس الزامی می‌باشد  ").matches(mobileRegExp, 'فرمت وارد شده صحیح نمی‌باشد'),
          })
        try {
          await dataSchema.validate({phone}, { abortEarly: false }); 
          call_api({
            address_api: `${AppConstants.base_url_api}create_otp/`,
            method_api: "POST",
            body: JSON.stringify({
              phone_number: phone
            })
          })
            .then(parseJSON)
            .then(([status, j]) => {
              if (j.status_code === 200) {
                toast.success("!با موفقیت انجام شد ");
                dispatch(phoneNumber(phone));
                dispatch(step(1));
            }      
              else {
                toast.error(j?.error_details?.fa_details                );
              }
            })
            .catch((error) => {
              console.error(error);
            });  }
        catch (err: any) {
          setErrorsList(err.inner);    
      }
    }
return(
    <>
<p className="guide">شماره موبایل خود را وارد کنید.</p>
<span className="code">کد تأیید برای شما ارسال خواهد شد.</span>
<TextField type="number" minRows={0} id="outlined-basic" 
sx={{width:"100%", marginTop:"12px"}} label="تلفن همراه" variant="outlined"
onChange={(e) => {setPhone(e.target.value)}}
 InputLabelProps={{
  style: { fontFamily:"Vazir" },
}}
InputProps={{
  style: { fontFamily:"Vazir", borderRadius:"8px", fontSize:"15px" },
}} />
<span className="error-text"> {errorsList && errorsList?.filter((obj: any) => obj.path.includes(`data.phone`))[0]?.message} </span>
  {phone === ""  ?
  <CustomButton myStyle="blue-transparent-button marg-t-36" title="ادامه" disabled/>
  :
   <CustomButton myStyle="blue-button marg-t-36" title="ادامه" onClick={() => handlePhoneValidation()} />
  }
  </>
)
}
export default PhonePage;