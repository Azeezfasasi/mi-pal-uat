import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";

const CtaSection = () => {
  return (
    <section className="bg-[url('/assets/cta_section_bg.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="md:px-15 space-y-6 bg-[#111928] bg-opacity-40 px-7 py-14 lg:px-24">
        <h3 className="text-4xl font-bold text-[#76A9FA] lg:text-7xl">
          LET’S BE A PART OF YOUR DIGITAL JOURNEY
        </h3>
        <button className="flex items-center gap-2 bg-[#EB5017] p-3 text-white">
          <Link href="/contact">Get started now</Link>{" "}
          <IoIosArrowRoundForward />
        </button>
      </div>
    </section>
  );
};

export default CtaSection;
