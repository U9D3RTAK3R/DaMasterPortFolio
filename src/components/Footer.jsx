export const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p className="footer__dense">
        Aritra Saha — full-stack developer, Kolkata. Built with React, Vite and
        Tailwind v4, set in Unbounded, Ubuntu and Share Tech Mono. No trackers,
        no cookies, no analytics — just a page. Résumé at{" "}
        <a href="/resume.pdf" download>
          /resume.pdf
        </a>
        . Source on{" "}
        <a
          href="https://github.com/U9D3RTAK3R/DaMasterPortFolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>

      <div className="rule" style={{ marginBlock: "var(--space-lg)" }} aria-hidden="true" />

      <div className="footer__row">
        <p className="footer__sig">2 0 2 6 · Aritra Saha</p>
        <p className="footer__dense" style={{ fontSize: "0.62rem" }}>
          Made with Pain and Suffering O_O)b — icons by{" "}
          <a
            href="https://www.flaticon.com/free-animated-icons/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Freepik
          </a>
        </p>
      </div>
    </div>
  </footer>
);
