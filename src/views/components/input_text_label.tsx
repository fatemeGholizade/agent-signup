import { ChangeEvent, InputHTMLAttributes, ReactElement, useCallback } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    value?: any;
    placeholder: string;
    type: string;
    disabled?:boolean;
    errortext?:string;
    border?: "green" | "gray";
    name?:string;
    myStyle?:string,
    onKeyDown?:any,
    icon?:any,
    onClick?:any,
}

export function InputTextLabel({value, myStyle,   icon,
    onClick, onKeyDown, onChange, placeholder, type, border , errortext , disabled , name }: Props): ReactElement {

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event)
    }, [onChange]);

    return (
        <div className={`input-text-label ${myStyle}`}>
            {icon && <div className="icon" onClick={onClick}>{icon}</div>}
            <input
                type={type}
                placeholder={placeholder}
                onChange={handleOnChange}
                name={name}
                disabled={disabled ? true : false }
                className={ border === "gray" ? "input-text-label-input-gray" : "input-text-label-input-green"}
                value={value}
                onKeyDown={onKeyDown}
                autoComplete="none"
            />
            <span className="input-text-label-error">
        {errortext}
      </span>
        </div>
    )
}
export default InputTextLabel;