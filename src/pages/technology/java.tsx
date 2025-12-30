import React, { Fragment } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import javaHero from "../../../public/assets/technolgy/javaHero.png";
import javaSub from "../../../public/assets/technolgy/javaSub.png";
import Image from "next/image";
import { FaJava } from "react-icons/fa6";
import Link from "next/link";

const Java = () => {
  return (
    <Fragment>
      <section className="isolate flex flex-col items-center gap-9 bg-white px-10 pt-16 text-center text-black lg:px-20">
        <div className="flex flex-1 flex-col lg:flex-row gap-5 lg:text-left">
          <p className="mx-auto flex w-fit items-center gap-2 rounded-full border px-4 py-2 font-sora font-normal lg:mx-auto">
            <span className="overflow-hidden rounded-full bg-[#61F79499] p-1">
              <span className="block h-3 w-3 rounded-full bg-[#05F247]"></span>
            </span>
            <span> Available for Projects</span>
          </p>
          <h1 className="text-balance font-sora text-4xl font-semibold text-[#EB5017] sm:text-xl lg:text-7xl">
            Your Digital Journey with the Timeless Power of Java
          </h1>
          <p className="font-inter text-base lg:text-lg text-black">
            In the vast realm of software development, Java stands as the
            steadfast pillar of reliability, versatility, and performance. With
            its platform independence and robust ecosystem, Java empowers
            developers to craft scalable, secure, and mission-critical
            applications that transcend boundaries and drive innovation.
          </p>
          <button className="flex w-fit items-center gap-2 self-center bg-[#EB5017] p-3 font-inter font-semibold text-white 2md:self-start">
            <Link href="/contact">Get started now</Link>{" "}
            <IoIosArrowRoundForward size={24} />
          </button>
        </div>
        <div>
          <Image
            src={javaHero}
            alt=""
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </section>
      <section>
        <div className="isolate gap-10 bg-[#F3F4F6] px-12 py-16 text-black sm:px-10 lg:px-24">
          <div className="flex items-center">
            <h3 className="mb-7 flex-1 font-sora text-3xl font-semibold text-[#EB5017] lg:text-6xl">
              From enterprise solutions to mobile applications and beyond,{" "}
            </h3>
            <FaJava size={30} color="#EB5017" />
          </div>

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
                src={javaSub}
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

export default Java;
