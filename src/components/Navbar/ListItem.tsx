import { forwardRef } from "react";
import { NavigationMenuLink } from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  href: string;
  icon?: React.ReactNode; // Add the icon prop here
}
export const ListItem = forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, icon, href, ...props }, ref) => {
    let Icon = icon;
    return (
      <li>
        <Link href={href} legacyBehavior passHref>
          <NavigationMenuLink
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
          >
            <div className="flex items-center space-x-2">
              {Icon && Icon}
              <div className="text-sm font-medium leading-none">{title}</div>
            </div>

            <p className="line-clamp-2 text-sm leading-snug text-[#1C64F2]">
              {children}
            </p>
          </NavigationMenuLink>
        </Link>
      </li>
    );
  },
);

ListItem.displayName = "ListItem";
