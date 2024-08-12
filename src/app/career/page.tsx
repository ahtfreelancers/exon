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
  { id: 1, title: "Initial Interview", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", icon: "/icons/interview.png" },
  { id: 2, title: "Technical Round", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", icon: "/icons/technical.png" },
  { id: 3, title: "Final HR discussion", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", icon: "/icons/hr.png" },
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
  return (
    <main className="relative bg-white">
      <Navbar />
      <section className="px-16 mb-10">
        <div className="py-5 md:py-16 3xl:py-[94px] bg-primary rounded-[10px] md:rounded-[52px] mt-[32px] flex justify-center">
          <h2 className="text-white text-7xl">Carrer</h2>
        </div>
      </section>
      <section className="bg-[#ebf8f7] py-20">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-center mb-8">Unlock new career opportunities at Exon</h2>
          <p className="text-lg text-center">Pagedone embraces a youthful and flexible spirit, enabling us to swiftly adapt to market research, conditions, and customer demands through our advanced technology.</p>
        </div>
      </section>
      <section className="px-[254px] py-[150px]">
        <h2 className="mb-[134px] border-l-[10px] border-[#12A89D] pl-[10px]" data-aos="fade-right">
          Why join us
        </h2>
        <div className="grid grid-cols-2 gap-[40px]" data-aos="fade-up">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex gap-[27px] font-bold text-[32px]">
              <Image
                src="/icons/tick.png"
                alt="tick"
                height={50}
                width={50}
                className="size-12"
              />
              <h3>{benefit.title}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className=" py-[100px] bg-primary">
        <div className="max-w-[1250px] mx-auto">
          <h2 className="mb-32 border-l-[10px] border-[#12A89D] text-white pl-[10px]" data-aos="fade-right">
            Recruitment process
          </h2>
          <div className="grid grid-cols-3 gap-5" data-aos="fade-up">
            {recruitmentSteps.map((step) => (
              <div
                key={step.id}
                className="hover-container bg-[#223848] flex flex-col text-white text-center border-[#666666] border py-[100px] px-5 md:px-7 spbp:px-14 3xl:px-[85px] rounded-[60px] hover:border-[#FFFFFF66] hover:border-opacity-40 transition-colors duration-300 ease-in-out"
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
            ))}
          </div>
        </div>
      </section>
      <section className="px-32 3xl:px-64 py-[100px] bg-white">
        <h2 className="mb-32 border-l-[10px] border-[#12A89D] pl-[10px]" data-aos="fade-right">
          Open positions
        </h2>
        <div className="grid grid-cols-2 gap-5" data-aos="fade-up">
          {positions.map((step) => (
            <div className="bg-[#f3f4f5] p-12 rounded-[34px] flex justify-between items-center">
              <div>
                <h3>{step.title}</h3>
                <p className="text-[#4B4B4B] text-xl font-medium">{step.description}</p>
              </div>
              <div>
                <button className="px-14 py-3 hover:bg-transparent hover:text-[#12A89D] hover:border hover:border-[#12A89D] transition-colors duration-300 ease-in-out">Apply Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main >
  );
}
