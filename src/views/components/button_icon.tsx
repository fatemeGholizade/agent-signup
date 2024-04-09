import {
    ReactElement,
    useCallback,
    MouseEvent,
    ButtonHTMLAttributes
} from "react";
import { useNavigate } from "react-router-dom";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    backgroundColor:string
    color:string;
    route?:any
}

const ButtonIcon=({ route,onClick, title , backgroundColor , color }: Props): ReactElement => {

    const navigate = useNavigate();
    const handleOnClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if(route){
          navigate(route)
        }
      },
      [onClick]
    );

    return (
        <button
            className="button-icon"
            style={{backgroundColor: backgroundColor}}
            onClick={handleOnClick}
        >
            <h3 className="button-icon-text" 
            style={{color : color}}
            >
                {title}
            </h3>
        </button>
    )
}

export default ButtonIcon;