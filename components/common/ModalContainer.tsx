import { FC, MouseEventHandler, ReactNode, useCallback, useEffect, useId } from "react";
import { MouseEvent } from "react";

export interface ModalProps {
    visible?: boolean;
    onClose?(): void;
}

interface Props extends ModalProps {
    children: ReactNode
}

const ModalContainer: FC<Props> = ({
    visible,
    children,
    onClose
}): JSX.Element => {

    const handleClose = useCallback(() => {
        onClose && onClose();
    }, [onClose]);
    const handleClick = ({ target }: any) => {
        if (target.id === containerId) {
            handleClose()
        }
    }
    useEffect(() => {
        const closeModal = ({ key }: any) => {
            if (key === 'Escape') {
                handleClose();
            }
        }
        document.addEventListener('keydown', closeModal);

        return () => document.removeEventListener("keydown", closeModal);// runs on unmount
    })
    const containerId = useId();

    if (!visible) return <></>;


    return (
        <div id={containerId} onClick={handleClick} className="fixed inset-0 bg-primary dark:bg-primary-dark dark:bg-opacity-5 bg-opacity-5 backdrop-blur-[2px] z-50 flex items-center justify-center">
            {children}
        </div>
    );
};

export default ModalContainer;
