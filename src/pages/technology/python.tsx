import Image from "next/image";
import React, { Fragment } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import pythonhero from "../../../public/assets/technolgy/pythonHero.png";
import pythonsub from "../../../public/assets/technolgy/pythonSub.png";
import Link from "next/link";

const Python = () => {
  return (
    <Fragment>
      <section className="flex items-center gap-9 bg-black px-10 py-16 text-white lg:px-20">
        <div className="flex-1 space-y-5">
          <p className="flex w-fit items-center gap-2 rounded-full border px-4 py-2 font-sora font-normal">
            <span className="overflow-hidden rounded-full bg-[#61F79499] p-1">
              <span className="block h-3 w-3 rounded-full bg-[#05F247]"></span>
            </span>
            <span> Available for Projects</span>
          </p>
          <h1 className="text-balance font-sora text-4xl font-semibold lg:text-7xl">
            Python for Modern App Development
          </h1>
          <p className="font-inter text-base lg:text-lg">
            In the realm of simplicity, versatility, and sheer brilliance,
            Python emerges as the language of choice for innovators, creators,
            and problem solvers alike. With its clean syntax, expansive
            libraries, and dynamic community, Python empowers developers to
            bring their boldest ideas to life with unparalleled ease and
            efficiency.
          </p>
          <button className="flex w-fit items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
            <Link href="/contact">Get started now</Link>{" "}
            <IoIosArrowRoundForward size={24} />
          </button>
        </div>
        <div>
          <Image
            src={pythonhero}
            alt=""
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </section>
      <section className="isolate flex flex-col lg:flex-row items-center gap-10 bg-white px-10 py-16 text-black lg:px-20">
        <div className="flex-1">
          <Image
            src={pythonsub}
            alt=""
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col gap-5">
          <h3 className="font-sora text-3xl font-semibold lg:text-5xl">
            From web development and data science to artificial intelligence and
            beyond.
          </h3>
          <p className="font-inter text-base lg:text-lg">
            Let&apos;s embrace the elegance of Python and embark on a journey of
            exploration and discovery where every line of code is a brushstroke
            on the canvas of possibility.
          </p>
          <button className="flex w-fit items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
            <Link href="/contact">Get started now</Link>{" "}
            <IoIosArrowRoundForward size={24} />
          </button>
        </div>
      </section>
    </Fragment>
  );
};

export default Python;
