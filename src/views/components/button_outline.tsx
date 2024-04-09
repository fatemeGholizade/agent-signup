import {
    ReactElement,
    useCallback,
    MouseEvent,
    ButtonHTMLAttributes
} from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
}
const ButtonOutline=({ onClick, title }: Props): ReactElement => {

    const handleOnClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
    }, [onClick]);

    return (
        <button
            className="button-outline"
            onClick={handleOnClick}
        >
            <h3 className="button-outline-text">
                {title}
            </h3>
        </button>
    )
}

export default ButtonOutline;