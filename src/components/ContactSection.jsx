import { useState, useRef } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const socialLinks = [
  {
    href: "https://github.com/U9D3RTAK3R",
    label: "GitHub",
    icon: "M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z",
  },
  {
    href: "https://linkedin.com/in/aritra-saha-a5ab88311",
    label: "LinkedIn",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    href: "https://instagram.com/u.n.d.e.r.t.a.k.e.r_07",
    label: "Instagram",
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
  {
    href: "https://discord.com/users/725581368343658568/",
    label: "Discord",
    icon: "M20.317 4.137a19.222 19.222 0 0 0-4.688-1.422.072.072 0 0 0-.078.036c-.21.371-.444.848-.608 1.225a17.603 17.603 0 0 0-5.285 0 12.58 12.58 0 0 0-.617-1.225.077.077 0 0 0-.078-.036 19.16 19.16 0 0 0-4.688 1.422.065.065 0 0 0-.03.026C.522 7.79-.155 11.324.045 14.813a.076.076 0 0 0 .031.053 19.214 19.214 0 0 0 5.77 2.904.075.075 0 0 0 .082-.028 13.85 13.85 0 0 0 1.178-1.894.072.072 0 0 0-.04-.098 12.745 12.745 0 0 1-1.795-.85.072.072 0 0 1-.006-.124c.12-.09.24-.181.354-.274a.073.073 0 0 1 .07-.01 13.526 13.526 0 0 0 11.494 0 .072.072 0 0 1 .07.009c.114.093.235.185.355.275a.072.072 0 0 1-.005.123 12.421 12.421 0 0 1-1.796.85.072.072 0 0 0-.039.099c.348.65.748 1.28 1.178 1.893a.075.075 0 0 0 .082.028 19.16 19.16 0 0 0 5.78-2.904.076.076 0 0 0 .031-.053c.256-4.035-.564-7.534-2.396-10.65a.064.064 0 0 0-.031-.026zM8.02 12.29c-.927 0-1.674-.838-1.674-1.866s.73-1.866 1.674-1.866c.953 0 1.692.847 1.674 1.866 0 1.028-.73 1.866-1.674 1.866zm7.96 0c-.927 0-1.674-.838-1.674-1.866s.73-1.866 1.674-1.866c.953 0 1.692.847 1.674 1.866 0 1.028-.73 1.866-1.674 1.866z",
  },
];

export const ContactSection = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    emailjs
      .sendForm(
        "service_wmqx6p2",
        "template_qj0w0vp",
        form.current,
        "D0v0z3ymtO1EfL-ui",
      )
      .then(
        () => {
          toast({
            title: "Message sent!",
            description:
              "Thank you for your message. I'll get back to you soon.",
          });
          setSubmitting(false);
          form.current.reset();
        },
        () => {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again later.",
            variant: "destructive",
          });
          setSubmitting(false);
        },
      );
  };

  return (
    <section
      id="contact"
      className="cyber-section"
      style={{ background: "var(--bg-deep)", overflow: "hidden" }}
    >
      <div className="cyber-grid-bg" />
      <div
        className="cyber-orb"
        style={{
          width: 420,
          height: 420,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "rgba(0,212,255,0.04)",
        }}
      />
      <div className="cyber-container">
        <AnimatedSection animationType="fade-up">
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            Contact
          </div>
          <h2 className="section-title">
            Establish <em>Connection</em>
          </h2>
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1.05rem",
              color: "#8888aa",
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            Always open to discussing software engineering opportunities,
            collaborations, and innovative ideas.
          </p>
        </AnimatedSection>

        <div className="contact-grid">
          {/* LEFT — Info */}
          <AnimatedSection animationType="fade-left">
            <div
              className="cyber-card"
              style={{ padding: "2rem", height: "100%" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {/* Email */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      background: "rgba(0,212,255,0.05)",
                      border: "1px solid rgba(0,212,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#00d4ff"
                      strokeWidth="1.5"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "0.6rem",
                        color: "#00d4ff",
                        marginBottom: 3,
                      }}
                    >
                      $ email
                    </div>
                    <a
                      href="mailto:aritrasaha0508g@gmail.com"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "1rem",
                        color: "#e0e0ff",
                        transition: "color 0.25s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#00d4ff")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#e0e0ff")
                      }
                    >
                      aritrasaha0508g@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      background: "rgba(0,212,255,0.05)",
                      border: "1px solid rgba(0,212,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#00d4ff"
                      strokeWidth="1.5"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "0.6rem",
                        color: "#00d4ff",
                        marginBottom: 3,
                      }}
                    >
                      $ location
                    </div>
                    <span
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "1rem",
                        color: "#e0e0ff",
                      }}
                    >
                      Kolkata, India
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{ height: 1, background: "rgba(0,212,255,0.08)" }}
                />

                {/* Social icons */}
                <div>
                  <div
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.6rem",
                      color: "#8888aa",
                      marginBottom: "0.75rem",
                    }}
                  >
                    $ find_me_on
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: "rgba(12,12,26,0.6)",
                          border: "1px solid rgba(0,212,255,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.28s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#00d4ff";
                          e.currentTarget.style.background =
                            "rgba(0,212,255,0.1)";
                          e.currentTarget.style.transform = "translateY(-3px)";
                          e.currentTarget.style.boxShadow =
                            "0 0 15px rgba(0,212,255,0.2)";
                          e.currentTarget.querySelector("svg").style.fill =
                            "#00d4ff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(0,212,255,0.1)";
                          e.currentTarget.style.background =
                            "rgba(12,12,26,0.6)";
                          e.currentTarget.style.transform = "none";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.querySelector("svg").style.fill =
                            "#8888aa";
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#8888aa"
                          style={{ transition: "fill 0.28s" }}
                        >
                          <path d={link.icon} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* RIGHT — Form */}
          <AnimatedSection animationType="fade-right" delay={200}>
            <div className="cyber-card" style={{ padding: "2rem" }}>
              <form
                ref={form}
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                }}
              >
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.6rem",
                      color: "#00d4ff",
                      position: "absolute",
                      top: -9,
                      left: 14,
                      background: "var(--bg-card)",
                      padding: "0 4px",
                    }}
                  >
                    $ name
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Arthur Morgann..."
                    style={{
                      width: "100%",
                      padding: "15px 16px",
                      background: "rgba(0,212,255,0.02)",
                      border: "1px solid rgba(0,212,255,0.12)",
                      borderRadius: 4,
                      color: "#e0e0ff",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "all 0.3s",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#00d4ff";
                      e.currentTarget.style.boxShadow =
                        "0 0 10px rgba(0,212,255,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(0,212,255,0.12)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.6rem",
                      color: "#00d4ff",
                      position: "absolute",
                      top: -9,
                      left: 14,
                      background: "var(--bg-card)",
                      padding: "0 4px",
                    }}
                  >
                    $ email
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="idontfeelsogood@mr.stark..."
                    style={{
                      width: "100%",
                      padding: "15px 16px",
                      background: "rgba(0,212,255,0.02)",
                      border: "1px solid rgba(0,212,255,0.12)",
                      borderRadius: 4,
                      color: "#e0e0ff",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "all 0.3s",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#00d4ff";
                      e.currentTarget.style.boxShadow =
                        "0 0 10px rgba(0,212,255,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(0,212,255,0.12)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.6rem",
                      color: "#00d4ff",
                      position: "absolute",
                      top: -9,
                      left: 14,
                      background: "var(--bg-card)",
                      padding: "0 4px",
                    }}
                  >
                    $ message
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Ok, so here me out on this bombastic idea..."
                    style={{
                      width: "100%",
                      padding: "15px 16px",
                      background: "rgba(0,212,255,0.02)",
                      border: "1px solid rgba(0,212,255,0.12)",
                      borderRadius: 4,
                      color: "#e0e0ff",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "1rem",
                      outline: "none",
                      resize: "vertical",
                      transition: "all 0.3s",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#00d4ff";
                      e.currentTarget.style.boxShadow =
                        "0 0 10px rgba(0,212,255,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(0,212,255,0.12)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="cyber-button"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    cursor: submitting ? "not-allowed" : "pointer",
                  }}
                >
                  {submitting ? "TRANSMITTING..." : "JARVIS, TRASMIT IT!"}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>

        <div
          style={{
            height: 1,
            background: "rgba(0,212,255,0.08)",
            margin: "2rem auto 1rem",
            maxWidth: 320,
          }}
        />
        <p
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.6rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            color: "#8888aa",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {"<"}Connection Established{"/>"} I will get back to you ASAP
        </p>
      </div>

      <style>{`
        .contact-grid {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 1.5rem;
          align-items: start;
        }
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 1.2fr !important;
          }
        }
      `}</style>
    </section>
  );
};
