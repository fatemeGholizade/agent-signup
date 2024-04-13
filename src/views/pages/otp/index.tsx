import { CustomButton, Input, InputTextLabel, OtpInput } from "../../components";
import { useEffect, useRef, useState } from "react";
import * as yup from 'yup'
import { call_api, parseJSON } from "../../../core/service";
import { AppConstants } from "../../../core/constants";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import { phoneNumber, step } from "../../../redux/services/dataService";
import { toFarsiNumber } from "../../../core/utils";
import EditIcon from '@mui/icons-material/Edit';
const Otp = () => {    
    const [ otpCode, setOtpCode] = useState("");
    const [ resend, setResend ] = useState(false);
    const myInterval = useRef<any>(null);
    const [ minutes, setMinutes] = useState(2);
    const [ seconds, setSeconds] = useState(0);
    const dispatch = useDispatch();
    const [errorsList, setErrorsList] = useState<Array<any>>([]);
    const handleOtpdKeyPressDown  = (event: { key: string; }) => {
        if (event.key === 'Enter') {
          if(resend)
          { 
            dispatch(step(1));
          } 
          else otpLogin();
        }
      };
    let OTPTimeout: string | number | NodeJS.Timeout | undefined;
    const handleOtp = (value:string) =>{
     setOtpCode(value)
     clearTimeout(OTPTimeout);
     OTPTimeout = setTimeout(() => {
      if(value.length === 6){
        if(resend)
        { 
            dispatch(step(1));
        } 
        else otpLogin();
    }
    }, 900);

    }
    const handleResendCode = () => {
        setMinutes(2);
        setSeconds(0)
        setResend(false);
        handleTimer()
        handleSendOtp()
      }
      async function handleSendOtp(){
        setErrorsList([]);
          call_api({
            address_api: `${AppConstants.base_url_api}create_otp/`,
            method_api: "POST",
            body: JSON.stringify({
              phone_number: reduxData.phone_number
            })
          })
            .then(parseJSON)
            .then(([status, j]) => {
              if (j.status_code === 200) {
                toast.success("!با موفقیت انجام شد ");
            }      
              else {
                toast.error(j?.message);
              }
            })
            .catch((error) => {
              console.error(error);
        });  
    }
    
    const handleTimer = () => {
        clearInterval( myInterval.current);
         myInterval.current = setInterval(() => {
          if (seconds > 0) {
            setSeconds((prevState) => prevState - 1);
          }
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval( myInterval.current)
              setResend(true);
            } else {
                setMinutes((prevState) => prevState - 1);
                setSeconds(59);
            }
          }
        }, 1000)
        return () => {
          clearInterval(myInterval.current);
        };
      }
     async function otpLogin () {
        setErrorsList([]);
        const otpRegisterSchema = yup.object({
            otpCode: yup.string().required(" کد ورود الزامی می‌باشد  ").length(5, 'کد ورود 5 رقم می‌باشد'),
          });
          try {
            await otpRegisterSchema.validate({ otpCode }, { abortEarly: false });
          call_api({
            address_api: `${AppConstants.base_url_api}validate_otp/`,
            method_api: "POST",
            body: JSON.stringify({
              phone_number: reduxData.phone_number,
              code: otpCode
            })
          })
            .then(parseJSON)
            .then(([status, j]) => {
              if (j.status_code === 200) {
                toast.success("!با موفقیت انجام شد ");
                dispatch(step(2));
            }      
              else {
                toast.error(j?.message);
              }
            })
            .catch((error) => {
              console.error(error);
            });  }
        catch (err: any) {
          setErrorsList(err.inner);    
      }
    }
    const reduxData = useSelector((state:{data:any}) => state.data);
    handleTimer();
    useEffect(() => {
      if(otpCode.length === 5){
        otpLogin();
      }

    }, [])
    return(
     <>
      <p className="guide">کد تأیید را وارد نمایید.</p>
      <div>
       <EditIcon className="edit-icon" onClick={() => dispatch(step(0))}/>
       <span className="code"> {reduxData.phone_number}</span>
      </div>
      <OtpInput myStyle={"marg-t-12"} value={otpCode} valueLength={5} 
        onChange={ (value: string) => handleOtp(value)} 
        onKeyDown={handleOtpdKeyPressDown}
      />
      <span className="error-text">{errorsList?.filter((obj: any) => obj.path === "otpCode")[0]?.message}</span>
      <span className="error-text"> {errorsList && errorsList?.filter((obj: any) => obj.path.includes(`data.phone`))[0]?.message} </span>
      {!resend  ?
      <>
        <div className="timer-container">
        <span className="code marg-t-3">ارسال مجدد کد</span>
        <div className="timer">
        {`${toFarsiNumber(minutes)} ${minutes > 0 ? ":" : " "} ${toFarsiNumber(seconds) < 10 
         ? toFarsiNumber("0") + toFarsiNumber(seconds) 
        : toFarsiNumber(seconds)} `}
        </div>
      </div>
      <CustomButton myStyle={`${otpCode.length === 5 ? "blue-button" : "blue-transparent-button"} marg-t-36`} title="ادامه" onClick={() => otpLogin()}/>
        </>
      :
      <CustomButton myStyle="blue-button marg-t-36" title="ارسال مجدد کد" onClick={() => handleResendCode() } />
  }
  </>
)
}
export default Otp;