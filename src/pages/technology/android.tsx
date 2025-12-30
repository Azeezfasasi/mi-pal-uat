import React, { Fragment } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import androidhero from "../../../public/assets/technolgy/androidHero.png";
import androidsub from "../../../public/assets/technolgy/androidSub.png";
import portability from "../../../public/assets/technolgy/portability.png";
import testing from "../../../public/assets/technolgy/android-testing.jpg";
import custom from "../../../public/assets/technolgy/android-custom.png";
import widget from "../../../public/assets/technolgy/widget.png";
import maintanance from "../../../public/assets/technolgy/maintanance.png";
import ui from "../../../public/assets/technolgy/android-ui.jpg";
import update from "../../../public/assets/technolgy/android-update.png";
import enterprise from "../../../public/assets/technolgy/android-enterprise.png";
import Image from "next/image";
import { FaAndroid } from "react-icons/fa6";

const articles = [
  {
    imageSrc: custom,
    alt: "Custom Android App development",
    title: "Custom Android App development",
    description:
      "We build bespoke Android applications tailored to your unique business needs and requirements.",
  },
  {
    imageSrc: portability,
    alt: "App Portability",
    title: "App Portability",
    description:
      "Seamlessly migrate your app across different platforms with our expert portability solutions.",
  },
  {
    imageSrc: testing,
    alt: "Android App testing",
    title: "Android App testing",
    description:
      "Our developers continuously focus on bug elimination, incorporating new features, and effectively managing the application.",
  },
  {
    imageSrc: widget,
    alt: "Android Widget Dev.",
    title: "Android Widget Dev.",
    description:
      "Our experts can help you create top-tier Android widgets, enhancing your app's usability and system integration.",
  },
  {
    imageSrc: maintanance,
    alt: "Android App Maintenance",
    title: "Android App Maintenance",
    description:
      "Keep your app running smoothly with our comprehensive maintenance services.",
  },
  {
    imageSrc: ui,
    alt: "UI/UX Design Dev",
    title: "UI/UX Design Dev",
    description:
      "Craft visually appealing and user-friendly interfaces for your Android applications.",
  },
  {
    imageSrc: update,
    alt: "Android App Update",
    title: "Android App Update",
    description:
      "Regular updates to keep your app current with the latest features and improvements.",
  },
  {
    imageSrc: enterprise,
    alt: "Enterprise Android Development",
    title: "Enterprise Android Development",
    description:
      "Build robust enterprise-level Android applications that meet your business needs.",
  },
];

const Android = () => {
  return (
    <Fragment>
      <section className="isolate flex items-center gap-9 bg-white px-10 py-16 text-black lg:px-20">
        <div className="space-y-5">
          <p className="flex w-fit items-center gap-2 rounded-full border px-4 py-2 font-sora font-normal ">
            <span className="overflow-hidden rounded-full bg-[#61F79499] p-1">
              <span className="block h-3 w-3 rounded-full bg-[#05F247]"></span>
            </span>
            <span> Available for Projects</span>
          </p>
          <h1 className="text-balance font-sora text-4xl font-semibold lg:text-7xl">
            Innovative end-to-end{" "}
            <span className="text-[#EB5017]">Android OS</span>
            <FaAndroid
              size={40}
              className="inline self-end text-end"
              color="#1c9444e8"
            />
            Development
          </h1>
          <p className="font-inter text-base lg:text-lg">
            In the vibrant ecosystem of mobile innovation, Android emerges as
            the canvas upon which digital dreams come to life. With its
            open-source flexibility and expansive reach, Android empowers
            developers to craft immersive experiences that resonate with users
            across the globe.
          </p>
          <button className="flex w-fit items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
            <span>Get started now</span> <IoIosArrowRoundForward size={24} />
          </button>
        </div>
        <div>
          <Image
            src={androidhero}
            alt=""
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </section>
      <section className="isolate gap-10 bg-[#F3F4F6] px-12 py-16 text-black lg:px-24">
        <h3 className="mb-7 font-sora text-3xl font-semibold lg:text-6xl">
          Unleash the Power of <span className="text-[#EB5017]">Android</span>{" "}
          to Craft Seamless Experiences!
        </h3>
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1">
            <Image
              src={androidsub}
              alt=""
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="flex-1 space-y-4">
            <p className="font-inter text-base lg:text-lg">
              From intuitive user interfaces to seamless integration with
              cutting-edge technologies, let&apos;s harness the boundless
              potential of Android to redefine what&apos;s possible in the world
              of mobile technology.
            </p>
            <button className="flex w-fit items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
              <span>Get started now</span> <IoIosArrowRoundForward size={24} />
            </button>
          </div>
        </div>
      </section>
      <section className="isolate gap-10 bg-white px-12 py-16 text-black lg:px-24">
        <div>
          <div className="mb-7 w-full text-center">
            <h3 className="font-sora text-3xl font-semibold lg:text-4xl">
              Our Android services...
            </h3>
            <p className="font-inter text-base lg:text-lg">
              Have a look at the ranges of Android services we offer
            </p>
          </div>
          <div className="my-4 grid grid-cols-responsive250 gap-6">
            {articles.map((article, index) => (
              <article
                key={index}
                className="overflow-hidden rounded-lg bg-[#E1EFFE] font-inter"
              >
                <div className="h-48 overflow-clip">
                  <Image
                    src={article.imageSrc}
                    alt={article.alt}
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="mb-2 font-semibold text-[#252432]">
                    {article.title}
                  </p>
                  <p className="text-sm">{article.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Android;
