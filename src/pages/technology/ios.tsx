import React, { Fragment } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import ioshero from "../../../public/assets/technolgy/iosHero.png";
import iosSub1 from "../../../public/assets/technolgy/iosSub.png";
import iosSub2 from "../../../public/assets/technolgy/IOS 1.png";
import custom from "../../../public/assets/technolgy/iosCustom.png";
import iwatch from "../../../public/assets/technolgy/iwatch.png";
import ipad from "../../../public/assets/technolgy/ipad.png";
import maintanance from "../../../public/assets/technolgy/iosMantainace.png";
import Image from "next/image";
import Link from "next/link";
import { FaApple } from "react-icons/fa6";

const Ios = () => {
  return (
    <Fragment>
      <section className="isolate flex items-center gap-9 bg-black px-10 py-20 text-white lg:px-20">
        <div className="space-y-8">
          <p className="flex w-fit items-center gap-2 rounded-full border px-4 py-2 font-sora font-normal">
            <span className="overflow-hidden rounded-full bg-[#61F79499] p-1">
              <span className="block h-3 w-3 rounded-full bg-[#05F247]"></span>
            </span>
            <span> Available for Projects</span>
          </p>
          <h1 className="text-balance font-sora text-4xl font-semibold lg:text-7xl">
            Elevate Your Digital Vision with the Elegance of{" "}
            <span className="text-[#C3DDFD]">iOS</span>
            <FaApple
              size={40}
              className="inline self-end text-end"
              color="#EB5017"
            />
          </h1>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="flex-1 font-inter text-base-sm md:text-lg">
              In the realm of sleek sophistication and unparalleled user
              experience, iOS stands as the epitome of digital craftsmanship.
              With its intuitive design language and seamless ecosystem, iOS
              empowers developers to create transformative experiences that
              captivate and inspire. From stunning visual aesthetics to seamless
              performance, let&apos;s harness the elegance of iOS to craft
              digital products that delight users and elevate brands to new
              heights of success.
            </p>
            <div className="flex-1">
              <Image
                src={ioshero}
                alt=""
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          <button className="flex w-fit items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
            <Link href="/contact">Get started now</Link>{" "}
            <IoIosArrowRoundForward size={24} />
          </button>
        </div>
      </section>
      <section>
        <div className="isolate gap-10 bg-[#F3F4F6] px-12 py-16 text-black lg:px-24">
          <h3 className="mb-7 font-sora text-3xl font-semibold lg:text-6xl">
            We Build with Industry Standard{" "}
            <span className="text-[#C3DDFD]">iOS</span>{" "}
          </h3>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex-1">
              <Image
                src={iosSub1}
                alt=""
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="flex-1 space-y-4">
              <p className="font-inter text-base lg:text-lg">
                From intuitive user interfaces to seamless integration with
                cutting-edge technologies, let&apos;s harness the boundless
                potential of Android to redefine what&apos;s possible in the
                world of mobile technology.
              </p>
              <button className="flex w-fit items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
                <Link href="/contact">Get started now</Link>{" "}
                <IoIosArrowRoundForward size={24} />
              </button>
            </div>
          </div>
        </div>
        <div className=" ">
          <Image
            src={iosSub2}
            alt=""
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </section>
      <section className="isolate gap-10 bg-black px-12 py-16 text-white lg:px-24">
        <div className="mb-7 w-full">
          <h3 className="font-sora text-3xl font-semibold lg:text-4xl">
            Our iOS services...
          </h3>
          <p className="font-inter text-base lg:text-lg">
            Have a look at the ranges of Android services we offer
          </p>
        </div>
        <div className="my-4 grid grid-cols-responsive250 gap-6">
          <article className="overflow-hidden rounded-lg font-inter">
            <div className="h-48  overflow-hidden rounded-t-lg bg-gradient-to-br from-black to-[#737373]">
              <Image
                src={custom}
                alt=""
                className="mx-auto object-contain px-7 pt-7"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="pt-3">
              <p className="mb-2 font-semibold">Custom ios development</p>
              <p className="text-sm">
                We create custom iOS apps with Swift, Objective-C, and Xcode,
                featuring stunning graphics, seamless user experience, and
                robust backend systems tailored for sensitive sectors.
              </p>
            </div>
          </article>
          <article className="overflow-hidden rounded-lg font-inter">
            <div className="h-48 overflow-hidden rounded-t-lg bg-gradient-to-br from-black to-[#737373]">
              <Image
                src={iwatch}
                alt=""
                className="mx-auto object-contain px-7 pt-7"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="pt-3">
              <p className="mb-2 font-semibold">iWatch App Development</p>
              <p className="text-sm">
                We create custom iOS apps with Swift, Objective-C, and Xcode,
                featuring stunning graphics, seamless user experience, and
                robust backend systems tailored for sensitive sectors.
              </p>
            </div>
          </article>
          <article className="overflow-hidden rounded-lg font-inter">
            <div className="h-48 overflow-hidden rounded-t-lg bg-gradient-to-br from-black to-[#737373]">
              <Image
                src={ipad}
                alt=""
                className="w-full object-contain pl-7 pt-7"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="pt-3">
              <p className="mb-2 font-semibold">iPad App Development</p>
              <p className="text-sm">
                We create custom iOS apps with Swift, Objective-C, and Xcode,
                featuring stunning graphics, seamless user experience, and
                robust backend systems tailored for sensitive sectors.
              </p>
            </div>
          </article>
          <article className="overflow-hidden rounded-lg font-inter">
            <div className="h-48 overflow-hidden rounded-t-lg bg-gradient-to-br from-black to-[#737373]">
              <Image
                src={maintanance}
                alt=""
                className="mx-auto object-contain pt-7"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="pt-3">
              <p className="mb-2 font-semibold">iOS Maintenance & Support</p>
              <p className="text-sm">
                We create custom iOS apps with Swift, Objective-C, and Xcode,
                featuring stunning graphics, seamless user experience, and
                robust backend systems tailored for sensitive sectors.
              </p>
            </div>
          </article>
        </div>
      </section>
    </Fragment>
  );
};

export default Ios;
