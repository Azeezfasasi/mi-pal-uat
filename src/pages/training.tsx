import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

import cloud from "../../public/assets/training/cloud-compute.jpg";
import data from "../../public/assets/training/data-analysis.jpg";
import devops from "../../public/assets/training/devops.jpg";
import dataScience from "../../public/assets/training/data-science.jpg";
import softwareEngine from "../../public/assets/training/software-engine.jpg";
import softwareDev from "../../public/assets/training/software-dev.jpg";
import machine from "../../public/assets/training/machine.jpg";
import ai from "../../public/assets/training/ai.jpg";
import mobile from "../../public/assets/training/mobile.jpg";
import web from "../../public/assets/training/web-design.jpg";
import cyber from "../../public/assets/training/cyber.jpg";
import ux from "../../public/assets/training/ui-ux.jpg";
import digital from "../../public/assets/training/digital.jpg";

import { IoIosArrowRoundForward } from "react-icons/io";
import { cn } from "@/lib/utils";

const trainingData = [
  {
    image: cloud,
    title: "Cloud Computing",
    price: "₦300k",
    duration: "One month",
    days: "Tue & Thur 2pm to 5pm",
  },
  {
    image: data,
    title: "Data Analysis",
    price: "₦350K",
    duration: "3 months",
    days: "(10am to 1pm) Mon, wed and Fri",
  },
  {
    image: devops,
    title: "DevOps",
    price: "₦650K",
    duration: "3 months",
    days: "Tue & thur 2pm to 5pm (weekends saturdays only)",
  },
  {
    image: dataScience,
    title: "Data Science",
    price: "₦550K",
    duration: "4 months",
    days: "Mon, wed and Fri (10am to 1pm)",
  },
  {
    image: softwareDev,
    title: "Software Development",
    price: "₦550K",
    duration: "4 months",
    days: "Mon, Wed, and Fri (10am to 1pm)",
  },
  {
    image: softwareEngine,
    title: "Software Engineering",
    price: "₦2.2M",
    duration: "8 months",
    days: "Mon, Wed, and Fri (10am to 1pm)",
  },
  {
    image: machine,
    title: "Machine Learning",
    price: "₦350K",
    duration: "1 months",
    days: "(10am to 1pm) Mon, wed and Fri",
  },
  {
    image: ai,
    title: "Artificial Intelligence",
    price: "₦1.2M",
    duration: "5 months",
    days: "Mon, Wed, and Fri (10am to 1pm)",
  },
  {
    image: mobile,
    title: "Mobile Development",
    price: "₦350K",
    duration: "3 months",
    days: "(10am to 1pm) Tue and Thur",
  },
  {
    image: ux,
    title: "UX Design",
    price: "₦350K",
    duration: "3 months",
    days: "(1pm to 4pm) Tue and Thurs",
  },
  {
    image: digital,
    title: "Digital Marketing",
    price: "₦100K",
    duration: "4 Weeks",
    days: "Saturdays 10am to 1pm",
  },
  {
    image: cyber,
    title: "Cybersecurity",
    price: "₦550K",
    duration: "5 months",
    days: "(10am to 1pm) Tue and Thur",
  },
  {
    image: web,
    title: "Web Design",
    price: "₦100K",
    duration: "4 Weeks",
    days: "4 Saturdays 1pm to 4pm",
  },
];

const Training = () => {
  return (
    <Fragment>
      <section
        className={cn(
          "relative isolate bg-[url('/assets/training/trainingBg.jpg')] bg-cover bg-no-repeat px-10 py-16 lg:px-20",
        )}
      >
        <div className="absolute inset-0 -z-[1] bg-black opacity-50"></div>

        <div
          className={cn(
            "flex flex-col items-center gap-5 text-center text-white lg:items-start lg:text-left",
          )}
        >
          <p className="flex items-center gap-2 rounded-full border px-4 py-2 font-sora font-normal lg:self-start">
            <span className="overflow-hidden rounded-full bg-[#61F79499] p-1">
              <span className="block h-3 w-3 rounded-full bg-[#05F247]"></span>
            </span>
            <span>Available for Projects</span>
          </p>
          <h1 className="text-balance font-sora text-5xl font-semibold lg:text-7xl">
            Building top Talents for the world
          </h1>
          <p className="font-inter text-base lg:text-lg lg:text-left">
            Intensive BOOTCAMPS Designed To Help You Get Into Tech
          </p>
          <button className="flex items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
            <Link href="/contact">Get started now</Link>{" "}
            <IoIosArrowRoundForward size={24} />
          </button>
        </div>
      </section>

      <section className="px-10 py-10 lg:px-20 md:py-5">
        <h3 className="text-xl font-semibold lg:text-4xl">
          Experience Lifelong Learning with Mi-pal Training Partners
        </h3>
        <div className="mt-3 grid grid-cols-responsive300 gap-6">
          {trainingData.map((course, index) => (
            <Link key={index} href="/contact">
              <article className="rounded-2xl bg-[#F6F8F7] p-5 font-inter">
                <div className="relative h-[200px] overflow-hidden rounded-lg">
                  <Image src={course.image} fill alt={course.title} />
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between gap-5">
                    <p className="text-xl text-[#1E429F] md:text-lg">
                      {course.title}
                    </p>
                    <p className="text-lg text-[#D03801]">{course.price}</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <p>Duration</p>
                    <p className="flex-1 rounded-md bg-[#E5E7EB] p-2 text-sm text-[#111928]">
                      {course.duration}
                    </p>
                  </div>
                  <div className="flex items-center gap-5">
                    <p>Days</p>
                    <p className="flex-1 rounded-md bg-[#E5E7EB] p-2 text-sm text-[#111928]">
                      {course.days}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default Training;
