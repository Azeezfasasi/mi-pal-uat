import { GetStaticPaths, GetStaticProps } from "next";
import { Industry, industryPageData } from "@/constants/data";
import Hero from "@/components/Hero";
import SubSection from "@/components/SubSection";

interface IndustryPageProps {
  industry: Industry;
}

const IndustryPage = ({ industry }: IndustryPageProps) => {
  const {
    heroBg,
    heroHeading,
    heroSubheading,
    subSectionSubheading,
    subSectionheading,
    sideImage,
    subImage,
  } = industry;
  return (
    <div>
      <Hero
        heading={heroHeading}
        subHeading={heroSubheading}
        heroBg={heroBg}
        sideImage={sideImage}
      />
      <SubSection
        subSectionheading={subSectionheading}
        subSectionSubheading={subSectionSubheading}
        subSectionImage={subImage}
      />
    </div>
  );
};

export default IndustryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = industryPageData.map((industry) => ({
    params: { slug: industry.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const industry = industryPageData.find((ind) => ind.slug === params?.slug);
  return { props: { industry } };
};
