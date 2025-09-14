import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitch,
  Twitter,
} from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef  } from "react";
import emailjs from "@emailjs/browser";
import { AnimatedSection } from "./AnimatedSection";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        "service_wmqx6p2",       //EmailJS service ID
        "template_qj0w0vp",      //EmailJS template ID
        form.current,
        "D0v0z3ymtO1EfL-ui"      //EmailJS public key
      )
      .then(
        () => {
          toast({
            title: "Message sent!",
            description: "Thank you for your message. I'll get back to you soon.",
          });
          setIsSubmitting(false);
          form.current.reset();
        },
        (error) => {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again later.",
            variant: "destructive",
          });
          setIsSubmitting(false);
        }
      );
  };
  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <AnimatedSection animationType="slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Get In <span className="text-gradient"> Touch</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection animationType="fade-in" delay={300}>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out.
            I'm always open to discussing new opportunities.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">
              {" "}
              Contact Information
            </h3>

            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> Email</h4>
                  <a
                    href="mailto:aritrasaha0508g@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    aritrasaha0508g@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> Phone</h4>
                  <a
                    href="tel:+919007402066"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +91 90074-02066
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> Location</h4>
                  <a href="https://maps.app.goo.gl/yrHGqJQG694eo2Dn6" 
                     target="_blank"
                     className="text-muted-foreground hover:text-primary transition-colors">
                    Kolkata, WB, India
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4"> Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a href="https://www.linkedin.com/in/aritra-saha-a5ab88311/" target="_blank" 
                   className="group p-2 rounded-full transition-all duration-300 hover:bg-blue-500/10 hover:scale-110 hover:-translate-y-1">
                  <Linkedin className="transition-all duration-300 group-hover:text-blue-500 group-hover:drop-shadow-lg" />
                </a>
                <a href="#" target="_blank"
                   className="group p-2 rounded-full transition-all duration-300 hover:bg-sky-500/10 hover:scale-110 hover:-translate-y-1">
                  <Twitter className="transition-all duration-300 group-hover:text-sky-500 group-hover:drop-shadow-lg" />
                </a>
                <a href="https://www.instagram.com/u.n.d.e.r.t.a.k.e.r_07/" target="_blank"
                   className="group p-2 rounded-full transition-all duration-300 hover:bg-pink-500/10 hover:scale-110 hover:-translate-y-1">
                  <Instagram className="transition-all duration-300 group-hover:text-pink-500 group-hover:drop-shadow-lg" />
                </a>
                <a href="#" target="_blank"
                   className="group p-2 rounded-full transition-all duration-300 hover:bg-purple-500/10 hover:scale-110 hover:-translate-y-1">
                  <Twitch className="transition-all duration-300 group-hover:text-purple-500 group-hover:drop-shadow-lg" />
                </a>
                <a href="https://discord.com/users/725581368343658568/" target="_blank"
                   className="group p-2 rounded-full transition-all duration-300 hover:bg-indigo-500/10 hover:scale-110 hover:-translate-y-1">
                  <SiDiscord className="transition-all duration-300 group-hover:text-indigo-500 group-hover:drop-shadow-lg" />
                </a>
              </div>
            </div>
          </div>

          <div
            className="bg-card p-8 rounded-lg shadow-xs"
          >
            <h3 className="text-2xl font-semibold mb-6"> Send a Message</h3>

            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder="Arthur Morgann..."
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder="GordonRomosoyCooking@gmail.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button
                style={{cursor:'pointer'}}
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};