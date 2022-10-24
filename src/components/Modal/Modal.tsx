import { ReactNode } from "react";

interface Props {
    size?: {
        height: number;
        width: number;
    };
    child: ReactNode;
}

const Modal = (props: Props) => {

    return (
        <div className="modal">
            {props.child}
        </div>  
    );
};

export default Modal;