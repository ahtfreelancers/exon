"use client";

import ContactUs from "@/components/core/ContactUs";
import Navbar from "@/components/core/Navbar";
import ProductSlider from "@/components/core/ProductSlider";
import { useScreens } from "@/hooks/useScreens";
import { Hexagon, Star, Triangle } from "lucide-react";
import Image from "next/image";

export default function Product() {
  const { md }: any = useScreens()

  return (
    <main className="relative">
      <div className="sm:bg-background p-1 md:p-[6px]">
        <Navbar />
        <div className="relative h-[528px] sm:h-[700px] xl:h-[760px] 3xl:h-[946px] mt-3 md:mt-10">
          {md ? (
            <Image
              src="/about/hero.png"
              priority
              fill
              alt="Picture of the author"
            />
          ) : (
            <Image
              src="/about/mobproduct.png"
              priority
              fill
              alt="Picture of the author"
            />
          )}
          <div className="absolute top-20 left-2/4 -translate-x-2/4 md:w-full">
            <div className="hero-heading">
              <h1 className="text-white mb-6 text-center">Our Top Products</h1>
              <h5 className="mb-8 2xl:mb-[68px]">Dive into our range products</h5>
            </div>
            <div className="flex justify-center">
              <button data-aos="fade-up">Explore</button>
            </div>
          </div>
        </div>
        {/* <section className="bg-mobHeroBg sm:bg-heroBg hero-banner">
          
        </section> */}
      </div>
      <section className="py-[122px] flex flex-col bg-white items-center justify-center">
        <h2 className="mb-[100px]" data-aos="fade-up">Precision. Reliability. Excellence.</h2>
        <div className="relative mb-[178px] w-[90%]">
          <hr className="border-t border-gray-300 w-full absolute top-1/2 transform -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-15deg]">
            <span className="bg-white px-4 py-2 text-lg font-semibold border border-gray-300 rounded-full">Products</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[80px] px-12 spbp:max-w-[1200px] 3xl:max-w-[1440px]">
          <div className="flex flex-col" data-aos="fade-up">
            <Star className="mb-3" />
            <h3 className="text-[28px] font-semibold mb-2">Feature</h3>
            <p className="text-[#6D6D6D] text-lg text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien.</p>
          </div>
          <div className="flex flex-col" data-aos="fade-up">
            <Triangle className="mb-3" />
            <h3 className="text-[28px] font-semibold mb-2">Feature</h3>
            <p className="text-[#6D6D6D] text-lg text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien.</p>
          </div>
          <div className="flex flex-col" data-aos="fade-up">
            <Hexagon className="mb-3" />
            <h3 className="text-[28px] font-semibold mb-2">Feature</h3>
            <p className="text-[#6D6D6D] text-lg text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien.</p>
          </div>
        </div>
      </section>
      <section className="md:px-5">
        <ProductSlider />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-20 px-8 md:px-[100px] bg-white py-[100px]">
        <div className="relative h-[300px] md:h-[680px]" data-aos="fade-right">
          <Image
            src="/about/featured.png"
            alt="Featured Product"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="" data-aos="fade-left">
          <h2 className="mb-4 borderText">
            Featured Product
          </h2>
          <p className="text-base text-left md:text-2xl font-helvetica text-textSecondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien. Vestibulum malesuada orci sit amet pretium facilisis. In lobortis congue augue, a commodo libero tincidunt scelerisque.
          </p>
        </div>
      </section>
      <section className="md:px-5">
        <ProductSlider />
      </section>
      <ContactUs />
    </main>
  );
}
