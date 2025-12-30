import {
  FaCloud,
  FaToolbox,
  FaJava,
  FaReact,
  FaHospitalUser,
  FaPython,
} from "react-icons/fa";
import { IoTerminal } from "react-icons/io5";
import { IoMdAnalytics } from "react-icons/io";
import {
  MdOutlineSecurity,
  MdRestaurantMenu,
  MdSchool,
  MdDeliveryDining,
  MdStore,
  MdOutlineTravelExplore,
  MdSportsHandball,
} from "react-icons/md";
import { BsFillPhoneFill } from "react-icons/bs";
import { RiTodoFill, RiAppleFill, RiHotelLine } from "react-icons/ri";
import { HiStatusOnline } from "react-icons/hi";
import { SiKotlin, SiFlutter } from "react-icons/si";
import { TbTruckDelivery } from "react-icons/tb";
import { GiFruitBowl } from "react-icons/gi";
import { FaGolang } from "react-icons/fa6";

export const servicesSubnav: {
  title: string;
  href: string;
  description: string;
  icon?: React.ReactNode;
}[] = [
  {
    title: "Custom Software Development",
    icon: <IoTerminal color="#EB5017" />,
    href: "/#custom-software",
    description: "Mobile, Desktops, Softwares",
  },
  {
    title: "Business Analysis",
    icon: <IoMdAnalytics color="#EB5017" />,
    href: "/#business-analysis",
    description: "Expert guidance on Analysis",
  },
  {
    title: "MVP Startup Development",
    icon: <BsFillPhoneFill color="#EB5017" />,
    href: "/#mvp-development",
    description: "Launch your Startup",
  },
  {
    title: "Project Management",
    icon: <RiTodoFill color="#EB5017" />,
    href: "/#project-management",
    description: "Todo, In-progress, Done.",
  },
  {
    title: "App Maintenance",
    icon: <FaToolbox color="#EB5017" />,
    href: "/#app-maintenance",
    description: "Debugging and others...",
  },
  {
    title: "Cloud & Hosting",
    icon: <FaCloud color="#EB5017" />,
    href: "/#cloud-hosting",
    description: "Let’s host your Data",
  },
  {
    title: "Cyber Security",
    icon: <MdOutlineSecurity color="#EB5017" />,
    href: "/#cyber-security",
    description: "Guide your online prescence",
  },
  {
    title: "Digital Transformation",
    icon: <HiStatusOnline color="#EB5017" />,
    href: "/#digital-transform",
    description: "Guide your online prescence",
  },
];

export const technologySubnav: {
  title: string;
  href: string;
  icon?: React.ReactNode;
}[] = [
  {
    title: "Python",
    icon: <FaPython color="#EB5017" />,
    href: "/technology/python",
  },
  {
    title: "iOS",
    icon: <RiAppleFill color="#EB5017" />,
    href: "/technology/ios",
  },
  {
    title: "Flutter",
    icon: <SiFlutter color="#EB5017" />,
    href: "/technology/flutter",
  },
  {
    title: "Android",
    icon: <BsFillPhoneFill color="#EB5017" />,
    href: "/technology/android",
  },
  {
    title: "Kotlin",
    icon: <SiKotlin color="#EB5017" />,
    href: "/technology/kotlin",
  },
  {
    title: "Golang",
    icon: <FaGolang color="#EB5017" />,
    href: "/technology/golang",
  },
  {
    title: "React",
    icon: <FaReact color="#EB5017" />,
    href: "/technology/react",
  },
];

export const industrySubnav: {
  title: string;
  href: string;
}[] = [
  {
    title: "Agriculture",
    href: "/industry/agriculture",
  },
  {
    title: "Non-Profit Organization",
    href: "/industry/non-profit",
  },
  {
    title: "Banking and Fin. services",
    href: "/industry/banking-and-financial-services",
  },
  {
    title: "Digital Marketing",
    href: "/industry/digital-marketing",
  },
  {
    title: "Public Sector",
    href: "/industry/public-sector",
  },
  {
    title: "Insurance",
    href: "/industry/insurance",
  },
  {
    title: "Healthcare",
    href: "/industry/healthcare",
  },
  {
    title: "Logistics",
    href: "/industry/logistics",
  },
  {
    title: "E-commerce",
    href: "/industry/ecommerce",
  },
  {
    title: "Education",
    href: "/industry/education",
  },
];

export const solutionsSubnav: {
  title: string;
  icon?: React.ReactNode;
  href: string;
}[] = [
  {
    title: "Doctor App",
    icon: <FaHospitalUser color="#EB5017" />,
    href: "/solutions/doctor-app",
  },
  {
    title: "Grocery App",
    icon: <GiFruitBowl color="#EB5017" />,
    href: "/solutions/grocery-app",
  },
  {
    title: "Restaurant App",
    icon: <MdRestaurantMenu color="#EB5017" />,
    href: "/solutions/restaurant-app",
  },
  {
    title: "Logistics App",
    icon: <TbTruckDelivery color="#EB5017" />,
    href: "/solutions/logistics-website",
  },
  {
    title: "Delivery App",
    icon: <MdDeliveryDining color="#EB5017" />,
    href: "/solutions/delivery-app",
  },
  {
    title: "Education App",
    icon: <MdSchool color="#EB5017" />,
    href: "/solutions/edutech",
  },
  {
    title: "Hotel App",
    icon: <RiHotelLine color="#EB5017" />,
    href: "/solutions/hotel-app",
  },
  {
    title: "Ecommerce App",
    icon: <MdStore color="#EB5017" />,
    href: "/solutions/ecommerce-app",
  },
  {
    title: "Travel App",
    icon: <MdOutlineTravelExplore color="#EB5017" />,
    href: "/solutions/travel-app",
  },
  {
    title: "Sport App",
    icon: <MdSportsHandball color="#EB5017" />,
    href: "/solutions/sport-app",
  },
];
