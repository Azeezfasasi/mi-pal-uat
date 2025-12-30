import Link from "next/link";
import { MdArrowForward } from "react-icons/md";

export interface Props {
  icon: React.ReactElement<any>;
  title: string;
  link?: string;
  description?: string;
  arrow?: boolean;
}

const LinkWithIcon: React.FC<Props> = ({
  icon,
  title,
  link = "/",
  description,
  arrow = true,
}) => {
  return (
    <Link href={link}>
      <div>
        <div className="group inline-flex hover:text-black">
          <div className="mr-2 fill-current text-black transition-colors duration-200 group-hover:text-black">
            {icon}
          </div>
          <div className="text-sm">
            <div className="flex items-center">
              <p className="font-medium">{title}</p>
              {arrow && (
                <div className="ml-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <MdArrowForward />
                </div>
              )}
            </div>
            <p className="text-gray-400 transition-colors duration-200 group-hover:text-black">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LinkWithIcon;
