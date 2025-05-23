"use client"
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createContactForm } from "@/actions/contact";  // Make sure to import your API function

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response: any = await createContactForm(formData);
      if (response && response.isSuccess) {
        setFormData({ name: "", email: "", phoneNumber: "", message: "" }); // Reset form
        router.push('/');  // Redirect after successful submission
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-5 py-16 md:py-32 bg-white">
      <h2 className="text-center mb-16" data-aos="fade-up">Let&apos;s Connect</h2>
      <div className="max-w-[1180px] px-5 md:px-32 py-9 md:py-9 bg-primary mx-auto rounded-xl md:rounded-[34px]">
        <form onSubmit={handleSubmit} className="space-y-2 md:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="p-3 md:p-5 rounded-[32px] md:rounded-[71px] border-none bg-[#f5f5f5] text-black w-full"
              required
            />

            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Contact Number"
              className="p-3 md:p-5 rounded-[32px] md:rounded-[71px] border-none bg-[#f5f5f5] text-black w-full"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 md:p-5 rounded-[32px] md:rounded-[71px] border-none bg-[#f5f5f5] text-black w-full"
            required
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="message"
            className="p-3 md:p-5 rounded-xl md:rounded-2xl border-none bg-[#f5f5f5] text-black w-full h-40"
            required
          />

          <div className="flex justify-center gap-5">
            <button
              type="submit"
              disabled={loading}
              className="py-3 px-16 bg-[#12A89D] text-white text-lg font-bold font-helvetica rounded-[83px] flex items-center justify-center"
            >
              {loading ? 'Sending...' : 'Send'}
              <span className="ml-5">
                <Image
                  src="/icons/contact-left.png"
                  alt="Arrow Icon"
                  width={38}
                  height={24}
                />
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
