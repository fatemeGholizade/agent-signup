
import { CustomButton, InputIcon, InputTextLabel } from "../../components";
import { useState } from "react";
import { TableProps } from "../../../types";
import * as yup from 'yup'
import Table from "../../components/table";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";

export function MainPage({}) {
  const [ data, setData] = useState<TableProps>({rows: "0", columns: "0"});
  const [errorsList, setErrorsList] = useState<Array<any>>([]);
  const [dataIsSet, setDataIsSet] = useState<boolean>(false);
  async function handleValidation(){
    setErrorsList([]);
    const dataSchema = yup.object().shape({
      data: yup.object().shape({
        rows:yup.string().required("تعداد سطر الزامی است.")
        .test('is-number-odd-greater-than-3', 'مقدار سطر باید یک عدد فرد و بزرگ‌تر یا مساوی با ۳ باشد.', (value) => {
          if (!value) {
            return false;
          }    
          const number = parseInt(value, 10);   
          return !isNaN(number) && number % 2 === 1 && number >= 3;
        }),
        columns:yup.string().required("تعداد ستون الزامی است.")
        .test('is-number-odd-greater-than-3', 'مقدار ستون باید یک عدد فرد و بزرگ‌تر یا مساوی با ۳ باشد.', (value) => {
          if (!value) {
            return false;
          }    
          const number = parseInt(value, 10);   
          return !isNaN(number) && number % 2 === 1 && number >= 3;
        }),        
      })
  });
    try {
      await dataSchema.validate({data}, { abortEarly: false }); 
      setDataIsSet(true) 
  }
    catch (err: any) {
      setErrorsList(err.inner);   
      console.log("err", err.inner)
 
  }
}
const handleBackButton = () =>{
  setDataIsSet(false);
  setData({rows: "0" , columns: "0"})
}
  return (
    <div className="main-page">
      <div className={`card ${dataIsSet ? "height-500" : ""}`}>
        {!dataIsSet ? 
        <>
        <div className="inputs-container">
          <div className="column-50">
            <InputIcon name="row" myStyle="padd-l-10" value={data.rows} 
            onChange={(e) => {setData((prev:TableProps) => ({...prev, rows: e.target.value}))}}
            title="سطر" inBox="سطر" type="text" 
            errortext={errorsList && errorsList?.filter((obj: any) => obj.path.includes(`data.rows`))[0]?.message}
            />
          </div>
          <div className="column-50">
            <InputIcon myStyle="w-50" name="row" value={data.columns} 
            onChange={(e) => {setData((prev:TableProps) => ({...prev, columns: e.target.value}))}}
            title="ستون" inBox="ستون" type="text" 
            errortext={errorsList && errorsList?.filter((obj: any) => obj.path.includes(`data.columns`))[0]?.message}
            />
          </div>
        </div>
        <div className="button-container">
          <CustomButton icon={<FaLongArrowAltRight/>} title="بعدی" onClick={() => handleValidation()} />
        </div>
        </>
        :
        <>
        <CustomButton icon={<FaLongArrowAltLeft />} myStyle="blue-button" title="بازگشت" onClick={() => handleBackButton()} />
        <Table rows = {data.rows} columns = {data.columns} />
        </>       
}
      </div>
    </div>
    );
}
export default MainPage;
