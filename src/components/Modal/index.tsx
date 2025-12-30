import { ReactNode, forwardRef } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded-lg bg-white px-6 py-7 shadow-lg">{children}</div>
  );
};

export default Modal;
