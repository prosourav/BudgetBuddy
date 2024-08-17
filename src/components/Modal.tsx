'use client'
import { TransactionTypes } from "@/app/page";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface ModalProps {
  children: React.ReactNode;
  open: boolean
  setIsOpen: Dispatch<SetStateAction<TransactionTypes>>;
  reset: () => void
}

const Modal: React.FC<ModalProps> = ({ children, open, setIsOpen, reset }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        reset();
        setIsOpen(null);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [open, reset, setIsOpen]);

  if (!open) return null;

  return (
    <div className="modal" ref={modalRef}>
      {children}
    </div>
  );
};

export default Modal;