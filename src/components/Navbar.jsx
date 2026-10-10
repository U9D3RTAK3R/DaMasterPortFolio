import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/fx/ThemeToggle";

const navItems = [
  { name: "About", to: "/#about", id: "about" },
  { name: "Experience", to: "/#experience", id: "experience" },
  { name: "Projects", to: "/projects", id: "projects" },
  { name: "Skills", to: "/#skills", id: "skills" },
  { name: "Achievements", to: "/#achievements", id: "achievements" },
  { name: "Contact", to: "/#contact", id: "contact" },
];

export const Navbar = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [floating, setFloating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setFloating(y > 140);

      if (!isHome) return;
      const sections = document.querySelectorAll("section[id]");
      let current = "hero";
      sections.forEach((section) => {
        if (y >= section.offsetTop - 140) current = section.id;
      });
      setActive(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const isActive = (item) =>
    item.id === "projects" ? pathname === "/projects" : isHome && active === item.id;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`nav${scrolled ? " is-scrolled" : ""}${floating ? " is-floating" : ""}`}
      >
        <div className="nav__inner">
          <Link to="/" className="wordmark">
            <img src="/logo.svg" alt="" />
            <span>
              ARITRA<span className="accent">.DEV</span>
            </span>
          </Link>

          <nav aria-label="Primary">
            <ul className="nav__links">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className={`nav__link${isActive(item) ? " is-active" : ""}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__tools">
            <ThemeToggle />
            <button
              type="button"
              className="icon-btn nav__burger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="nav-sheet" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            className="icon-btn nav-sheet__close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={`nav-sheet__link${isActive(item) ? " is-active" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
