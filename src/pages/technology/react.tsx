import React, { Fragment } from "react";
import Image from "next/image";
import reactSide from "../../../public/assets/technolgy/reactSide.png";
import custom from "../../../public/assets/technolgy/dynamic.png";
import iwatch from "../../../public/assets/technolgy/fast.jpg";
import ipad from "../../../public/assets/technolgy/cross-platform.jpg";
import { IoIosArrowRoundForward } from "react-icons/io";

const ReactPage = () => {
  return (
    <Fragment>
      <section
        className="isolate flex items-center gap-10 bg-cover bg-no-repeat px-10 py-16 text-white lg:px-20"
        style={{
          backgroundImage: `url("/assets/technolgy/reactBg.jpg")`,
        }}
      >
        <div className="flex-[2] space-y-5">
          <p className="flex w-fit items-center gap-2 rounded-full border px-4 py-2 font-sora font-normal ">
            <span className="overflow-hidden rounded-full bg-[#61F79499] p-1">
              <span className="block h-3 w-3 rounded-full bg-[#05F247]"></span>
            </span>
            <span> Available for Projects</span>
          </p>
          <h1 className="text-balance font-sora text-4xl font-semibold lg:text-7xl">
            Elevate Your Web Applications with React
          </h1>
          <p className="font-inter text-base lg:text-lg">
            Transform your vision into reality with React’s unparalleled
            flexibility and performance. Build seamless, responsive user
            experiences with ease.
          </p>
          <button className="flex w-fit items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
            <span>Get started now</span> <IoIosArrowRoundForward size={24} />
          </button>
        </div>
        <div className="flex-1">
          <Image
            src={reactSide}
            alt=""
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </section>

      <section className="isolate gap-10 bg-black px-12 py-16 text-white lg:px-24">
        <div className="mb-7 w-full space-y-2">
          <h3 className="text-center font-sora text-3xl font-semibold text-[#C3DDFD] lg:text-4xl">
            What is React and How Can It Benefit Your Business?
          </h3>
          <p className="text-center font-inter text-base font-normal lg:text-lg">
            At mi-pal.com, we harness the power of React, a cutting-edge
            JavaScript library, to transform your technological aspirations into
            reality. React revolutionizes the way we build user interfaces,
            offering unparalleled speed, flexibility, and interactivity.
            Here&apos;s why React can be a game-changer for your business
          </p>
        </div>
        <div className="my-4 grid grid-cols-responsive250 gap-10">
          <article className="overflow-hidden rounded-lg font-inter">
            <div className="h-48 overflow-hidden rounded-t-lg bg-gradient-to-br from-black to-[#737373]">
              <Image
                src={custom}
                alt=""
                className="w-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="pt-3">
              <p className="mb-2 text-lg font-semibold text-[#76A9FA]">
                Cross-Platform Compatibility
              </p>
              <p className="text-sm">
                React/Native allows us to develop a single codebase that runs
                seamlessly on both iOS and Android devices, streamlining
                development and reducing time-to-market without compromising on
                quality or performance
              </p>
            </div>
          </article>
          <article className="overflow-hidden rounded-lg font-inter">
            <div className="h-48 overflow-hidden rounded-t-lg bg-gradient-to-br from-black to-[#737373]">
              <Image
                src={iwatch}
                alt=""
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="pt-3">
              <p className="mb-2 text-lg font-semibold text-[#76A9FA]">
                Fast Performance
              </p>
              <p className="text-sm">
                By leveraging native components, React/Native delivers
                blazing-fast performance and a native-like user experience,
                ensuring that your applications stand out from the crowd and
                delight users.
              </p>
            </div>
          </article>
          <article className="overflow-hidden rounded-lg font-inter">
            <div className="h-48 overflow-hidden rounded-t-lg bg-gradient-to-br from-black to-[#737373]">
              <Image
                src={ipad}
                alt=""
                className=" object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="pt-3">
              <p className="mb-2 text-lg font-semibold text-[#76A9FA]">
                Rapid Development
              </p>
              <p className="text-sm">
                With React/Native&apos;s hot reload feature, we can make
                real-time updates to your app&apos;s codebase and see the
                changes instantly, enabling rapid iteration and faster delivery
                of features and enhancements.
              </p>
            </div>
          </article>
        </div>
      </section>
    </Fragment>
  );
};

export default ReactPage;
