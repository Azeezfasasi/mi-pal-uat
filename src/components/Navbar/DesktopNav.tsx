import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ListItem } from "./ListItem";
import {
  industrySubnav,
  servicesSubnav,
  solutionsSubnav,
  technologySubnav,
} from "./data";

function DesktopNavbar() {
  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList className="rounded-full border border-[#EB5017] px-7 py-2 text-black">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] grid-cols-1 gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {servicesSubnav.map((services) => (
                <ListItem
                  key={services.title}
                  title={services.title}
                  href={services.href}
                  icon={services.icon}
                >
                  {services.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Technology</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] grid-cols-1 gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {technologySubnav.map((technology) => (
                <ListItem
                  key={technology.title}
                  title={technology.title}
                  href={technology.href}
                  icon={technology.icon}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Industry</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] grid-cols-1 gap-1 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {industrySubnav.map((industry) => (
                <ListItem
                  key={industry.title}
                  title={industry.title}
                  href={industry.href}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] grid-cols-1 gap-1 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {solutionsSubnav.map((solution) => (
                <ListItem
                  key={solution.title}
                  icon={solution.icon}
                  title={solution.title}
                  href={solution.href}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/training" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Training
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about-us" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default DesktopNavbar;
