import React, { Fragment } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import kotlinhero from "../../../public/assets/technolgy/kotlinHero.png";
import kotlinsub from "../../../public/assets/technolgy/kotlinSub.png";
import Image from "next/image";
import Link from "next/link";

const Kotlin = () => {
  return (
    <Fragment>
      <section className="isolate flex flex-col lg:flex-row items-center gap-9 bg-white px-10 py-16 text-black lg:px-20">
        <div className="flex flex-1 flex-col gap-5">
          <p className="flex w-fit items-center gap-2 rounded-full border px-4 py-2 font-sora font-normal">
            <span className="overflow-hidden rounded-full bg-[#61F79499] p-1">
              <span className="block h-3 w-3 rounded-full bg-[#05F247]"></span>
            </span>
            <span>Available for Projects</span>
          </p>
          <h1 className="font-sora text-4xl font-semibold lg:text-7xl">
            Elevate Your Digital Vision with the Modern Prowess of Kotlin
          </h1>
          <p className="font-inter text-base lg:text-lg">
            In the dynamic landscape of modern development, Kotlin emerges as
            the language of innovation, productivity, and seamless integration.
            With its concise syntax, null safety, and interoperability with
            Java, Kotlin empowers developers to build robust, expressive
            applications that scale effortlessly across platforms.
          </p>
          <button className="flex w-fit items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
            <Link href="/contact">Get started now</Link>{" "}
            <IoIosArrowRoundForward size={24} />
          </button>
        </div>
        <div>
          <Image
            src={kotlinhero}
            alt=""
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </section>
      <section className="isolate gap-10 bg-[#F3F4F6] px-12 py-16 text-black lg:px-24">
        <h3 className="mb-7 font-sora text-3xl font-semibold lg:text-6xl">
          From Android development to server-side applications and beyond.
        </h3>
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1">
            <Image
              src={kotlinsub}
              alt=""
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="flex-1 space-y-4">
            <p className="font-inter text-base lg:text-lg">
              Let&apos;s embrace the modern prowess of Kotlin and unlock a world
              of possibilities where creativity knows no bounds and every line
              of code is a step towards digital excellence.
            </p>
            <button className="flex w-fit items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
              <Link href="/contact">Get started now</Link>{" "}
              <IoIosArrowRoundForward size={24} />
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Kotlin;
