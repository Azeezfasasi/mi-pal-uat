import * as React from "react";
import Link from "next/link";
import { sora } from "@/lib/utils";
import DesktopNavbar from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";

function Navbar() {
  return (
    <nav className={`flex w-full items-center justify-between gap-6 px-5 py-6 lg:px-20 ${sora.className}`}>
      <Link href="/" className="text-2xl font-bold">
        <span className="text-black">Mi</span>
        <span className="text-[#EB5017]">-Pal</span>
      </Link>
      <DesktopNavbar />
      <div className="lg:hidden block absolute right-5">
        <MobileMenu />
      </div>

      <div className="flex gap-4">
        <Link href={"/request-quote"} className="hidden lg:block">
          <button className="bg-[#EB5017] p-3 text-white">Request Quote</button>
        </Link>
        {/* <Link href={"/contact"} className="hidden lg:block">
          <button className="bg-[#EB5017] p-3 text-white">Contact us</button>
        </Link> */}
      </div>
    </nav>
  );
}

export default Navbar;
