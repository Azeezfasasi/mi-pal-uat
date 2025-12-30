import React, { Fragment } from "react";
import image21 from "../../../public/assets/aboutus/image 21.png";
import image22 from "../../../public/assets/aboutus/image 22.png";
import image23 from "../../../public/assets/aboutus/image 23.png";
import star1 from "../../../public/assets/aboutus/star1.png";
import Image from "next/image";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";

const AboutUs = () => {
  return (
    <Fragment>
      <section className="px-10 pt-7 lg:px-28">
        <p className="flex w-fit items-center gap-2 rounded-full border px-4 py-2 font-sora font-normal">
          <span className="overflow-hidden rounded-full bg-[#61F79499] p-1">
            <span className="block h-3 w-3 rounded-full bg-[#05F247]"></span>
          </span>
          <span>About us</span>
        </p>
        <h1 className="my-5 text-balance text-5xl font-semibold lg:text-7xl">
          We Provide you the tool you need to reach the World
        </h1>
        <div className="relative flex overflow-y-hidden w-full">
          <div className="relative -bottom-12">
            <Image src={image22} alt="" className="h-full object-contain" />
          </div>
          <div className="relative -bottom-6">
            <Image src={image23} alt="" className="h-full object-contain" />
          </div>
          <div>
            <Image src={image21} alt="" className="h-full object-cover" />
          </div>
        </div>
      </section>
      <section className="relative isolate space-y-5 bg-black py-10 text-white">
        {/* <div className="absolute bottom-1/2 left-1/2 top-0 z-[-2]  w-[400px] bg-[url('/assets/maskgroup.png')] bg-contain bg-no-repeat">
          <Image src={maskgroup} alt="gradientmask" />
        </div> */}
        <div className="space-y-5 px-10 lg:px-24">
          <h3 className="text-3xl font-semibold lg:text-5xl">
            We incorporate Industry-Leading Agile Project Management tech.
          </h3>
          <p className="font-inter">
            Mi-pal exemplifies excellence in the technology solutions domain by
            incorporating industry-leading agile project management
            methodologies into every facet of its development process, utilizing
            a sophisticated Product Management Team and harnessing world-class
            technologies to bring refined ideas to life.
          </p>
        </div>
        <div className="bg-[#EB5017] px-10 py-3 font-inter lg:px-24">
          <p>
            With a core principle of prioritizing &quot;customer collaboration
            over contract negotiations,&quot; Mi-pal is dedicated to fostering
            strong partnerships with its clients, ensuring that their needs and
            goals remain central throughout the entire project lifecycle. This
            approach enables Mi-pal to be highly adaptable, swiftly responding
            to changes and accommodating evolving requirements with agility and
            precision.
          </p>
        </div>
      </section>
      <section className="bg-white px-5 py-10 pt-7 text-white lg:px-10">
        <div className="space-y-8 bg-[#1F2A37] p-10">
          <div className="flex gap-7">
            <h3 className="text-4xl font-semibold text-[#C3DDFD] lg:text-7xl">
              We take Pride in our Commitment to Customer satisfaction
            </h3>
            <div>
              <Image src={star1} alt="" className="w-full" />
            </div>
          </div>
          <p className="font-inter">
            Mi-pal takes pride in its commitment to customer satisfaction,
            recognizing it as a cornerstone of its operations. By actively
            engaging with clients, understanding their unique processes, and
            providing personalized support every step of the way, Mi-pal ensures
            that each client&apos;s expectations are not only met but exceeded.
          </p>
          <Link
            href="/contact"
            className="flex w-fit items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white"
          >
            <span>Begin your digital journey</span>{" "}
            <IoIosArrowRoundForward size={24} />
          </Link>
        </div>
      </section>
    </Fragment>
  );
};

export default AboutUs;
