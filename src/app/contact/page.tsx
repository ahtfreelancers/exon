"use client";

import Navbar from "@/components/core/Navbar";
import Image from "next/image";
import { useForm, ValidationError } from '@formspree/react';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [state, handleSubmit] = useForm("xeojwgpq");  // Formspree form ID
  const router = useRouter();

  if (state.succeeded) {
    router.push('/');
  }

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
            <form className="text-center" onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-[20px] mb-4">
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="col-span-12 spbp:col-span-6 contact-form"
                  required
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} />

                <input
                  id="contact"
                  type="text"
                  name="contact"
                  placeholder="Contact Number"
                  className="col-span-12 spbp:col-span-6 contact-form"
                  required
                />
                <ValidationError prefix="Contact" field="contact" errors={state.errors} />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="col-span-12 contact-form"
                  required
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                className="col-span-12 w-full contact-form mb-[54px] xl:mb-[64px] 3xl:mb-[104px]"
                rows={4}
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />

              <button
                type="submit"
                disabled={state.submitting}
                className="px-[80px] spbp:px-[133px] py-4"
              >
                {state.submitting ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
