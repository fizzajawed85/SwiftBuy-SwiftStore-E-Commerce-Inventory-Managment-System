import React, { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero-style Heading Section */}
      <div className="relative bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 p-12 md:p-16 text-center rounded-3xl overflow-hidden mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Contact Us
        </h1>
        <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto">
          Have questions, feedback, or just want to say hello? Reach out to us or fill out the contact form.
        </p>

        {/* Decorative circles */}
        <span className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></span>
        <span className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 animate-pulse-slow"></span>
      </div>

      {/* Two-column Contact Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4 md:px-0">
        {/* Left Side - Address & Info with Icons */}
        <div className="space-y-8 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl text-yellow-400 font-bold mb-2">Get in Touch</h2>
          <p className="text-gray-300 text-lg md:text-xl">
            We’d love to hear from you! Reach out via email, phone, or visit us at our office. We are here to help.
          </p>
          <div className="space-y-4 text-gray-200">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-yellow-400 text-xl" />
              <span>123 SwiftBuy St, E-commerce City, USA</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-yellow-400 text-xl" />
              <span>support@swiftbuy.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-yellow-400 text-xl" />
              <span>+1 (123) 456-7890</span>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <button
              type="submit"
              className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition transform hover:scale-105 flex items-center justify-center gap-2 mt-2"
            >
              Send Message <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>

      {/* Decorative Bottom */}
      <div className="relative mt-12">
        <span className="absolute top-0 left-1/4 w-64 h-64 bg-purple-700/20 rounded-full -z-10"></span>
        <span className="absolute bottom-0 right-1/3 w-80 h-80 bg-pink-600/20 rounded-full -z-10"></span>
      </div>
    </div>
  );
}
