"use client";

import Navbar from "@/components/core/Navbar";
import ProductSlider from "@/components/core/ProductSlider";
import { Hexagon, Star, Triangle } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <main className="relative bg-white">
      <div className="relative bg-background p-5">
        <Navbar />
        <section className="flex items-center gap-[105px] justify-center">
          <div className="w-1/2 relative h-[940px]" data-aos="fade-right">
            <Image
              src="/about/productDetail.svg"
              alt="Featured Product"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="w-1/2 pr-32" data-aos="fade-left">
            <h3 className="text-3xl mb-4 font-helvetica font-bold">
              Product Name
            </h3>
            <p className="text-2xl font-helvetica text-textSecondary font-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien. Vestibulum malesuada orci sit amet pretium facilisis. In lobortis congue augue, a commodo libero tincidunt scelerisque.
            </p>
            &nbsp;
            &nbsp;
            &nbsp;
            <p className="text-2xl font-helvetica text-textSecondary font-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien. Vestibulum malesuada orci sit amet pretium facilisis. In lobortis congue augue, a commodo libero tincidunt scelerisque.
            </p>
          </div>
        </section>
      </div>
      <section className="py-[124px]">
        <h2 className="text-center mb-[68px]" data-aos="fade-up">Technical Specification</h2>
        <div className="max-w-[1024px] mb-[134px] mx-auto bg-background gap-x-[158px] gap-y-6 p-16 rounded-[66px] grid grid-cols-2 font-helvetica text-3xl font-medium text-[#5A5776]">
          <h5 data-aos="fade-left" className="text-[#5A5776] text-2xl">Delivery System</h5>
          <h5 data-aos="fade-left" className="text-[#5A5776] text-2xl">Over-The-Wire</h5>
          <h5 data-aos="fade-left" className="text-[#5A5776] text-2xl">Balloon Compliance</h5>
          <h5 data-aos="fade-left" className="text-[#5A5776] text-2xl">Semi-Compliant</h5>
          <h5 data-aos="fade-left" className="text-[#5A5776] text-2xl">No. of Folds</h5>
          <h5 data-aos="fade-left" className="text-[#5A5776] text-2xl">3 & 6</h5>
          <h5 data-aos="fade-left" className="text-[#5A5776] text-2xl">Balloon Material</h5>
          <h5 data-aos="fade-left" className="text-[#5A5776] text-2xl">Polyamide</h5>
          <h5 data-aos="fade-left" className="text-[#5A5776] text-2xl">Guidewire Compatibility</h5>
          <h5 data-aos="fade-left" className="text-[#5A5776] text-2xl">0.014″, 0.018″, 0.035″</h5>
        </div>
        <div className="max-w-[1024px] mx-auto pb-[100px]">
          <h2 className=" mb-[61px] border-l-[10px] border-[#12A89D] pl-[10px]" data-aos="fade-right">
            Product Description
          </h2>
          <p className="text-2xl font-helvetica text-textSecondary" data-aos="fade-right">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien. Vestibulum malesuada orci sit amet pretium facilisis. In lobortis congue augue, a commodo libero tincidunt scelerisque.
          </p>
          &nbsp;
          &nbsp;
          &nbsp;
          <p className="text-2xl mb-16 font-helvetica text-textSecondary" data-aos="fade-right">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien. Vestibulum malesuada orci sit amet pretium facilisis. In lobortis congue augue, a commodo libero tincidunt scelerisque.
          </p>
          <button className="px-[125px] py-[23px]" data-aos="fade-right">Enquiry Now</button>
        </div>
        <div>
          <h2 className="text-center mb-[68px]" data-aos="fade-up">Guidewire Compatibility</h2>
          <div className="max-w-[1024px] mx-auto" >
            <div className="bg-background rounded-[66px] p-16" data-aos="fade-up">
              <div  >
                {/* <h3 className="text-2xl font-helvetica font-bold mb-4">Guiding Catheter Compatibility</h3> */}
                <div className="grid grid-cols-2 gap-6 text-[#5A5776]" data-aos="fade-right">
                  <p className="font-medium">0.014″</p>
                  <p className="font-medium">0.018″</p>
                  <p className="font-medium">0.035″</p>
                  <p className="font-medium">5F</p>
                  <p className="font-medium">5F, 6F and 7F</p>
                  <p className="font-medium">7F, 8F and 9F</p>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-[66px] p-16 mt-8" data-aos="fade-up">
              <div  >
                {/* <h3 className="text-2xl font-helvetica font-bold mb-4">Sheath Compatibility</h3> */}
                <div className="grid grid-cols-2 gap-6 text-[#5A5776]" data-aos="fade-right">
                  <p className="font-medium">0.014″</p>
                  <p className="font-medium">0.018″</p>
                  <p className="font-medium">0.035″</p>
                  <p className="font-medium">4F</p>
                  <p className="font-medium">4F to 5F</p>
                  <p className="font-medium">5F to 7F</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="p-[6px] sm:p-5">
        <ProductSlider />
      </section>
      <section className="py-[142px]">
        <h2 className="text-center mb-[68px]" data-aos="fade-up">Contact Us</h2>
        <div className="max-w-[1180px] px-[165px] py-12 bg-primary mx-auto rounded-[95px]">

        </div>
      </section>
    </main>
  );
}
