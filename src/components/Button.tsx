import { ReactNode } from "react";
import { MdChevronRight } from "react-icons/md";

export interface Props {
  color: "gray" | "blue" | "#EB5017";
  showChevron: boolean;
  children: ReactNode;
}

const Button: React.FC<Props> = ({ children, color, showChevron }) => {
  const bgColor = color === "gray" ? "bg-white bg-opacity-25" : "bg-indigo-500";
  return (
    <button
      className={`inline-flex items-center rounded-full px-5 py-1 text-white ${bgColor}`}
    >
      {children}
      {showChevron && <MdChevronRight />}
    </button>
  );
};

export default Button;
