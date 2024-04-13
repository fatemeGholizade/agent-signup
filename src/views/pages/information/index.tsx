import { CustomButton, Input, InputTextLabel } from "../../components";
import React, { useEffect, useState } from "react";
import { Insurance, User } from "../../../types";
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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Information = () => {    
    const [ agentCode, setAgentCode] = useState("");
    const [ province, setProvince] = useState("");
    const [provincesList, setProvincesList] = useState([]);
    const [ city, setCity ] = useState("");
    const [ citiesList, setCitiesList ] = useState([]);
    const [ address, setAddress ] = useState("");
    const [search, setSearch] = useState("");
    const [ errorText, setErrorText ] = useState(false);
    const [ insurancesList, setInsurancesList ] = useState([]);
    const [ state ,setState] = useState("real");
    const [ insurance, setInsurance ] = useState<Insurance>({name:"", id:0});
    const [phone, setPhone] = useState({city_code:null, phone:null});
    const [open, setOpen] = React.useState(false);
    const [ agentName,setAgentName ] = useState("");
    const theme = createTheme({
        direction: 'rtl',
        typography:{
            fontFamily:"Vazir"
        }
      });
    const handleClose = () => {
      setOpen(false);
    };
    const reduxData = useSelector((state:{data:any}) => state.data);
    const dispatch = useDispatch();
    const [errorsList, setErrorsList] = useState<Array<any>>([]);
    async function handleValidation(){
        setErrorsList([]);
        const phoneRegExp = /^\d{5,8}$/;
        const dataSchema = yup.object({
            agentCode:yup.string().required("  واردکردن کد نمایندگی الزامی می‌باشد  "),
            province: yup.string().required("  واردکردن استان الزامی می‌باشد  "),
            city: yup.string().required("  واردکردن شهر الزامی می‌باشد  "),
            address: yup.string().required("واردکردن آدرس الزامی می‌باشد"),
            insurance: yup.object().shape({
                name:yup.string().required("واردکردن شعبه بیمه الزامی می‌باشد")  
          }),
          phone: yup.object().shape({
            phone:yup.string().required("واردکردن تلفن ثابت الزامی می‌باشد").matches(phoneRegExp, 'فرمت وارد شده صحیح نمی‌باشد'),
            city_code : yup.string().required("واردکردن کد شهر الزامی می باشد").length(2, "کد شهر ۲ رقم می‌باشد")
      }),
        agentName: yup.string() 
        .when("state", {
          is: () => state === "legal",
          then: (schema) => 
            schema.required("نام نمایندگی الزامی می‌باشد"),
        }),
            
        })
        try {
          await dataSchema.validate({agentCode, province, city, address, insurance, phone, agentName}, { abortEarly: false });   
          call_api({
            address_api: "https://stage-api.sanaap.co/api/v2/app/DEY/agent/verification/signup/",
            method_api: "POST",
            body: JSON.stringify({
              address: address,
              agency_type: state,
              agent_code: agentCode,
              city_code: phone.city_code ,
              county:city.toString(),
              first_name: reduxData.name,
              insurance_branch: insurance.id.toString(),
              last_name: reduxData.family,
              name : state === "legal" ? agentName : "73",
              phone: phone.phone,
              phone_number: reduxData.phone_number,
              province: province.toString()

            })
          })
            .then(parseJSON)
            .then(([status, j]) => {
              if (j.status_code === 200) {
                toast.success("!با موفقیت انجام شد ");
                localStorage.setItem("token", j?.response.access);
                localStorage.setItem("refresh", j?.response.refresh);
                dispatch(step(4))
            }      
              else {
                toast.error(j?.message);
              }
            })
            .catch((error) => {
              console.error(error);
        });          
        }
        catch (err: any) {
          setErrorsList(err.inner);    
      }
    }
    let agentCodeTimeout: string | number | NodeJS.Timeout | undefined;
    const handleAgentCode = (value:string) => {
        setAgentCode(value);
          clearTimeout(agentCodeTimeout);
          agentCodeTimeout = setTimeout(() => {
            call_api({
                address_api: `${AppConstants.base_url_api}check_agency_code/`,
                method_api: "POST",
                body: JSON.stringify({
                 agent_code: value,
                })
              })
                .then(parseJSON)
                .then(([status, j]) => {
                  if (j.status_code === 200) {
                    if(j.is_success){
                        toast.success("!با موفقیت انجام شد ");
                    }
                    else{
                        toast.error(j?.error_details?.fa_details);
                    }
                }      
                  else {
                    toast.error(j?.message);
                  }
                })
                .catch((error) => {
                  console.error(error);
                });  
            
          }, 700);          
        }
    const retrieveProvinces = () =>{
        call_api({
            address_api: "https://stage-api.sanaap.co/base/provinces_wop/",
            method_api: "GET",
          })
            .then(parseJSON)
            .then(([status, j]) => {
              if (status === 200) {
                setProvincesList(j)
            }      
              else {
                toast.error(j?.message);
              }
            })
            .catch((error) => {
              console.error(error);
    });  }
    const retrieveCities = (event: SelectChangeEvent) => {
        let parameters = {
            province :  event.target.value
          }
           let url = new URL("https://stage-api.sanaap.co/base/counties_wop/")
          for (const [key, value] of Object.entries(parameters)) {
            if (value) {
              url.searchParams.append(key, value.toString())
            }
          }
          call_api({
              address_api: url.search ? `https://stage-api.sanaap.co/base/counties_wop/${url.search}` : "https://stage-api.sanaap.co/base/counties_wop/",
              method_api: "GET"
            })
              .then(parseJSON)
              .then(([status, j]) => {
                setCitiesList(j);              
                
              })
              .catch((error) => {
                console.error(error);
              });  
    }
    const retrieveInsurances = (event: SelectChangeEvent) => {
        let parameters = {
            province :  event.target.value,
            insurance: "DEY"
          }
           let url = new URL("https://stage-api.sanaap.co/api/v2/app/selection_item/insurance_branch/wop_list/")
          for (const [key, value] of Object.entries(parameters)) {
            if (value) {
              url.searchParams.append(key, value.toString())
            }
          }
          call_api({
              address_api: url.search ? `https://stage-api.sanaap.co/api/v2/app/selection_item/insurance_branch/wop_list/${url.search}` : "https://stage-api.sanaap.co/api/v2/app/selection_item/insurance_branch/wop_list/",
              method_api: "GET"
            })
              .then(parseJSON)
              .then(([status, j]) => {
                setInsurancesList(j.response);              
                
              })
              .catch((error) => {
                console.error(error);
              });  
    }
    const handleSelectProvince = (event: SelectChangeEvent) => {
        setProvince(event.target.value as string);
        retrieveCities(event);
        retrieveInsurances(event);
          
    };
    const handleCloseModalOnSelection = (item:any) =>{
        setInsurance(item);
        setOpen(false)
    }
    useEffect(() =>{
        retrieveProvinces();

    }, []);
   const handleSearch = (value:string) =>{
    setSearch(value);
    setErrorText(false);
    let parameters = {
        province :  province,
        insurance: "DEY",
        name: value
      }
       let url = new URL("https://stage-api.sanaap.co/api/v2/app/selection_item/insurance_branch/wop_list/")
      for (const [key, value] of Object.entries(parameters)) {
        if (value) {
          url.searchParams.append(key, value.toString())
        }
      }
      call_api({
          address_api: url.search ? `https://stage-api.sanaap.co/api/v2/app/selection_item/insurance_branch/wop_list/${url.search}` : "https://stage-api.sanaap.co/api/v2/app/selection_item/insurance_branch/wop_list/",
          method_api: "GET"
        })
          .then(parseJSON)
          .then(([status, j]) => {
            setInsurancesList(j.response);     
            if(j.response.length === 0){
                setErrorText(true)

            }                   
          })
          .catch((error) => {
            console.error(error);
          });  

   }
   const handleChangeState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((event.target as HTMLInputElement).value);
    
  };
return(
    <ThemeProvider theme={theme}>
    <Dialog
        sx={{
            position:"fixed",
            right: "0px",
            left: "0px;",
            bottom: "0px",
            maxWidth: "768px",
            marginRight: "auto",
            marginLeft: "auto",
            borderRadius: "20px 20px 0px 0px}"}}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{backgroundColor:"#e7e7e7", display:"flex", justifyContent:"start"}}>

            <KeyboardArrowRightIcon sx={{color:"#019ba7", cursor:"pointer"}} onClick={() => setOpen(false)}/>
            <Typography>
                شعبه بیمه

            </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           <TextField type="text" id="outlined-basic" 
            sx={{width:"100%", marginTop:"12px"}} label="شعبه" variant="outlined"
            value={search}
            onChange={(e) => {handleSearch(e.target.value)}}
            InputLabelProps={{
            style: { fontFamily:"Vazir" },
            }}
 
           InputProps={{
            endAdornment: (
            <InputAdornment position="end">
             <SearchIcon />
            </InputAdornment>
         ),
         style: { fontFamily:"Vazir", borderRadius:"8px", fontSize:"15px", 
          backgroundColor: province === "" ? "#e7e7e7" : ""}
         }} />
            {errorText && <span className="code">شعبه پیدا نشد</span>}
            {insurancesList.length > 0 && insurancesList.map((item:any, index:number) => (
              <MenuItem onClick={() => handleCloseModalOnSelection(item)} key={index} sx={{fontFamily:"Vazir"}} value={item.id}>{item.name}</MenuItem>
            ))}
          </DialogContentText>
        </DialogContent>
      </Dialog>
<TextField type="number" minRows={0} id="outlined-basic" 
sx={{width:"100%", marginTop:"12px"}} label="کد نمایندگی" variant="outlined"
onChange={(e) => {handleAgentCode(e.target.value)}}
 InputLabelProps={{
  style: { fontFamily:"Vazir" },
}}
InputProps={{
  style: { fontFamily:"Vazir", borderRadius:"8px", fontSize:"15px" },
}} />
<span className="error-text"> {errorsList && errorsList?.filter((obj: any) => obj.path.includes(`agentCode`))[0]?.message} </span>
<FormControl fullWidth className="marg-t-36">
        <InputLabel id="demo-simple-select-label">استان</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={province}
          label="استان"
          onChange={handleSelectProvince}
          sx={{borderRadius:"8px", textAlign:"left", fontFamily:"Vazir"}}
        >
            {provincesList.length > 0 && provincesList.map((item:any, index:number) => (
                <MenuItem key={index} sx={{fontFamily:"Vazir"}} value={item.id}>{item.name}</MenuItem>
            ))}
 
        </Select>
        <span className="error-text"> {errorsList && errorsList?.filter((obj: any) => obj.path.includes(`province`))[0]?.message} </span>
</FormControl>
<FormControl fullWidth className="marg-t-36">
        <InputLabel id="demo-simple-select-label-city">شهر</InputLabel>
        <Select
          name="city"
          disabled={province === "" ? true : false}
          labelId="demo-simple-select-label-city"
          id="demo-simple-select-city"
          value={city}
          label="شهر"
          onChange={(event: SelectChangeEvent) => setCity(event.target.value)}
          sx={{borderRadius:"8px", textAlign:"left", fontFamily:"Vazir",
           backgroundColor: province === "" ? "#e7e7e7" : ""}}
        >
            {citiesList.length > 0 && citiesList.map((item:any, index:number) => (
              <MenuItem key={index} sx={{fontFamily:"Vazir"}} value={item.id}>{item.name}</MenuItem>

            ))}
 
        </Select>
        <span className="error-text"> {errorsList && errorsList?.filter((obj: any) => obj.path.includes(`city`))[0]?.message} </span>
</FormControl>
<TextField type="text" minRows={7} id="outlined-basic" 
  sx={{width:"100%", marginTop:"12px"}} label="آدرس" variant="outlined"
  multiline={true}
  value={address}
  onChange={(e) => {setAddress(e.target.value)}}
  InputLabelProps={{
   style: { fontFamily:"Vazir" },
 }}
  InputProps={{
    style: { fontFamily:"Vazir", borderRadius:"8px", fontSize:"15px" },
  }} />
  <span className="error-text"> {errorsList && errorsList?.filter((obj: any) => obj.path.includes(`city`) ? obj.path.includes(`city`) : 
  obj.path.includes(`address`) )[0]?.message } </span>

<TextField type="text" id="outlined-basic" 
  sx={{width:"100%", marginTop:"12px"}} label="شعبه" variant="outlined"
  onClick={(e:any)=> e.target.nodeName !== "svg" && (province === "" ? {} :setOpen(true))}
  value={insurance.name}
  disabled={province === "" ? true : false}
  InputLabelProps={{
   style: { fontFamily:"Vazir" },
 }}
  InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          {insurance.name === "" ? <SearchIcon /> : 
          <CloseIcon sx={{cursor:"pointer"}} onClick={() => setInsurance({name:"", id:0})}/> }        
        </InputAdornment>
      ),
    style: { fontFamily:"Vazir", borderRadius:"8px", fontSize:"15px", 
     backgroundColor: province === "" ? "#e7e7e7" : ""}
  }} />
   <span className="error-text"> {errorsList && errorsList?.filter((obj: any) => obj.path.includes(`province`) ? obj.path.includes(`province`) : 
  obj.path.includes(`insurance`) )[0]?.message } </span>
  <Grid container sx={{width:"100%", display:"flex", justifyContent:"space-between"}}>
    <Grid item sx={{display:"flex", width:"70%",  flexDirection:"column"}}>
    <TextField  type="number" id="outlined-basic" 
  sx={{marginTop:"12px"}} label="تلفن ثابت" variant="outlined"
  value={phone.phone}
  onChange={(e) => {setPhone((prevState:any) => ({
    ...prevState,
    phone: e.target.value,
  }));}}
  InputLabelProps={{
   style: { fontFamily:"Vazir" },
 }}
  InputProps={{
    style: { fontFamily:"Vazir", borderRadius:"8px", fontSize:"15px"}
  }} />
     <span className="error-text"> {errorsList && errorsList?.filter((obj: any) => obj.path.includes(`phone.phone`))[0]?.message} </span>
    </Grid>
    <Grid item sx={{display:"flex", width:"25%",  flexDirection:"column"}}>
  <TextField type="number" id="outlined-basic" 
  sx={{ marginTop:"12px"}} label="کد" variant="outlined"
  value={phone.city_code}
  onChange={(e) => {setPhone((prevState:any) => ({
    ...prevState,
    city_code: e.target.value,
  }));}}  InputLabelProps={{
   style: { fontFamily:"Vazir" },
 }}
  InputProps={{
    style: { fontFamily:"Vazir", borderRadius:"8px", fontSize:"15px"  } }} />
        <span className="error-text"> {errorsList && errorsList?.filter((obj: any) => obj.path.includes(`phone.city_code`))[0]?.message} </span>
        </Grid>
  </Grid>
  <FormControl className="marg-t-36" sx={{display:"flex", flexDirection:"column", textAlign:"left",}}>
       <FormLabel className="code">نوع نمایندگی:</FormLabel>
      <RadioGroup
        value={state}
        onChange={handleChangeState}
        row
        name="state"
        sx={{display:"flex", justifyContent:"space-between"}}
      >
        <FormControlLabel value="real" control={<Radio  sx={{
    color: pink[800],
    '&.Mui-checked': {
      color: pink[600],
    },
  }}/>} label="حقیقی" />
        <FormControlLabel  value="legal" control={<Radio   sx={{
    color: pink[800],
    '&.Mui-checked': {
      color: pink[600],
    },
  }}/>} label="حقوقی" />
      </RadioGroup>
      {state === "legal" && <TextField type="text" id="outlined-basic" 
sx={{width:"100%", marginTop:"12px"}} label="نام نمایندگی" variant="outlined"
onChange={(e) => {setAgentName(e.target.value)}}
value={agentName}
 InputLabelProps={{
  style: { fontFamily:"Vazir" },
}}
InputProps={{
  style: { fontFamily:"Vazir", borderRadius:"8px", fontSize:"15px" },
}} />}
   <span className="error-text"> {errorsList && errorsList?.filter((obj: any) => obj.path.includes(`agentName`))[0]?.message } </span>
    </FormControl>
   <CustomButton myStyle="blue-button marg-t-36" title="ثبت‌نام" onClick={() => handleValidation()} />
  </ThemeProvider>
)
}
export default Information;