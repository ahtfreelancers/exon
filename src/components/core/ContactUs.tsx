import { useState } from "react";
import Image from "next/image";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    interest: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Here you can add further logic to send the data to your backend
  };
  return (
    <section className="px-5 py-16 md:py-32 bg-white">
      <h2 className="text-center mb-16" data-aos="fade-up">Lets Connect</h2>
      <div className="max-w-[1180px] px-14 md:px-32 py-9 md:py-9 bg-primary mx-auto rounded-xl md:rounded-[34px]">
        <form onSubmit={handleSubmit} className="space-y-2 md:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="p-3 md:p-5 rounded-[32px] md:rounded-[71px] border-none bg-[#f5f5f5] text-black w-full"
            />
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Contact Number"
              className="p-3 md:p-5 rounded-[32px] md:rounded-[71px] border-none bg-[#f5f5f5] text-black w-full"
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 md:p-5 rounded-[32px] md:rounded-[71px] border-none bg-[#f5f5f5] text-black w-full"
          />
          <textarea
            name="interest"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Interest"
            className="p-3 md:p-5 rounded-xl md:rounded-2xl border-none bg-[#f5f5f5] text-black w-full h-40"
          />
          <div className="flex justify-center gap-5">
            <button
              type="submit"
              className="py-3 px-16 bg-[#12A89D] text-white text-lg font-bold font-helvetica rounded-[83px] flex items-center justify-center"
            >
              Send
              <span className="ml-5">
                <Image
                  src="/icons/contact-left.png"
                  alt="Arrow Icon"
                  width={38} // Adjust the width and height as needed
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
