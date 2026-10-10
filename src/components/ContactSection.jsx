import { useRef, useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
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
            title: "Message sent",
            description: "Thanks — I'll get back to you soon.",
          });
          setSubmitting(false);
          form.current.reset();
        },
        () => {
          toast({
            title: "Message not sent",
            description:
              "The form service rejected the request. Try again, or email me directly.",
            variant: "destructive",
          });
          setSubmitting(false);
        },
      );
  };

  return (
    <section id="contact" className="section section--alt">
      <div className="container section__grid">
        <div className="section__head section__head--sticky">
          <AnimatedSection animationType="fade-up">
            <span className="kicker">07 / Contact</span>
            <h2 className="h2">
              {"Let's build "}
              <span className="accent">something</span>
            </h2>
            <p className="sub">
              Open to software engineering opportunities, collaborations, and
              ideas that are a little too ambitious.
            </p>
          </AnimatedSection>

          <AnimatedSection animationType="fade-up" delay={120}>
            <div
              className="card"
              style={{
                marginTop: "var(--space-lg)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-lg)",
              }}
            >
              <div className="info-row">
                <span className="info-row__icon">
                  <Mail size={16} />
                </span>
                <div>
                  <div className="info-row__key">$ email</div>
                  <a
                    className="info-row__val"
                    href="mailto:aritrasaha0508g@gmail.com"
                  >
                    aritrasaha0508g@gmail.com
                  </a>
                </div>
              </div>
              <div className="info-row">
                <span className="info-row__icon">
                  <MapPin size={16} />
                </span>
                <div>
                  <div className="info-row__key">$ location</div>
                  <span className="info-row__val">Kolkata, India</span>
                </div>
              </div>
              <div>
                <div className="info-row__key" style={{ marginBottom: "var(--space-sm)" }}>
                  $ find_me_on
                </div>
                <div className="socials">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="social"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d={link.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection animationType="fade-left" delay={150}>
          <div className="card">
            <form
              ref={form}
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-md)",
              }}
            >
              <div className="field">
                <label className="field__label" htmlFor="contact-name">
                  $ name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  placeholder="Arthur Morgann…"
                />
              </div>
              <div className="field">
                <label className="field__label" htmlFor="contact-email">
                  $ email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  placeholder="idontfeelsogood@mr.stark…"
                />
              </div>
              <div className="field">
                <label className="field__label" htmlFor="contact-message">
                  $ message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Ok, so hear me out on this bombastic idea…"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn--solid"
                style={{ justifyContent: "center" }}
              >
                {submitting ? "TRANSMITTING…" : "JARVIS, TRASMIT IT!"}
                <Send size={14} />
              </button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
