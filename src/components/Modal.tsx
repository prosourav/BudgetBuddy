'use client'
import { ModalProps } from "@/types";
import { useEffect, useRef } from "react";


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