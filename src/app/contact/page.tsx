"use client";

import Navbar from "@/components/core/Navbar";
import Image from "next/image";

export default function Contact() {
  return (
    <main className="relative bg-[#e9f2f8] p-5 h-screen ">
      <Navbar />
      <section className="flex justify-center items-center pt-[150px]">
        <div className="flex max-w-[1440px]  items-center bg-white h-[470px] rounded-[236px] p-10">
          <div className="w-1/2 flex justify-center relative left-[-100px]">
            <div className="rounded-full overflow-hidden">
              <Image
                src="/contact/contact.svg"
                alt="Contact"
                width={660}
                height={660}
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-1/2 pr-10 pt-[62px]">
            <h2 className="text-2xl font-normal text-center mb-8">
              Take your thing to the next level
              <br />
              Get in touch 👋
            </h2>
            <form>
              <div className="flex gap-[20px] mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4">
                <option value="">Your Interest</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
              <textarea
                placeholder="Message"
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-[94px]"
              // rows="4"
              />
              <button className="px-[133px] py-4 ">Send</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
