import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactElement,
  useCallback,
} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value?: any;
  placeholder?: string;
  type: string;
  inBox?: ReactElement | string;
  errortext?:string;
  disabled?:boolean;
  myStyle?:string;
  defaultValue?:number,
  min?:string,
  inputContainerStyle?:string,
  label?:string,
  icon?:any,
  onClick?:any,
  onKeyDown?:any,
  iconStyle?:string,
  containerStyle?:string,

}

const InputIcon = ({
  inBox,
  value,
  onChange,
  placeholder,
  type,
  errortext,
  iconStyle,
  disabled,
  myStyle,
  defaultValue,
  inputContainerStyle,
  containerStyle,
  min,
  icon,
  onClick,
  label,
  name,
  onKeyDown,
}: Props): ReactElement => {
  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
    },
    [onChange]
  );
  return (
    <div className={`input-icon ${myStyle}`} >
     {label &&  <label className="input-icon-label">{label}</label>}
      <div className={`input-icon-container ${containerStyle}` }>
        {inBox && 
        <div className="in-box" >{inBox }</div>
        }
        {icon && <span className={`icon ${iconStyle}`} onClick={onClick}>{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          onChange={handleOnChange}
          className={`${inputContainerStyle} ${inBox ? "rounded-4" : "" } input`}
          value={value}
          disabled={disabled}
          defaultValue={defaultValue}
          min={min}
          name={`${name || name}`}
          autoComplete="new-value"
          id="netran-input"
          onKeyDown={onKeyDown}
        
        />
      </div>
      {errortext && 
      <span className="input-icon-error">
        {errortext}
      </span>
      }
    </div>
  );
}
export default InputIcon;
