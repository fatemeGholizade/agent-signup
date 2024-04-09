import { ReactElement, useCallback, MouseEvent, ButtonHTMLAttributes
} from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?:any;
  myStyle?:string;
  disabled?:boolean;
  textStyle?:string;
}

const ButtonComponent=({ onClick, textStyle, icon, title , myStyle , disabled}: Props): ReactElement=> {
  const handleOnClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onClick?.(event);
    },
    [onClick]
  );
  return (
    <button
      className={`button-component handle-loading-btn ${myStyle}`}
      onClick={handleOnClick}
      disabled={disabled}
    >
      <h3 className={`button-component-text ${textStyle}`}>
        <div className="button-component-title">
           {icon && icon}
           {title}  
        </div>
      </h3>
    </button>
  )
}

export default ButtonComponent;
