import React, { Fragment } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import flutterBg from "../../../public/assets/technolgy/flutterBg.png";
import flutterSubImg from "../../../public/assets/technolgy/flutterSubImg.png";
import iosSub2 from "../../../public/assets/technolgy/IOS 1.png";
import Image from "next/image";
import Link from "next/link";
import { FaApple } from "react-icons/fa6";

const Flutter = () => {
  return (
    <Fragment>
      <section className="isolate space-y-8 bg-black px-10 py-20 text-center text-white lg:px-20 lg:text-left">
        <>
          <p className="mx-auto flex w-fit items-center  gap-2 rounded-full border px-4 py-2 font-sora font-normal">
            <span className="overflow-hidden rounded-full bg-[#61F79499] p-1">
              <span className="block h-3 w-3 rounded-full bg-[#05F247]"></span>
            </span>
            <span> Available for Projects</span>
          </p>
          <h1 className="text-balance font-sora text-4xl text-center font-semibold lg:text-7xl">
            Flutter Your Wings and Soar into Digital Innovation
          </h1>
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="flex-1">
              <Image
                src={flutterBg}
                alt=""
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="font flex flex-1 flex-col gap-4 text-left">
              <p className="font-inter text-base lg:text-lg">
                In the dynamic landscape of cross-platform development, Flutter
                emerges as the beacon of versatility and efficiency. With its
                expressive UI framework and single codebase approach, Flutter
                empowers developers to create stunning, natively compiled
                applications for mobile, web, and desktop—all with blazing-fast
                performance.
              </p>
              <button className="flex w-fit items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
                <Link href="/contact">Get started now</Link>{" "}
                <IoIosArrowRoundForward size={24} />
              </button>
            </div>
          </div>
        </>
      </section>
      <section className="">
        <div className="isolate gap-10 bg-[#F3F4F6] px-12 py-16 text-black lg:px-24">
          <h3 className="mb-7 font-sora text-3xl font-semibold lg:text-6xl">
            We build Range of Apps with Flutter
          </h3>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex-1 space-y-4">
              <p className="font-inter text-base lg:text-lg">
                In the dynamic landscape of cross-platform development, Flutter
                emerges as the beacon of versatility and efficiency. With its
                expressive UI framework and single codebase approach, Flutter
                empowers developers to create stunning, natively compiled
                applications for mobile, web, and desktop—all with blazing-fast
                performance.
              </p>
              <button className="flex w-fit items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
                <Link href="/contact">Get started now</Link>{" "}
                <IoIosArrowRoundForward size={24} />
              </button>
            </div>
            <div className="flex-1">
              <Image
                src={flutterSubImg}
                alt=""
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Flutter;
