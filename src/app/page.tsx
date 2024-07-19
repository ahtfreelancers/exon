"use client"
import Footer from "@/components/core/Footer";
import Navbar from "@/components/core/Navbar";
import Slider from "@/components/core/Slider";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative sm:bg-background p-[6px] sm:p-5">
      <Navbar />
      <section className="bg-mobHeroBg sm:bg-heroBg hero-banner">
        <div className="hero-heading">
          <h1 className="text-white mb-6">Challenging limitations</h1>
          <h5 className="mb-[68px]">One device at a time</h5>
        </div>
        <button className="hidden sm:inline">Know More</button>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-[30px] sm:rounded-[72px] items-center justify-center sm:px-[150px] bg-white px-12 py-[100px]">
        <div className="relative h-[440px] sm:h-[700px]">
          <Image
            src="/home/about.svg"
            alt="Featured Product"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div>
          <h2 className="mb-4 sm:border-l-[10px] sm:border-[#12A89D] pl-[10px]">
            About Exon
          </h2>
          <p className="font-helvetica text-textSecondary">
            Exon Therapeutics LLP is committed to innovate the heart health technology at the forefront. We have created an ecosystem for invention and growth, all under one umbrella. In today’s times where
            health is always at an edge, it is necessary to prioritize the production of high-quality medical devices that are both accessible and affordable. Our topmost indulgence lies in making cutting
            edge cardiovascular devices that improve the quality of your life. We also provide flexible implantable cardiac devices and drug-eluting stents with longevity. We also assert to be your one-stop
            solution for semi-compliant balloon catheter and non-compliant balloon catheter for pre-dilation and post-dilations in cardiac procedures. Exon Therapeutics LLP builds healthcare for eons.
          </p>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 justify-center px-5 md:px-[100px] bg-white py-[100px]">
        <div className="relative h-[800px]">
          <Image
            src="/home/vision.png"
            alt="Featured Product"
            layout="fill"
            objectFit="contain"
          />
          <h2 className="absolute text-white left-[40%] top-[80px] mb-[155px]">Vision</h2>
          <p className="absolute text-2xl max-w-[540px] left-[17%] text-center top-[250px] text-[#D7F9F778] font-normal">We promise to serve in the healthcare industry as a hub for innovation of high tech medical devices, transform the cardiovascular healthcare technology through creative, groundbreaking solutions and create dynamic technologies tailored to the versatile needs of the providers and patients worldwide.</p>
        </div>
        <div className="relative h-[800px]">
          <Image
            src="/home/mission.png"
            alt="Featured Product"
            layout="fill"
            objectFit="contain"
          />
          <h2 className="absolute text-white left-[40%] top-[80px] mb-[155px]">Mission</h2>
          <p className="absolute text-2xl max-w-[440px] left-[22%] text-center top-[250px] text-[#D7F9F778] font-normal">Our tireless services will cater to innovate life-saving cardiovascular medical devices that are accessible and affordable to physicians and patients.</p>
        </div>
      </section>
      <section className="bg-white">
        <Slider />
      </section>
      <section className="py-[124px] bg-white">
        <h2 className="text-center mb-[68px]">Contact Us</h2>
        <div className="max-w-[1180px] px-[165px] py-12 bg-primary mx-auto rounded-[95px]">

        </div>
      </section>
    </main>
  );
}
