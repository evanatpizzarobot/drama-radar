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
      <div className="rounded-xl border border-dr-border bg-dr-surface/60 p-8 text-center">
        <div className="mb-4 text-4xl" aria-hidden="true">
          📡
        </div>
        <h3 className="mb-2 text-lg font-bold text-dr-text">
          Message Received!
        </h3>
        <p className="text-sm text-dr-text-muted">
          Thank you for reaching out. Our team will get back to you as soon as
          possible.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-xl border border-dr-border bg-dr-surface/60 p-6"
    >
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-name"
          className="text-xs font-semibold uppercase tracking-wider text-dr-text-muted"
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
          className="rounded-lg border border-dr-border-hover bg-dr-bg px-4 py-2.5 text-sm text-dr-text placeholder-dr-text-dim outline-none transition-colors focus:border-dr-pink"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-email"
          className="text-xs font-semibold uppercase tracking-wider text-dr-text-muted"
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
          className="rounded-lg border border-dr-border-hover bg-dr-bg px-4 py-2.5 text-sm text-dr-text placeholder-dr-text-dim outline-none transition-colors focus:border-dr-pink"
        />
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-subject"
          className="text-xs font-semibold uppercase tracking-wider text-dr-text-muted"
        >
          Subject
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          aria-label="Message subject"
          className="rounded-lg border border-dr-border-hover bg-dr-bg px-4 py-2.5 text-sm text-dr-text outline-none transition-colors focus:border-dr-pink"
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
          className="text-xs font-semibold uppercase tracking-wider text-dr-text-muted"
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
          className="resize-y rounded-lg border border-dr-border-hover bg-dr-bg px-4 py-2.5 text-sm text-dr-text placeholder-dr-text-dim outline-none transition-colors focus:border-dr-pink"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        aria-label="Send message"
        className="mt-1 rounded-lg bg-gradient-to-r from-dr-pink to-dr-purple px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-dr-pink focus:ring-offset-2 focus:ring-offset-dr-bg"
      >
        Send Message
      </button>
    </form>
  );
}
