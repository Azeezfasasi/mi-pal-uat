import Image from "next/image";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";

const SubSection = ({
  subSectionheading,
  subSectionSubheading,
  subSectionImage,
}: {
  subSectionSubheading: string;
  subSectionheading: string;
  subSectionImage?: string;
}) => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 p-10">
      <div className="relative flex h-[300px] w-full lg:w-8/12 items-center lg:h-[400px]">
        <Image
          src={subSectionImage ? subSectionImage : "/assets/section2.jpg"}
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <div className="w-full lg:w-8/12 space-y-2">
        <h3 className="text-4xl font-semibold">{subSectionheading}</h3>
        <p className="font-inter text-xl">{subSectionSubheading}</p>
        <button className="flex items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
          <Link href="/contact">Get started now</Link>{" "}
          <IoIosArrowRoundForward size={24} />
        </button>
      </div>
    </section>
  );
};

export default SubSection;
