import React, { useEffect, useState } from "react";

// "types": "./dist/types/index.d.ts", was added in node_modules/@splidejs/react-splide/package.json
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

// import { Splide, SplideSlide } from "react-splide-ts";
// import "react-splide-ts/css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import { OurworksDialog } from "./OurworksDialog";

interface ProjectSlide {
  url: string;
  publicId: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  shortDescription?: string;
  projectLink?: string;
  category?: string;
  status: string;
  thumbnailImage?: {
    url: string;
    publicId: string;
  };
  logoImage?: {
    url: string;
    publicId: string;
  };
  slides: ProjectSlide[];
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    centerMode: true,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const OurWorks = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects?status=active&limit=100");
        const data = await response.json();
        if (data.success) {
          setProjects(data.data.projects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Fallback to empty projects if fetch fails
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="relative isolate bg-[url('/assets/worksbg.jpg')] bg-cover bg-center bg-no-repeat py-10">
        <div className="absolute inset-0 -z-[1] bg-black opacity-50"></div>
        <div className="flex items-center justify-center min-h-[600px]">
          <div className="text-white text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-400 border-t-white"></div>
            <p className="mt-4">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate bg-[url('/assets/worksbg.jpg')] bg-cover bg-center bg-no-repeat py-10">
      <div className="absolute inset-0 -z-[1] bg-black opacity-50"></div>
      <div className="mb-4 text-center text-white">
        <h3 className="font-sora text-2xl font-bold">Check our Work</h3>
        <p>
          Take a look at some of our recent projects to see how we&apos;ve
          helped businesses like yours succeed online.
        </p>
      </div>
      {projects.length === 0 ? (
        <div className="text-center text-white">
          <p>No projects available yet. Check back soon!</p>
        </div>
      ) : (
        <Carousel
          responsive={responsive}
          className="space-x-6 "
          swipeable={true}
          draggable={false}
          itemClass="space-y-3"
        >
          {projects.map((project) => (
            <OurworksDialog
              key={project._id}
              trigger={
                <div className="text-center">
                  <div className="sm relative h-[500px]">
                    {project.thumbnailImage?.url || project.slides[0]?.url ? (
                      <Image
                        src={project.thumbnailImage?.url || project.slides[0]?.url}
                        alt={project.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600">No image</span>
                      </div>
                    )}
                  </div>
                  <p className="font-sora text-2xl font-semibold text-white">
                    {project.title}
                  </p>
                </div>
              }
              title={
                project.logoImage?.url ? (
                  <Image
                    src={project.logoImage.url}
                    alt={project.title}
                    width={100}
                    height={50}
                    className="object-contain"
                  />
                ) : (
                  <p className="text-black text-xl font-bold">{project.title}</p>
                )
              }
              description={
                <p className="text-[#6B7280]">{project.description}</p>
              }
              projectLink={project.projectLink || ""}
              content={
                project.slides && project.slides.length > 0 ? (
                  <Splide
                    aria-label={`${project.title} Images`}
                    options={{
                      rewind: true,
                      width: 800,
                      height: 200,
                      gap: "1rem",
                    }}
                  >
                    {project.slides.map((slide, slideIndex) => (
                      <SplideSlide key={slideIndex}>
                        <div className="relative w-full h-[200px]">
                          <Image
                            src={slide.url}
                            alt={`${project.title} ${slideIndex + 1}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </SplideSlide>
                    ))}
                  </Splide>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No slides available
                  </div>
                )
              }
            />
          ))}
        </Carousel>
      )}
    </section>
  );
};

export default OurWorks;
