"use client";

import Navbar from "@/components/core/Navbar";
import Image from "next/image";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { createContactForm } from "@/actions/contact";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    message: '',
  });
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log("formValues", formValues);

    try {
      const response: any = await createContactForm(formValues);
      if (response && response.isSuccess) {
        setFormValues({ name: '', phoneNumber: '', email: '', message: '' }); // Reset form
        router.push('/'); // Redirect to home
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

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
                  value={formValues.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="col-span-12 spbp:col-span-6 contact-form"
                  required
                />
                <input
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="col-span-12 spbp:col-span-6 contact-form"
                  required
                />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="col-span-12 contact-form"
                  required
                />
              </div>
              <textarea
                id="message"
                name="message"
                value={formValues.message}
                onChange={handleChange}
                placeholder="Message"
                className="col-span-12 w-full contact-form mb-[54px] xl:mb-[64px] 3xl:mb-[104px]"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-[80px] spbp:px-[133px] py-4"
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
