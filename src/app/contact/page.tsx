"use client";

import Navbar from "@/components/core/Navbar";
import Image from "next/image";

export default function Contact() {
  return (
    <main className="spbp:relative bg-[#e9f2f8] p-5 min-h-screen contactus">
      <Navbar />
      <section className="mx-auto spbp:flex justify-center items-center pt-[80px] mt-[100px] spbp:mt-0 bg-[#e9f2f8]">
        <div className="grid grid-cols-1 spbp:grid-cols-2 mx-auto lg:max-w-[1000px] spbp:max-w-[1200px] 3xl:max-w-[1440px] bg-white min-h-[550px] spbp:min-h-0 xl:h-[530px] 3xl:h-[600px] rounded-b-[180px] spbp:rounded-[200px] 3xl:rounded-[236px] p-10">
          <div className="flex rounded-full justify-center spbp:relative left-[-100px]">
            <Image
              src="/contact/contact.svg"
              alt="Contact"
              width={660}
              height={660}
              className="size-[300px] spbp:size-[480px] absolute spbp:relative top-[100px] spbp:top-auto xl:top-[-35px] 3xl:top-[-41px] spbp:size-[530px] xl:size-[520px] 3xl:size-[600px] object-cover"
            />
          </div>
          <div className="spbp:pr-10 spbp:pt-[32px] xl:pt-[62px] 3xl:pt-0 mt-[180px] spbp:mt-0">
            <h2 className="text-2xl font-normal text-center mb-8">
              Take your thing to the next level
              <br />
              Get in touch 👋
            </h2>
            <form className="text-center">
              <div className="grid grid-cols-12 gap-[20px] mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="col-span-12 spbp:col-span-6 contact-form"
                />
                <input
                  type="contact"
                  placeholder="Contact Number"
                  className="col-span-12 spbp:col-span-6 contact-form"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="col-span-12 contact-form"
                />
              </div>
              <textarea
                placeholder="Message"
                className="col-span-12 w-full contact-form mb-[54px] xl:mb-[64px] 3xl:mb-[104px]"
              // rows="4"
              />
              <button className="px-[80px] spbp:px-[133px] py-4 ">Send</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
