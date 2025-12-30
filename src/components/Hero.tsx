import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";

const Hero = ({
  heading,
  subHeading,
  heroBg,
  sideImage,
  containerClass,
  hasBg = true,
}: {
  heading: string;
  subHeading: string;
  heroBg?: string | StaticImageData;
  sideImage?: string;
  containerClass?: string;
  hasBg?: boolean;
}) => {
  let hasSideImg = !!sideImage;
  return (
    <header
      className={cn(
        "relative isolate bg-cover bg-no-repeat px-10 py-16 lg:px-20",
        hasSideImg && "flex flex-col lg:flex-row items-center gap-10 lg:gap-4",
        containerClass,
      )}
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
      }}
    >
      {hasBg && (
        <div className="absolute inset-0 -z-[1] bg-black opacity-50"></div>
      )}
      <div
        className={cn(
          "flex flex-col items-center gap-5 text-center text-white lg:items-start lg:text-left",
          hasSideImg && "flex-1 items-start text-left md:items-start",
        )}
      >
        <p className="flex items-center gap-2 rounded-full border px-4 py-2 font-sora font-normal lg:self-start">
          <span className="overflow-hidden rounded-full bg-[#61F79499] p-1">
            <span className="block h-3 w-3 rounded-full bg-[#05F247]"></span>
          </span>
          <span>Available for Projects</span>
        </p>
        <h1 className="text-balance font-sora text-4xl lg:text-7xl font-semibold xsm:text-2xl">
          {heading}
        </h1>
        <p className="font-inter text-base lg:text-left lg:text-lg">
          {subHeading}
        </p>
        <button className="flex items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
          <Link href="/contact">Get started now</Link>{" "}
          <IoIosArrowRoundForward size={24} />
        </button>
      </div>
      {hasSideImg && sideImage && (
        <div className="relative min-h-[600px] min-w-[300px] self-center hidden lg:block">
          <Image
            src={sideImage}
            fill
            alt=""
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
    </header>
  );
};

export default Hero;
