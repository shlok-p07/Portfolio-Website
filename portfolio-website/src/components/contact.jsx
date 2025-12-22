import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

// Initialize EmailJS with environment variable
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const Contact = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const animation = gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setFormMessage({ type: "", text: "" });

    // Get form data directly from inputs
    const formData = {
      name: formRef.current?.elements.name?.value,
      email: formRef.current?.elements.email?.value,
      number: formRef.current?.elements.number?.value,
      message: formRef.current?.elements.message?.value,
    };

    console.log("Sending form data:", formData);

    // Check if env vars are loaded
    if (!import.meta.env.VITE_EMAILJS_SERVICE_ID || !import.meta.env.VITE_EMAILJS_TEMPLATE_ID) {
      setFormMessage({ type: "error", text: "Email configuration missing. Please contact the site owner." });
      setLoading(false);
      console.error("Missing EmailJS environment variables");
      return;
    }

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          setFormMessage({ type: "success", text: "Message sent successfully! I'll get back to you soon." });
          formRef.current?.reset();
          setLoading(false);
          setTimeout(() => setFormMessage({ type: "", text: "" }), 5000);
        },
        (error) => {
          console.error("Email send error:", error);
          setFormMessage({ type: "error", text: `Failed to send message. Please try again.` });
          setLoading(false);
        }
      );
  };

  return (
    <div
      id="contact"
      ref={containerRef}
      className="relative w-full flex justify-center py-20 border-b border-neutral-800/40 bg-black/10"
    >
      <div className="w-full px-6 flex flex-col gap-10 items-center relative z-10">
        <h1 className="text-6xl text-center text-blue-500 font-extrabold tracking-wider">
          Contact Me
        </h1>
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-4xl">
            <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-blue-500/8 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-cyan-500/8 blur-3xl" />

            <div className="relative rounded-3xl border border-white/15 bg-white/6 backdrop-blur-xl shadow-2xl shadow-blue-500/10">
              <form ref={formRef} onSubmit={sendEmail} className="grid grid-cols-1 gap-6 p-8 md:p-10">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 shadow-lg shadow-black/30 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-white/40"
                    placeholder="Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 shadow-lg shadow-black/30 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-white/40"
                    placeholder="Email"
                  />
                </div>

                <div>
                  <label htmlFor="number" className="sr-only">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="number"
                    name="number"
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 shadow-lg shadow-black/30 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-white/40"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="md:col-span-6">
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 shadow-lg shadow-black/30 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-white/40"
                    placeholder="Your Message"
                  />
                </div>

                <div className="flex justify-start">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-auto px-8 py-3 rounded-2xl bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-xl shadow-blue-500/30 hover:from-blue-400 hover:to-cyan-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {loading ? "Sending..." : "Submit"}
                  </button>
                </div>

                {formMessage.text && (
                  <div
                    className={`text-sm font-medium p-3 rounded-lg md:col-start-2 md:col-span-5 ${
                      formMessage.type === "success"
                        ? "bg-green-500/20 border border-green-500/50 text-green-400"
                        : "bg-red-500/20 border border-red-500/50 text-red-400"
                    }`}
                  >
                    {formMessage.text}
                  </div>
                )}
              </form>
              
            </div>
            <div className="mt-8 flex items-center justify-center gap-5">
              <a
                href="https://www.linkedin.com/in/-shlokpatel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/15 transition cursor-pointer flex items-center justify-center"
              >
                <FaLinkedin className="text-white text-2xl" />
              </a>
              <a
                href="https://www.instagram.com/shlokp.07/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/15 transition cursor-pointer flex items-center justify-center"
              >
                <FaInstagram className="text-white text-2xl" />
              </a>
              <a
                href="https://github.com/shlok-p07"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/15 transition cursor-pointer flex items-center justify-center"
              >
                <FaGithub className="text-white text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
