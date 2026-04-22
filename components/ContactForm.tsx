"use client";

import { useState } from "react";
import { Instagram, Youtube, Linkedin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/",
    icon: Instagram,
  },
  {
    label: "Vimeo",
    href: "https://vimeo.com/",
    icon: null, // no lucide icon — uses ExternalLink fallback
  },
  {
    label: "YouTube",
    href: "https://youtube.com/",
    icon: Youtube,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/",
    icon: Linkedin,
  },
];

const inputClass =
  "w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-3 text-sm outline-none focus:border-gray-700 dark:focus:border-gray-300 transition-colors duration-200 placeholder:text-gray-300 dark:placeholder:text-gray-700";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("[Contact form submitted]", data);
    setSent(true);
    e.currentTarget.reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-28">

      {/* ── Email ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
      >
        <p className="font-mono-meta text-gray-400 dark:text-gray-600 mb-8">— Contact</p>
        <a
          href="mailto:hello@studio.com"
          className="block text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-none hover:opacity-40 transition-opacity duration-300 break-all"
        >
          hello@studio.com
        </a>
      </motion.div>

      {/* ── SNS ───────────────────────────────────────────── */}
      <motion.div
        className="mt-12 flex flex-wrap gap-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.22, ease: [0.4, 0, 0.2, 1] }}
      >
        {socials.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-mono text-sm text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
          >
            {Icon ? (
              <Icon size={14} strokeWidth={1.5} />
            ) : (
              <ExternalLink size={14} strokeWidth={1.5} />
            )}
            {label}
          </a>
        ))}
      </motion.div>

      {/* ── Form ──────────────────────────────────────────── */}
      <motion.div
        className="mt-20 pt-14 border-t border-gray-100 dark:border-gray-900 max-w-xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.34, ease: [0.4, 0, 0.2, 1] }}
      >
        <p className="font-mono-meta text-gray-400 dark:text-gray-600 mb-10">Enquiry</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono-meta text-gray-400 dark:text-gray-600">Name</label>
            <input name="name" type="text" required placeholder="Your name" className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono-meta text-gray-400 dark:text-gray-600">Email</label>
            <input name="email" type="email" required placeholder="your@email.com" className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono-meta text-gray-400 dark:text-gray-600">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell me about your project..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="flex items-center gap-6">
            <button
              type="submit"
              className="
                font-mono-meta px-8 py-3
                border border-gray-900 dark:border-gray-100
                hover:bg-gray-900 hover:text-gray-100
                dark:hover:bg-gray-100 dark:hover:text-gray-900
                transition-all duration-200
              "
            >
              Send
            </button>

            {sent && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-mono text-xs text-gray-400"
              >
                Message received. I'll be in touch.
              </motion.span>
            )}
          </div>
        </form>
      </motion.div>

    </div>
  );
}
