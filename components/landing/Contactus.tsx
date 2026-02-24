"use client";
import { Loader2 } from "lucide-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
function Contactus() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget as any);
    const data = Object.fromEntries(fd);
    try {
      const request = await fetch("/api/submissions", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      toast.success(response.message);
      (formRef?.current as any)?.reset();
    } catch (error: any) {
      toast.success(error.message);
    }
    setLoading(false);
  };
  return (
    <div id="contactus" className="w-full mx-auto p-5">
      <div className="text-3xl font-semibold">
        <h2 className="flex items-center text-3xl font-bold mb-2">
          <span className="w-3 h-7 bg-gradient-to-b from-purple-500 to-indigo-500 rounded mr-2"></span>
          Connect With Us
        </h2>
      </div>
      <form ref={formRef} className="grid gap-3" onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 gap-3">
          <div className="grid bg-gradient-to-br from-purple-500 to-indigo-500 p-[2px] rounded">
            <input
              type="text"
              className="bg-gray-900 rounded p-2 outline-none"
              name="name"
              required
              placeholder="Enter Your Name"
            />
          </div>
          <div className="grid bg-gradient-to-br from-purple-500 to-indigo-500 p-[2px] rounded">
            <input
              type="text"
              className="bg-gray-900 rounded p-2 outline-none"
              name="email"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="grid bg-gradient-to-br from-purple-500 to-indigo-500 p-[2px] rounded">
            <input
              type="text"
              className="bg-gray-900 rounded p-2 outline-none"
              name="phone"
              maxLength={10}
              minLength={10}
              required
              placeholder="Enter Your Phone Number"
            />
          </div>
          <div className="grid bg-gradient-to-br from-purple-500 to-indigo-500 p-[2px] rounded">
            <input
              type="text"
              className="bg-gray-900 rounded p-2 outline-none"
              name="city"
              placeholder="Enter Your City"
              required
            />
          </div>
        </div>
        <div className="grid bg-gradient-to-br from-purple-500 to-indigo-500 p-[2px] rounded">
          <textarea
            className="bg-gray-900 rounded p-2 outline-none"
            rows={10}
            name="message"
            placeholder="Enter Your Message"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="transition cursor-pointer text-center! bg-gradient-to-br from-purple-500 to-indigo-500 p-2 rounded hover:from-purple-600 hover:to-indigo-600"
        >
          {loading ? <Loader2 className="animate-spin mx-auto!" /> : "Send Message"}
        </button>
      </form>
    </div>
  );
}

export default Contactus;
