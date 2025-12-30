import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import {
  industrySubnav,
  servicesSubnav,
  solutionsSubnav,
  technologySubnav,
} from "./data";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export function MobileMenu() {
  const [menuIsOpen, toggleMenuIsOpen] = useState(false);
  const router = useRouter();

  // const handleAnchorClick = (
  //   e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  //   href: string,
  // ) => {
  //   if (href.startsWith("#")) {
  //     e.preventDefault();
  //     const targetId = href.slice(1);
  //     const element = document.getElementById(targetId);

  //     if (element) {
  //       element.scrollIntoView({ behavior: "smooth" });
  //     }
  //     console.log({ targetId, element });

  //     router.push(href, undefined, { scroll: false });
  //   }
  // };

  useEffect(() => {
    toggleMenuIsOpen(false);
  }, [router]);

  return (
    <DropdownMenu onOpenChange={toggleMenuIsOpen} open={menuIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="text-violet11  hover:bg-violet3 inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#EB5017] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          aria-label="Customise options"
        >
          <RxHamburgerMenu color="white" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>Mi-Pal</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Services</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent sideOffset={-60}>
                {servicesSubnav.map((service) => (
                  <DropdownMenuItem key={service.title} asChild>
                    <Link href={service.href}>{service.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Technology</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {technologySubnav.map((technology) => (
                  <DropdownMenuItem key={technology.title}>
                    <Link href={technology.href} className="w-full">
                      {technology.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Industry</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent sideOffset={-40}>
                {industrySubnav.map((industry) => (
                  <DropdownMenuItem key={industry.title}>
                    <Link
                      className="w-full text-sm"
                      href={industry.href}
                      legacyBehavior
                    >
                      {industry.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Solutions</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="">
                {solutionsSubnav.map((solution) => (
                  <DropdownMenuItem key={solution.title}>
                    <Link className="w-full" href={solution.href}>
                      {solution.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Link className="w-full" href={"/training"}>
              <button className="text-black">Training</button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="w-full" href={"/about-us"}>
              <button className="text-black">About us</button>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex flex-col gap-4">
            <Link className="w-full" href={"/request-quote"}>
              <button className="bg-[#EB5017] p-3 text-white">Request Quote</button>
            </Link>
            <Link className="w-full" href={"/contact"}>
              <button className="bg-[#EB5017] p-3 text-white">Contact us</button>
            </Link>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
