import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactElement,
  useCallback,
  useState,
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

const Input = ({
  inBox,
  value,
  onChange,
  placeholder,
  type,
  errortext,
  disabled,
  myStyle,
  defaultValue,
  inputContainerStyle,
  containerStyle,
  min,
  onClick,
  name,
  onKeyDown,
}: Props): ReactElement => {
  const [isFocused, setIsFocused] = useState(false);
  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
    },
    [onChange]
  );

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div className={`input-icon ${myStyle}`} >
      <div className={`input-icon-container ${containerStyle}` }>
        <input
          type={type}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={isFocused ? '' : placeholder}
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
export default Input;
