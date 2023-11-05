import React, {ReactNode, SyntheticEvent, useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import './Modal.css';


interface ModalProps {
    handleOnClose: (e: SyntheticEvent) => void;
    isOpen: boolean;
    children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({children, handleOnClose, isOpen}) => {
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const previousActiveElement = useRef<Element | null>(null);

    useEffect(() => {
        if(!modalRef.current) {
            return;
        }
        const {current: modal} = modalRef;
        if(isOpen) {
            previousActiveElement.current = document.activeElement;
            modal.showModal();
        } else if (previousActiveElement.current instanceof HTMLElement) {
            modal?.close();
            previousActiveElement.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const {current: modal} = modalRef;
        const handleCancel = (e: Event) => {
            e.preventDefault();
            handleOnClose(e as unknown as SyntheticEvent);
        };

        modal?.addEventListener('cancel', handleCancel);

        return () => {
            modal?.removeEventListener('cancel', handleCancel);
        }


    },[handleOnClose]);

    // const handleOutsideClick = (event: React.MouseEvent<HTMLDialogElement, MouseEvent> | Event) => {
    //     const { current } = modalRef;
    //     if (event.target === current) handleOnClose(event);
    // };

    return ReactDOM.createPortal((
      <dialog className="modal"
          ref={modalRef}
          // onClick={handleOutsideClick}
      >
          {children}
      </dialog>
    ), document.body);
};