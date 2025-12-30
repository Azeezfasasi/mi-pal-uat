import { inter, sora } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  industrySubnav,
  servicesSubnav,
  solutionsSubnav,
  technologySubnav,
} from "./Navbar/data";

const Footer = () => {
  return (
    <footer className={`${inter.className}`}>
      <div className="flex flex-col lg:flex-row justify-between gap-10 bg-[#111928] p-10 px-8 lg:p-12">
        <div className="space-y-7">
          <Link
            href="/"
            className={`font-sora text-2xl font-bold ${sora.className}`}
          >
            <span className="font-sora text-white">Mi</span>
            <span className="text-[#DB3A07]">-Pal</span>
          </Link>
          <p className="text-sm text-[#EAECF0]">
            Empowering businesses with digital solutions that drive growth.
          </p>
        </div>
        <div className="font-semibold">
          <p className="mb-3 text-sm text-[#76A9FA]">Services</p>
          <ul className="space-y-3">
            {servicesSubnav.map((service) => (
              <li className="text-sm text-[#EAECF0]" key={service.title}>
                <Link href={service.href}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="font-semibold">
          <p className="mb-3 text-sm text-[#76A9FA]">Technology</p>
          <ul className="space-y-4">
            {technologySubnav.map((technology) => (
              <li className="text-sm text-[#EAECF0]" key={technology.title}>
                <Link href={technology.href}>{technology.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="font-semibold">
          <p className="mb-3 text-sm text-[#76A9FA]">Industry</p>
          <ul className="space-y-4">
            {industrySubnav.map((industry) => (
              <li key={industry.title} className="text-sm text-[#EAECF0]">
                <Link href={industry.href}>{industry.title} </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="font-semibold">
          <p className="mb-3 text-sm text-[#76A9FA]">Solutions</p>
          <ul className="space-y-4">
            {solutionsSubnav.map((solution) => (
              <li className="text-sm text-[#EAECF0]" key={solution.title}>
                <Link href={solution.href}>{solution.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`flex flex-col lg:flex-row justify-between gap-4 bg-white p-6 px-10 font-sora lg:items-center lg:justify-center`}>
        <p>© {new Date().getFullYear()} Mi-Pal. All rights reserved.</p>

        <div className="flex items-center justify-center gap-5 lg:w-full">
          <Link href="/privacy-policy" className="text-sm underline">
            <p>Privacy Policy</p>
          </Link>
          <Link href="/cookie-policy" className="text-sm underline">
            <p>Cookie Policy</p>
          </Link>
          <Link href="/terms-condition" className="text-sm underline">
            <p>Terms and condition</p>
          </Link>
        </div>
        <div className="flex justify-center items-center gap-5">
          <Link
            target="_blank"
            href="https://www.linkedin.com/company/mi-pal-technologies/"
          >
            <FaLinkedin />
          </Link>
          <Link
            target="_blank"
            href="https://www.facebook.com/profile.php?id=61561162100753"
          >
            <FaFacebook />
          </Link>
          <Link target="_blank" href="https://x.com/Mi_Paltech">
            <FaXTwitter />
          </Link>
          <Link target="_blank" href="https://www.instagram.com/mipaltech/">
            <FaInstagram />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
