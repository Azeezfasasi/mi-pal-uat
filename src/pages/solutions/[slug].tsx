import { GetStaticPaths, GetStaticProps } from "next";
import { Solutions, solutionsPageData } from "@/constants/data";
import Hero from "@/components/Hero";
import Image from "next/image";
import { Fragment } from "react";

interface SolutionsPageProps {
  solution: Solutions;
}

const SolutionsPage = ({ solution }: SolutionsPageProps) => {
  const {
    heroBg,
    heroHeading,
    heroSubheading,
    subSectionSubheading,
    subSectionheading,
    sideImage,
    services,
  } = solution;
  return (
    <Fragment>
      <Hero
        heading={heroHeading}
        subHeading={heroSubheading}
        heroBg={heroBg}
        sideImage={sideImage}
      />
      <section className="px-10 py-10 lg:px-20">
        <h3 className="mb-4 text-2xl font-semibold text-[#111928] lg:text-5xl">
          {subSectionheading}
        </h3>
        <p className="font-inter text-base text-[#374151] lg:text-lg">
          {subSectionSubheading}
        </p>
        <div className="mt-5 grid grid-cols-responsive250 gap-5">
          {services.map((service, index) => (
            <article
              key={index}
              className="rounded-xl bg-[#FEECDC] p-5 font-inter"
            >
              <div className="relative mb-4  h-[200px] overflow-hidden rounded-xl">
                <Image src={service.img} alt="" fill className="object-cover" />
              </div>
              <div className="space-y-5">
                <p className="text-2xl font-bold text-[#EB5017]">
                  {service.title}
                </p>
                <p className="text-sm">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default SolutionsPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = solutionsPageData.map((solution) => ({
    params: { slug: solution.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const solution = solutionsPageData.find((solu) => solu.slug === params?.slug);
  return { props: { solution } };
};
