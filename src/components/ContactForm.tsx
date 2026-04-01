"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60 p-8 text-center">
        <div className="mb-4 text-4xl" aria-hidden="true">
          📡
        </div>
        <h3 className="mb-2 text-lg font-bold text-[#F5F5F5]">
          Message Received!
        </h3>
        <p className="text-sm text-[#A0A0B0]">
          Thank you for reaching out. Our team will get back to you as soon as
          possible.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60 p-6"
    >
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-name"
          className="text-xs font-semibold uppercase tracking-wider text-[#A0A0B0]"
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          aria-label="Your name"
          className="rounded-lg border border-[#2A2A3E] bg-[#0D0D0F] px-4 py-2.5 text-sm text-[#F5F5F5] placeholder-[#555568] outline-none transition-colors focus:border-[#E84393]"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-email"
          className="text-xs font-semibold uppercase tracking-wider text-[#A0A0B0]"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Your email address"
          className="rounded-lg border border-[#2A2A3E] bg-[#0D0D0F] px-4 py-2.5 text-sm text-[#F5F5F5] placeholder-[#555568] outline-none transition-colors focus:border-[#E84393]"
        />
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-subject"
          className="text-xs font-semibold uppercase tracking-wider text-[#A0A0B0]"
        >
          Subject
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          aria-label="Message subject"
          className="rounded-lg border border-[#2A2A3E] bg-[#0D0D0F] px-4 py-2.5 text-sm text-[#F5F5F5] outline-none transition-colors focus:border-[#E84393]"
        >
          <option value="General">General Inquiry</option>
          <option value="Tip">Submit a Tip</option>
          <option value="Press">Press / Media</option>
          <option value="Feedback">Feedback</option>
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="text-xs font-semibold uppercase tracking-wider text-[#A0A0B0]"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          aria-label="Your message"
          className="resize-y rounded-lg border border-[#2A2A3E] bg-[#0D0D0F] px-4 py-2.5 text-sm text-[#F5F5F5] placeholder-[#555568] outline-none transition-colors focus:border-[#E84393]"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        aria-label="Send message"
        className="mt-1 rounded-lg bg-gradient-to-r from-[#E84393] to-[#A855F7] px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#E84393] focus:ring-offset-2 focus:ring-offset-[#0D0D0F]"
      >
        Send Message
      </button>
    </form>
  );
}
