import React, { Fragment } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import goSide from "../../../public/assets/technolgy/goSide.png";
import goBg from "../../../public/assets/technolgy/goBg.jpg";
import iosSub1 from "../../../public/assets/technolgy/goSubSide.png";
import iosSub2 from "../../../public/assets/technolgy/IOS 1.png";
import concurency from "../../../public/assets/technolgy/concurrency.jpg";
import perfomance from "../../../public/assets/technolgy/fast.jpg";
import ipad from "../../../public/assets/technolgy/cross-platform.jpg";
import relaibility from "../../../public/assets/technolgy/relaibility.jpg";
import Image from "next/image";
import Link from "next/link";

const Golang = () => {
  return (
    <Fragment>
      <section
        className="relative isolate flex items-center gap-10 bg-cover bg-no-repeat px-10 py-20 text-white lg:px-20"
        style={{
          backgroundImage: `url("/assets/technolgy/goBg.jpg")`,
        }}
      >
        <div className="absolute inset-0 -z-[1] bg-black opacity-50"></div>
        <div className="flex-[2] space-y-6 2md:flex-auto">
          <p className="flex w-fit items-center gap-2 rounded-full border px-4 py-2 font-sora font-normal">
            <span className="overflow-hidden rounded-full bg-[#61F79499] p-1">
              <span className="block h-3 w-3 rounded-full bg-[#05F247]"></span>
            </span>
            <span> Available for Projects</span>
          </p>
          <h1 className="text-balance font-sora text-4xl font-semibold lg:text-7xl">
            Build simple, secure, scalable systems with Go
          </h1>
          <p className="flex-1 font-inter text-base lg:text-lg">
            Empower your development with Go&apos;s powerful, efficient, and
            easy-to-use programming language. Create robust systems that grow
            with your business needs.
          </p>
          <button className="flex w-fit items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
            <Link href="/contact">Get started now</Link>{" "}
            <IoIosArrowRoundForward size={24} />
          </button>
        </div>

        <div className="flex-1 hidden lg:block">
          <Image
            src={goSide}
            alt=""
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </section>
      <section>
        <div className="isolate flex flex-col lg:flex-row gap-10 bg-[#F3F4F6] px-12 py-16 text-black lg:px-24">
          <div className="flex-1">
            <h3 className="mb-7 font-sora text-3xl font-semibold lg:text-6xl">
              We Build with Industry Standard{" "}
            </h3>
            <div className="flex-1 space-y-4">
              <ul className="list-inside list-disc">
                <li>An open-source programming language supported by Google</li>
                <li>Large ecosystem of partners, communities, and tools</li>
                <li>Easy to learn and great for teams</li>
                <li>Built-in concurrency and a robust standard library</li>
              </ul>
              <button className="flex w-fit items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
                <Link href="/contact">Get started now</Link>{" "}
                <IoIosArrowRoundForward size={24} />
              </button>
            </div>
          </div>
          <div className="flex-1 space-y-5">
            <p>Companies using Golang</p>
            <Image
              src={iosSub1}
              alt=""
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
        <div className="">
          <Image
            src={iosSub2}
            alt=""
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </section>
      <section className="isolate gap-10  bg-black px-12 py-16 text-white lg:px-24">
        <div className="mb-7 w-full space-y-3 text-center">
          <h3 className="font-sora text-3xl font-semibold text-[#C3DDFD] lg:text-4xl">
            What is Golang and How Can It Benefit Your Business?
          </h3>
          <p className="font-inter text-base lg:text-lg">
            At mi-pal.com, we harness the power of Golang (or Go), a
            cutting-edge programming language developed by Google, to transform
            your technological ideas into reality. Known for its performance and
            efficiency, Golang is the perfect choice for modern,
            high-performance applications. Here’s why Golang can be a
            game-changer for your business:
          </p>
        </div>
        <div className="my-4 grid grid-cols-responsive250 gap-6">
          <article className="overflow-hidden rounded-lg font-inter">
            <div className="h-48  overflow-hidden rounded-lg bg-gradient-to-br from-black to-[#737373]">
              <Image
                src={perfomance}
                alt=""
                className="h-48 object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="pt-3">
              <p className="mb-2 font-semibold text-[#76A9FA]">Performance</p>
              <p className="text-sm">
                Golang&apos;s compiled nature and efficient memory management
                deliver lightning-fast execution speeds, making it ideal for
                performance-critical applications.
              </p>
            </div>
          </article>
          <article className="overflow-hidden rounded-lg font-inter">
            <div className="h-48 overflow-hidden rounded-lg bg-gradient-to-br from-black to-[#737373]">
              <Image
                src={concurency}
                alt=""
                className="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="pt-3">
              <p className="mb-2 font-semibold text-[#76A9FA]">Concurrency</p>
              <p className="text-sm">
                With built-in support for concurrent programming, Golang allows
                us to create highly scalable and responsive systems that handle
                multiple tasks seamlessly.
              </p>
            </div>
          </article>
          <article className="overflow-hidden rounded-lg font-inter">
            <div className="h-48 overflow-hidden rounded-lg bg-gradient-to-br from-black to-[#737373]">
              <Image
                src={ipad}
                alt=""
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="pt-3">
              <p className="mb-2 font-semibold text-[#76A9FA]">Simplicity</p>
              <p className="text-sm">
                Golang’s clean and straightforward syntax reduces complexity,
                accelerating development times and enhancing maintainability.
              </p>
            </div>
          </article>
          <article className="overflow-hidden rounded-lg font-inter">
            <div className="h-48 overflow-hidden rounded-lg bg-gradient-to-br from-black to-[#737373]">
              <Image
                src={relaibility}
                alt=""
                className=" object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="pt-3">
              <p className="mb-2 font-semibold text-[#76A9FA]">Reliability</p>
              <p className="text-sm">
                Designed with robust error handling and strong typing, Golang
                ensures your applications are reliable and secure.
              </p>
            </div>
          </article>
        </div>
      </section>
    </Fragment>
  );
};

export default Golang;
