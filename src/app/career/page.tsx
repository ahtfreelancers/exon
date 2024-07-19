"use client";

import Navbar from "@/components/core/Navbar";
import Image from "next/image";

const benefits = [
  { id: 1, title: "Work on global projects" },
  { id: 2, title: "Progressive work culture" },
  { id: 3, title: "Freedom to pitch your ideas" },
  { id: 4, title: "Festival celebration" },
  { id: 5, title: "No dress code" },
  { id: 6, title: "Take advice from our experts" },
];

const recruitmentSteps = [
  { id: 1, title: "Initial Interview", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  { id: 2, title: "Technical Round", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  { id: 3, title: "Final HR discussion", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
];

export default function Career() {
  return (
    <main className="relative bg-white">
      <Navbar />
      <section className="px-[254px] py-[150px]" data-aos="fade-up">
        <h2 className="mb-[134px] border-l-[10px] border-[#12A89D] pl-[10px]">
          Why join us
        </h2>
        <div className="grid grid-cols-2 gap-[40px]">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex gap-[27px] font-bold text-[32px]">
              <Image
                src="/icons/tick.png"
                alt="tick"
                height={50}
                width={50}
              />
              <h3>{benefit.title}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="px-[254px] py-[100px] bg-primary">
        <h2 className="mb-[134px] border-l-[10px] border-[#12A89D] text-white pl-[10px]">
          Recruitment process
        </h2>
        <div className="grid grid-cols-3 gap-5">
          {recruitmentSteps.map((step) => (
            <div
              key={step.id}
              className="hover-container flex flex-col text-white text-center border-[#666666] border py-[100px] px-[85px] rounded-[60px] hover:border-[#FFFFFF66] hover:border-opacity-40 transition-colors duration-300 ease-in-out"
            >
              <h3 className="text-3xl mb-3 transition-colors duration-300 ease-in-out">{step.title}</h3>
              <p className="text-[#939393] text-[17px] font-helvetica text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
