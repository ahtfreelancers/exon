"use client";

import Navbar from "@/components/core/Navbar";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';
import { A11y, Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import { useLayoutEffect, useRef, useState } from "react";
const benefits = [
  { id: 1, title: "Work on global projects" },
  { id: 2, title: "Progressive work culture" },
  { id: 3, title: "Freedom to pitch your ideas" },
  { id: 4, title: "Festival celebration" },
  { id: 5, title: "No dress code" },
  { id: 6, title: "Take advice from our experts" },
];

const recruitmentSteps = [
  {
    id: 1,
    title: "Resume Submission",
    description: "Submit your resume to hr@exontherapeutics.com. Our HR team will review your qualifications and experience to match you with the most suitable roles available at Exon Therapeutics.",
    icon: "/icons/technical.png"
  },
  {
    id: 2,
    title: "Interview Round",
    description: "Engage in a comprehensive interview round where we assess your technical and soft skills, ensuring alignment with our company's values and project requirements.",
    icon: "/icons/interview.png"
  },
  {
    id: 3,
    title: "Final HR Round",
    description: "In the final HR round, we discuss your role in detail, including compensation, benefits, and career growth opportunities at Exon Therapeutics.",
    icon: "/icons/hr.png"
  },
];

const positions = [
  { id: 1, title: "Specialist Surgeon", description: "3-5+ Year | Surat | Full Time" },
  { id: 2, title: "Specialist Surgeon", description: "3-5+ Year | Surat | Full Time" },
  { id: 3, title: "Specialist Surgeon", description: "3-5+ Year | Surat | Full Time" },
  { id: 4, title: "Specialist Surgeon", description: "3-5+ Year | Surat | Full Time" },
  { id: 5, title: "Specialist Surgeon", description: "3-5+ Year | Surat | Full Time" },
  { id: 6, title: "Specialist Surgeon", description: "3-5+ Year | Surat | Full Time" },
];

export default function Career() {
  const [maxHeight, setMaxHeight] = useState(0);
  const slideRefs = useRef<HTMLDivElement[]>([]);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      slideRefs.current[index] = el;
    }
  };

  useLayoutEffect(() => {
    const heights = slideRefs.current.map(slide => slide.offsetHeight);
    setMaxHeight(Math.max(...heights));
  }, [recruitmentSteps.length]);
  return (
    <main className="relative bg-white">
      <Navbar />
      <section className="px-2 md:px-16 mb-10">
        <div className="py-20 md:py-16 3xl:py-[94px] bg-primary rounded-[28px] md:rounded-[52px] mt-1 md:mt-8 flex justify-center">
          <h2 className="text-white text-3xl md:text-4xl spbp:text-7xl">Carrer</h2>
        </div>
      </section>
      <section className="bg-[#ebf8f7] py-20">
        <div className="max-w-[350px] lg:max-w-[668px] spbp:max-w-[768px] 3xl:max-w-[900px] mx-auto">
          <div className="relative">
            {/* <div className="absolute top-[5%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 rotate-[-15deg]">
              <span className="bg-[#ebf8f7] px-4 text-sm md:text-lg font-semibold text-[#059669] rounded-full">Careers at Exon</span>
            </div> */}
            <h2 className="text-center mb-8">Unlock new career opportunities at Exon</h2>
            {/* <div className="absolute bottom-[35%] right-[-20%] md:right-[-38%] lg:right-[-5%] transform -translate-x-1/2 -translate-y-1/2 rotate-[-15deg]">
              <span className="bg-[#ebf8f7] px-4 text-sm md:text-lg font-semibold text-[#059669] rounded-full">Careers at Exon</span>
            </div> */}
          </div>
          <p className="text-lg text-center">Pagedone embraces a youthful and flexible spirit, enabling us to swiftly adapt to market research, conditions, and customer demands through our advanced technology.</p>
        </div>
      </section>
      <section className="px-5 md:px-20 spbp:px-36 3xl:px-[254px] py-8 md:py-14 xl:py-24 2xl:py-36">
        <h2 className="mb-6 md:mb-[134px] borderText" data-aos="fade-right">
          Why join us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]" data-aos="fade-up">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex gap-5 md:gap-[27px] font-bold text-[32px]">
              <Image
                src="/icons/tick.png"
                alt="tick"
                height={50}
                width={50}
                className="size-7 md:size-12"
              />
              <h3 className="text-xl md:text-3xl">{benefit.title}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="py-[100px] bg-primary">
        <div className="px-5 spbp:px-0 spbp:max-w-[1250px] xl:max-w-[1400px] 3xl:max-w-[1400px] mx-auto">
          <h2 className="mb-6 md:mb-32 borderText text-white" data-aos="fade-right">
            Recruitment process
          </h2>
          <div data-aos="fade-up">
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={30}
                slidesPerView={3}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    centeredSlides: true
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  }
                }}
                onSlideChange={() => {
                  const heights = slideRefs.current.map(slide => slide.offsetHeight);
                  setMaxHeight(Math.max(...heights));
                }}
                onSwiper={() => {
                  const heights = slideRefs.current.map(slide => slide.offsetHeight);
                  setMaxHeight(Math.max(...heights));
                }}
                loop={true}
                autoplay={{
                  delay: 2000, // Adjust the delay as needed
                  disableOnInteraction: false, // Continue autoplay even when user interacts with the slider
                }}
              >
                {recruitmentSteps.map((step, index) => (
                  <SwiperSlide key={index}>
                    <div
                      ref={(el) => setRef(el, index)}
                      className="hover-container bg-[#223848] flex flex-col text-white text-center border-[#666666] border py-[100px] px-5 md:px-7 spbp:px-14 3xl:px-[65px] rounded-[60px] hover:border-[#FFFFFF66] hover:border-opacity-40 transition-colors duration-300 ease-in-out"
                      style={{ height: maxHeight ? `${maxHeight}px` : "auto" }}
                    >
                      <Image
                        src={step.icon}
                        alt="tick"
                        className="mx-auto"
                        height={90}
                        width={90}
                      />
                      <h3 className="text-3xl mb-3 transition-colors text-center mt-10 duration-300 ease-in-out">{step.title}</h3>
                      <p className="text-[#939393] text-[17px] font-helvetica text-center">
                        {step.description}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="px-5 md:px-32 3xl:px-64 py-8 md:py-14 xl:py-24 bg-white">
        <h2 className="mb-6 md:mb-32 borderText" data-aos="fade-right">
          Open positions
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5" data-aos="fade-up"> */}
      {/* {positions.map((step, index) => (
            <div className="bg-[#f3f4f5] p-6 md:p-12 rounded-[34px] flex justify-between items-center" key={index}>
              <div>
                <h3 className="text-xl">{step.title}</h3>
                <p className="text-[#4B4B4B] text-left text-sm md:text-xl font-medium">{step.description}</p>
              </div>
              <div>
                <button className="px-14 py-3 hover:bg-transparent hover:text-[#12A89D] hover:border hover:border-[#12A89D] transition-colors duration-300 ease-in-out">Apply Now</button>
              </div>
            </div>
          ))} */}
      {/* </div> */}
      {/* <div className=" py-8 w-full">
          <p className="text-center text-lg md:text-2xl text-[#4B4B4B]">We are coming soon with new open positions.</p>
        </div>
      </section> */}
    </main >
  );
}
