import Image from "next/image";
import heroSide from "../../public/assets/homeHeroSide.png";
import frame58 from "../../public/assets/Frame-58.png";
import customSoftware from "../../public/assets/customSoftware.png";
import mvpImage from "../../public/assets/mvpImage.png";
import business from "../../public/assets/business.png";
import cyber from "../../public/assets/cyber.png";
import cloud from "../../public/assets/cloud.png";
import digitalTransform from "../../public/assets/digital-transform.png";
import appMaintain from "../../public/assets/app-maintain.jpg";
import projectManage from "../../public/assets/project-manage.jpg";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Fragment } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <Fragment>
      {/* Hero Section */}
      <section className="isolate flex justify-between items-center gap-9 bg-[#F5F5F5] px-6 py-16 sm:px-10 md:px-12 lg:flex-wrap">
        <div className="flex flex-1 flex-col gap-5 mx-auto">
          <p className="flex w-fit justify-center items-center gap-2 rounded-full px-4 py-2 font-sora font-normal border border-[#05F247] mx-auto lg:mx-0">
            <span className="overflow-hidden rounded-full bg-[#61F79499] p-1">
              <span className="block h-3 w-3 rounded-full bg-[#05F247]"></span>
            </span>
            <span className="text-center"> Available for Projects</span>
          </p>
          <h1 className="font-sora text-4xl font-semibold sm:text-xl md:text-3xl lg:text-7xl">
            We Build Digital Products for Businesses
          </h1>
          <p className="font-inter text-lg sm:text-sm md:text-base">
            Empowering businesses with digital solutions that drive growth. From
            mobile apps to websites and software, we lay the groundwork for
            predictable expansion.
          </p>
          <div className="w-full flex flex-col md:flex-row items-center gap-6">
            <button className="flex w-fit justify-center items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
              <Link href="/contact">Get started now</Link>{" "}
              <IoIosArrowRoundForward size={24} />
            </button>
            <button className="flex w-fit justify-center items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
              <Link href="/request-quote">Request a Quote</Link>{" "}
              <IoIosArrowRoundForward size={24} />
            </button>
          </div>
        </div>
        <div className="flex-1 hidden lg:flex">
          <Image
            className=" object-contain"
            src={heroSide}
            alt=""
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </section>

      {/* We Develop and Build the Digital Future */}
      <section className="bg-[#F4FAFF] py-10">
        <div className="flex flex-col lg:flex-row flex-1 gap-5 px-10 pb-9 md:px-20">
          <p className="font-sora text-3xl font-semibold sm:text-xl md:text-5xl">
            We Develop and Build the Digital Future
          </p>
          <div className="space-y-4">
            <p className="font-inter text-lg sm:text-sm md:text-base">
              Developing bespoke software solutions to address specific business
              challenges or enhance operations.
            </p>
            <button className="flex w-fit items-center gap-2 bg-[#EB5017] p-3 font-inter font-semibold text-white">
              <Link href="/contact">Get started now</Link>{" "}
              <IoIosArrowRoundForward size={24} />
            </button>
          </div>
        </div>
        <Image
          src={frame58}
          alt=""
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </section>

      {/* Team Background */}
      <section className="relative isolate bg-[url('/assets/teambg.jpg')] bg-cover bg-no-repeat px-5 lg:px-24 py-10 pb-9">
        <div className="absolute inset-0 -z-[1] bg-black opacity-40"></div>
        <p className="font-sora text-[48px] font-bold text-white lg:text-9xl">
          We Boast of our Skilled Tech-Savy Team
        </p>
      </section>

      {/* customSoftware */}
      <section
        id="custom-software"
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-10 lg:px-24 py-7 pb-9"
      >
        <Image
          src={customSoftware}
          alt=""
          className="flex-1 object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="flex-1 space-y-5">
          <p className="font-sora text-4xl font-semibold text-[#EB5017]">
            Custom Software Development
          </p>
          <p className="font-inter text-lg">
            At Mi-Pal Technologies, we are honored to be acknowledged as
            Nigeria&apos;s premier mobile app development company. Our
            commitment lies in nurturing enduring partnerships, delivering
            unparalleled bespoke solutions including custom iOS, Android, web
            applications, cross-platform, as well as AR & VR apps tailored
            specifically for businesses.
          </p>
          <button className="border border-[#eb5017] p-2">
            <Link href={"/contact"}>
              <IoIosArrowRoundForward size={24} color="#EB5017" />
            </Link>
          </button>
        </div>
      </section>

      {/* MVP Startup Development */}
      <section id="mvp-development" className="bg-[#EB5017] pt-10">
        <div className="mb-5 space-y-5 px-10 text-left lg:text-center text-white lg:px-20">
          <p className="font-sora text-3xl md:text-5xl font-semibold">
            MVP Startup Development
          </p>
          <p className="font-inter text-lg sm:text-sm md:text-base">
            Get ahead of the competition by teaming up with our top MVP
            development team. From brilliant concepts to flawless
            implementation, our developers exceed expectations to deliver
            exceptional MVP app development services. Reach out to us now to
            craft a cutting-edge MVP product that truly connects with your
            target audience.
          </p>
          <button className="bg-white p-2">
            <Link href={"/contact"}>
              <IoIosArrowRoundForward size={24} color="#EB5017" />
            </Link>
          </button>
        </div>
        <Image
          src={mvpImage}
          alt=""
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </section>

      {/* Business Analysis */}
      <section className="flex flex-col lg:flex-row gap-6 px-10 py-8 lg:px-20 lg:flex-wrap">
        <div className="flex flex-col flex-1 space-y-4">
          <p className="font-sora text-5xl font-semibold text-[#EB5017] lg:text-7xl">
            Business Analysis
          </p>
          <p className="font-inter text-lg text-[#111928] sm:text-sm md:text-base">
            Business analysis involves identifying targeted solutions for
            specific challenges, driving the direction and success of an
            organization by uncovering opportunities. With our experienced team
            of certified business analysts, we offer expert guidance on business
            analysis, assisting industries in managing solution requirements and
            implementing beneficial changes. Our goal is to help clients reduce
            operational costs, increase ROI, and minimize project expenses.
            Utilizing top-notch business analysis practices for software
            development, we facilitate effective communication between business
            needs and IT departments, covering areas such as system analysis,
            solution vision, requirements description, precise project
            estimation, and release planning.
          </p>
          <button className="border border-[#eb5017] p-2 w-fit">
            <Link href={"/contact"}>
              <IoIosArrowRoundForward size={24} color="#EB5017" />
            </Link>
          </button>
        </div>
        <div className="flex-1 self-center">
          <Image src={business} alt="" className="object-contain sw-full " />
        </div>
      </section>

      {/* Cloud & Hosting */}
      <section
        id="cloud-hosting"
        className="flex flex-col lg:flex-row gap-10 bg-[#111928] px-10 lg:flex-wrap lg:px-20"
      >
        <div className="flex-1 self-center">
          <Image src={cloud} alt="" className="object-contain lg:w-full" />
        </div>
        <div className="flex-1 space-y-4 self-center lg:mb-5">
          <p className="font-sora text-7xl font-semibold  text-[#C3DDFD] sm:text-xl md:text-3xl lg:text-5xl">
            Cloud & Hosting
          </p>
          <p className="font-inter text-lg text-white sm:text-sm md:text-base">
            At its core, cloud computing entails utilizing a network of remote
            servers hosted online for storing, managing, and processing data.
            This expansive concept encompasses a myriad of services, all
            categorized under three primary types of cloud hosting providers.
            These providers play a pivotal role in delivering the efficiency and
            flexibility essential for modern business operations
          </p>
          <button className="bg-white p-2">
            <Link href={"/contact"}>
              <IoIosArrowRoundForward size={24} color="#EB5017" />
            </Link>
          </button>
        </div>
      </section>

      {/* Cyber Security */}
      <section
        id="cyber-security"
        className="bg-[linear-gradient(to_right_bottom,#EB5017,rgba(173, 176, 175, 0.8)),url('/assets/maskgroup.png')] flex flex-col lg:flex-row gap-6 bg-cover bg-center px-10 py-8 lg:px-20"
      >
        <div className="flex-1">
          <p className="mb-3 font-sora text-4xl font-semibold  text-[#EB5017] lg:text-7xl">
            Cyber Security
          </p>
          <Image src={cyber} alt="" className="object-contain" />
        </div>
        <div className="flex-1 space-y-4">
          <p className="font-inter text-base text-[#111928] lg:text-lg text-justify">
            Mi-Pal Technologies offers comprehensive SECURITY AND BACKUPS
            solutions aimed at Mitigating the Impact of Unplanned Downtime.
            Understanding the fundamentals of backup and disaster recovery is
            vital to mitigate the repercussions of unforeseen downtime for your
            business. Across various sectors, companies acknowledge that
            downtime can swiftly translate into lost revenue. Unfortunately,
            natural calamities, human errors, security breaches, and ransomware
            attacks all pose threats to the availability of IT resources. Even
            brief periods of downtime can disrupt customer interactions, erode
            trust, diminish employee productivity, compromise data integrity,
            and halt business operations. Mi-Pal Technologies delivers a data
            backup service that empowers clients to safeguard any environment—be
            it virtual, physical, or cloud-based—with no upfront costs and a
            straightforward pay-as-you-go model engineered to accelerate return
            on investment.
          </p>
          <button className="border border-[#eb5017] p-2">
            <Link href={"/contact"}>
              <IoIosArrowRoundForward size={24} color="#EB5017" />
            </Link>
          </button>
        </div>
      </section>


      {/*Project Management*/}
      <section
        id="project-management"
        className="bg-[#111928] px-10 py-8 lg:px-20"
      >
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 self-center">
            <Image src={projectManage} alt="" className="object-contain" />
          </div>
          <div className="flex-1 space-y-4 self-center">
            <p className="font-sora text-4xl font-semibold text-white lg:text-7xl">
              Project Management
            </p>
            <p className="font-inter text-base text-white lg:text-lg">
              We align our project management services with agile methodologies
              to ensure efficient and adaptive software development processes.
              Here&apos;s how our service integrates with agile principles
            </p>
            <button className="bg-white p-2">
              <Link href={"/contact"}>
                <IoIosArrowRoundForward size={24} color="#EB5017" />
              </Link>
            </button>
          </div>
        </div>

        <div className="mt-7">
          <p className="mb-5 font-sora text-2xl font-semibold text-[#C3DDFD] lg:text-5xl">
            Here&apos;s how our service integrates with agile principles:
          </p>
          <div className="my-4 grid grid-cols-responsive250 gap-6">
            <article className="bg-[#E1EFFE] p-5 font-inter">
              <p className="mb-2 font-semibold text-[#252432]">
                Iterative Planning
              </p>
              <p className="text-sm">
                We embrace agile principles by facilitating iterative planning
                sessions with clients and stakeholders to define project
                objectives, scope, and requirements. We prioritize features and
                functionalities based on customer feedback and evolving business
                needs.
              </p>
            </article>
            <article className="bg-[#E1EFFE] p-5 font-inter">
              <p className="mb-2 font-semibold text-[#252432]">
                Cross-Functional Teams
              </p>
              <p className="text-sm">
                Our project managers assemble cross-functional teams of
                developers, designers, testers, and other stakeholders to
                promote collaboration and accountability. We empower
                self-organizing teams to make decisions and adapt to changing
                requirements throughout the project lifecycle.
              </p>
            </article>
            <article className="bg-[#E1EFFE] p-5 font-inter">
              <p className="mb-2 font-semibold text-[#252432]">
                Continuous Delivery
              </p>
              <p className="text-sm">
                We emphasize continuous delivery and incremental development,
                delivering working software in short iterations or sprints. Our
                project managers oversee the sprint planning, backlog grooming,
                and sprint review ceremonies to ensure that deliverables meet
                quality standards and user expectations.
              </p>
            </article>
            <article className="bg-[#E1EFFE] p-5 font-inter">
              <p className="mb-2 font-semibold text-[#252432]">
                Adaptive Planning
              </p>
              <p className="text-sm">
                We embrace adaptive planning practices, allowing for flexibility
                and responsiveness to changing priorities and customer feedback.
                Our project managers regularly assess progress, adjust
                priorities, and refine the project plan to optimize outcomes and
                deliver maximum value to the client.
              </p>
            </article>

            <article className="bg-[#E1EFFE] p-5 font-inter">
              <p className="mb-2 font-semibold text-[#252432]">
                Transparent Communication
              </p>
              <p className="text-sm">
                We foster transparent communication and collaboration among team
                members, stakeholders, and clients. We conduct daily stand-up
                meetings, sprint retrospectives, and regular demos to facilitate
                open dialogue, share progress updates, and address any issues or
                concerns promptly.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* App Maintainance */}
      <section id="app-maintenance" className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4 px-10 py-8 lg:px-20">
          <p className="font-sora text-4xl font-semibold text-[#EB5017] lg:text-7xl">
            App Maintenance
          </p>
          <p className="font-inter text-base text-[#111928] lg:text-lg text-justify">
            Explore top-tier mobile app maintenance and support services with
            M-Pal Technologies. Our team of skilled developers and quality
            assurance experts is dedicated to optimizing the performance of your
            mobile, web, and SaaS applications. Partner with us to guarantee a
            seamless user experience and elevate your app&apos;s performance to
            new heights.
          </p>

          <ul className="space-y-2 text-white">
            <li className="rounded-sm bg-[#1A56DB] p-2">
              {`\u29BF  Comprehensive application maintenance services`}
            </li>
            <li className="rounded-sm bg-[#6B7280] p-2">
              {`\u29BF  Multi-tiered app support services`}
            </li>
            <li className="rounded-sm bg-[#EB5017] p-2">
              {`\u29BF Full-cycle mobile app support and maintenance services`}
            </li>
            <li className="rounded-sm bg-[#1A56DB] p-2">
              {`\u29BF Security and vulnerability patching`}
            </li>
            <li className="rounded-sm bg-[#6B7280] p-2">
              {`\u29BF  Cloud and server infrastructure management`}
            </li>
            <li className="rounded-sm bg-[#EB5017] p-2">
              {`\u29BF  User analytics and A/B testing`}
            </li>
          </ul>
          <button className="border border-[#eb5017] p-2">
            <Link href={"/contact"}>
              <IoIosArrowRoundForward size={24} color="#EB5017" />
            </Link>
          </button>
        </div>
        <div className="flex-1">
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={appMaintain}
            alt=""
            className="object-contain lg:w-full"
          />
        </div>
      </section>

      {/* Digital Transformation */}
      <section
        id="digital-transform"
        className="flex flex-col lg:flex-row gap-10 bg-[#111928] px-14 lg:py-5"
      >
        <div className="flex w-[100%] lg:w-[60%] mx-auto">
            <Image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={digitalTransform}
            alt=""
            className="object-contain w-full"
          />
        </div>
        <div className="flex-1 space-y-4 self-center pr-10 lg:mb-4 lg:flex-auto lg:pr-0">
          <p className="font-sora text-4xl font-semibold text-[#C3DDFD] lg:text-7xl">
            Digital Transformation
          </p>
          <p className="font-inter text-base text-white lg:text-lg text-justify">
            Mi-Pal Technologies offers a tailored solution for businesses
            seeking to embark on their digital transformation journey or fully
            digitize their operations
          </p>
          <button className="bg-white p-2">
            <Link href={"/contact"}>
              <IoIosArrowRoundForward size={24} color="#EB5017" />
            </Link>
          </button>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-[#C3DDFD] px-10 py-8 lg:px-20">
        <div className="mt-7">
          <p className="mb-5 font-sora text-2xl font-semibold text-black lg:text-5xl">
            Our comprehensive approach encompasses the following key elements:
          </p>
          <div className="my-4 grid grid-cols-responsive250 gap-6">
            <article className="bg-[#E1EFFE] p-5 font-inter">
              <p className="mb-2 font-semibold text-[#252432]">
                Digital Strategy Development
              </p>
              <p className="text-sm">
                We work closely with businesses to understand their goals and
                objectives, assess their current processes, and formulate a
                clear digital strategy aligned with their vision.
              </p>
            </article>
            <article className="bg-[#E1EFFE] p-5 font-inter">
              <p className="mb-2 font-semibold text-[#252432]">
                Process digitization
              </p>
              <p className="text-sm">
                Leveraging our expertise in digital technologies, we help
                businesses digitize their manual or paper-based processes by
                implementing efficient digital tools and software solutions.
                This includes automating tasks, streamlining workflows, and
                optimizing operational efficiency.
              </p>
            </article>
            <article className="bg-[#E1EFFE] p-5 font-inter">
              <p className="mb-2 font-semibold text-[#252432]">
                Intergration of Digital Technologies
              </p>
              <p className="text-sm">
                We assist businesses in identifying and integrating relevant
                digital technologies such as cloud computing, data analytics,
                AI, IoT, and ERP systems to enhance their operations, drive
                innovation, and stay ahead of the competition. Work closely with
                businesses to understand their goals and objectives, assess
                their current processes, and formulate a clear digital strategy
                aligned with their vision.
              </p>
            </article>
            <article className="bg-[#E1EFFE] p-5 font-inter">
              <p className="mb-2 font-semibold text-[#252432]">
                Customer experience enhancement
              </p>
              <p className="text-sm">
                Data-driven decision-making: With our data analytics and
                business intelligence solutions, we enable businesses to gather
                valuable insights from their data, identify trends, anticipate
                customer needs, and make informed strategic decisions.
              </p>
            </article>

            <article className="bg-[#E1EFFE] p-5 font-inter">
              <p className="mb-2 font-semibold text-[#252432]">
                Employee training and change management
              </p>
              <p className="text-sm">
                We assist businesses in identifying and integrating relevant
                digital technologies such as cloud computing, data analytics,
                AI, IoT, and ERP systems to enhance their operations, drive
                innovation, and stay ahead of the competition. Work closely with
                businesses to understand their goals and objectives, assess
                their current processes, and formulate a clear digital strategy
                aligned with their vision.
              </p>
            </article>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
