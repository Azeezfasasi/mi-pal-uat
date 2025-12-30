import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

export function OurworksDialog({
  trigger,
  content,
  title,
  description,
  projectLink,
}: {
  trigger: ReactNode;
  content: ReactNode;
  title: ReactNode;
  description: ReactNode;
  projectLink?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="gap-4 text-left">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
        {projectLink && (
          <DialogFooter>
            <div className="w-fit flex justify-center items-center mx-auto hover:scale-105 transition-transform hover:bg-red-50">
              <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 font-semibold border border-red-600 p-2 rounded-md"
              >
                Visit Project
              </a>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
