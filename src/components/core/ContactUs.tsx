import { useState } from "react";
import Image from "next/image";
import { useForm, ValidationError } from '@formspree/react';
import { useRouter } from "next/navigation";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    interest: "",
  });

  const [state, handleSubmit] = useForm("xeojwgpq"); // Your Formspree form ID
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit(e);

    if (state.succeeded) {
      router.push('/');  // Redirect after successful submission
    }
  };

  return (
    <section className="px-5 py-16 md:py-32 bg-white">
      <h2 className="text-center mb-16" data-aos="fade-up">Let&apos;s Connect</h2>
      <div className="max-w-[1180px] px-14 md:px-32 py-9 md:py-9 bg-primary mx-auto rounded-xl md:rounded-[34px]">
        <form onSubmit={onSubmit} className="space-y-2 md:space-y-8">
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
            <ValidationError prefix="Name" field="name" errors={state.errors} />

            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Contact Number"
              className="p-3 md:p-5 rounded-[32px] md:rounded-[71px] border-none bg-[#f5f5f5] text-black w-full"
              required
            />
            <ValidationError prefix="Contact Number" field="contactNumber" errors={state.errors} />
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
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <textarea
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            placeholder="Your Interest"
            className="p-3 md:p-5 rounded-xl md:rounded-2xl border-none bg-[#f5f5f5] text-black w-full h-40"
            required
          />
          <ValidationError prefix="Interest" field="interest" errors={state.errors} />

          <div className="flex justify-center gap-5">
            <button
              type="submit"
              disabled={state.submitting}
              className="py-3 px-16 bg-[#12A89D] text-white text-lg font-bold font-helvetica rounded-[83px] flex items-center justify-center"
            >
              {state.submitting ? 'Sending...' : 'Send'}
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
