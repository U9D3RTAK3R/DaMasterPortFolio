import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MatrixOverlay } from "@/components/fx/MatrixOverlay";

/* global __BUILD_TIME__ */

const BUILD_START = new Date(
  typeof __BUILD_TIME__ !== "undefined" ? __BUILD_TIME__ : new Date(),
).getTime();

const SECTIONS = [
  { id: "about", nav: "/#about" },
  { id: "experience", nav: "/#experience" },
  { id: "projects", nav: "/projects" },
  { id: "skills", nav: "/#skills" },
  { id: "achievements", nav: "/#achievements" },
  { id: "contact", nav: "/#contact" },
  { id: "resume", nav: "/#resume" },
];

const DIR_FILES = {
  "/": {
    dirs: SECTIONS.map((s) => s.id),
    files: ["README.md", "ascii_art.txt", "mission.txt", "secret.txt", "bio.txt"],
  },
  "/about": { dirs: [], files: ["stack.txt"] },
  "/experience": { dirs: [], files: ["cachecrew.md", "oss.md", "redacted.md"] },
  "/projects": { dirs: [], files: ["traffiq", "cognify", "portfolio-v2", "retro"] },
  "/skills": { dirs: [], files: ["languages", "frontend", "backend-tools", "ai-vision"] },
  "/achievements": { dirs: [], files: ["awards.md", "certifications.md"] },
  "/contact": { dirs: [], files: ["email.txt"] },
  "/resume": { dirs: [], files: ["resume.pdf"] },
};

const FILE_BODIES = {
  "README.md":
    "konnichiwa. this is a terminal-portfolio for the person behind it.\nbrowse sections with cat <section>, or read the file listing with ls.",
  "bio.txt": "aritra — full-stack developer, co-founder of CacheCrew since 1st year.",
  "stack.txt": "react · go · flutter · python — with a side of opencv/yolo/linux.",
  "mission.txt": "build fast, accessible software that outlives the next framework hype.",
  "secret.txt": "responsibilities: yes. brain cells: disputed. on my resume: slightly embellished.",
  "cachecrew.md": "CacheCrew — hackathon team, led since first year. ships under pressure, panics on the inside.",
  "oss.md": "open-source contributor — two major repos, too many tabs, zero regrets.",
  "redacted.md": "███████ ███████ ████████: classified. it does not exist.",
  traffiq: "real-time multi-camera ANPR — YOLO26 + Real-ESRGAN + TrOCR. cat projects to open.",
  cognify: "AI learning platform — Flutter, Go, Firebase, Gemini.",
  "portfolio-v2": "this very site. no 3D library payload, all CSS. stays lean.",
  retro: "terminal portfolio with a real emulator. a machine that should not be running.",
  languages: "python · javascript · c++ · java · go · sql",
  frontend: "react · html/css · tailwind · flutter · framer",
  "backend-tools": "node · fastapi · mongodb · firebase · git · docker · linux",
  "ai-vision": "opencv · yolo · ai/ml",
  "awards.md": "Innov-A-Thon 1st · TechSprint 2nd · SIH internal 2025/26",
  "certifications.md": "Networking Basics (CISCO) · Intro to Cyber Security (CISCO)",
  "email.txt": "say hi through the Contact section — it ships straight to my inbox via EmailJS.",
  "resume.pdf": "one page, everything. check the Résumé section, or cat it from home.",
  "ascii_art.txt": "type 'banner' to re-print it.",
};

const COMMANDS = [
  ["help", "show this menu"],
  ["ls", "list files & directories"],
  ["cat", "view a file or jump to a section"],
  ["pwd", "print working directory"],
  ["cd", "change directory"],
  ["whoami", "who you are"],
  ["neofetch", "system info"],
  ["uptime", "time since last deploy"],
  ["date", "current date & time"],
  ["echo", "print text"],
  ["history", "command history"],
  ["clear", "clear the screen (dismisses the banner)"],
  ["man", "command usage"],
  ["matrix", "enter the matrix"],
  ["creds", "the secret"],
  ["open / goto", "jump to a section"],
  ["banner", "re-print the ascii banner"],
  ["67", "?"],
  ["exit", "try it"],
];

const COMMAND_NAMES = [
  "help", "ls", "cat", "pwd", "cd", "whoami", "neofetch", "uptime", "date",
  "echo", "history", "clear", "man", "matrix", "creds", "open", "goto",
  "banner", "sudo", "uname", "ping", "weather", "apt", "git", "exit", "67",
];

const pad = (n) => String(n).padStart(2, "0");

const uptimeText = () => {
  const ms = Math.max(0, Date.now() - BUILD_START);
  const s = Math.floor(ms / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  return (
    `up ${days} day${days === 1 ? "" : "s"}, ${pad(hours)}:${pad(mins)}:${pad(secs)} ` +
    `— since deploy ${new Date(BUILD_START).toLocaleString()}`
  );
};

const NEOFETCH_INFO = (art) => {
  const info = [
    "aritra@portfolio",
    "---------------------------",
    "OS: DaMasterOS 2.1.83 x86_64",
    "Host: DaMasterPortFolio",
    "Kernel: 5.15.0-cyber",
    `Uptime: ${uptimeText()}`,
    "Shell: bash 7.0 (fully mocked)",
    "Theme: studied-DNA [dark/light]",
    "CPU: bipolar silicon (99% allocated)",
    "Memory: 16GiB / 16GiB — jokes included",
  ];
  const artLines = (art || "").trimEnd().split("\n");
  const width = Math.max(...artLines.map((l) => [...l].length), 0);
  const out = [];
  info.forEach((line, i) => {
    const head =
      i < artLines.length ? artLines[i].padEnd(width + 2) : " ".repeat(width + 2);
    out.push(head + line);
  });
  for (let i = info.length; i < artLines.length; i += 1) out.push(artLines[i]);
  return out.join("\n");
};

function Entry({ entry }) {
  const source = entry.source;
  return (
    <div className="term-entry">
      {source && (
        <div className="term-line">
          <span className="term-prompt">{PROMPT}</span>{" "}
          <span className="term-cmd">{source}</span>
        </div>
      )}
      {entry.out != null && <div className="term-out">{entry.out}</div>}
    </div>
  );
}

const PROMPT = "aritra@portfolio:~$";

const FALLBACK_BANNER = [
  "           _   _     _                            ",
  "   __ _ _ | |_| |__ (_)_ __   __ _ _ __    _     _",
  "  / _` | '__| __| '_ \\| | '_ \\ / _` | '_ \\ _| |_ _| |",
  " | (_| | |  | |_| | | | | | | | (_| | | | |_   _|_   _|",
  "  \\__,_|_|   \\__|_| |_|_|_|_| |_|\\__, |_| |_| |_|   |_|",
  "                               |___/                 ",
  "      full-stack developer · portfolio terminal",
  "",
  "  type 'help' to begin. type 67 if you dare.",
].join("\n");

export const TerminalSection = () => {
  const navigate = useNavigate();
  const [lines, setLines] = useState([]);
  const [cwd, setCwd] = useState("/");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [buf, setBuf] = useState("");
  const [suggests, setSuggests] = useState(null);
  const [suggestIdx, setSuggestIdx] = useState(-1);
  const [matrix, setMatrix] = useState(false);
  const [banner, setBanner] = useState(null);
  const [fastArt, setFastArt] = useState("");
  const [cleared, setCleared] = useState(false);
  const [clock, setClock] = useState(() =>
    new Date().toLocaleTimeString([], { hour12: false }),
  );
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const nextId = useRef(1);

  useEffect(() => {
    fetch("/ascii_art.txt")
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then(setBanner)
      .catch(() => setBanner(FALLBACK_BANNER));
    fetch("/ascii_art_2.txt")
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then(setFastArt);
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, banner, cleared]);

  useEffect(() => {
    const id = window.setInterval(
      () => setClock(new Date().toLocaleTimeString([], { hour12: false })),
      1000,
    );
    return () => window.clearInterval(id);
  }, []);

  const activateMatrix = () => {
    setMatrix(true);
    document.documentElement.classList.add("matrix-active");
  };
  const deactivateMatrix = () => {
    setMatrix(false);
    document.documentElement.classList.remove("matrix-active");
  };
  useEffect(() => () => deactivateMatrix(), []);

  const push = useCallback((source, out) => {
    setLines((l) => [...l, { id: nextId.current++, source, out }]);
  }, []);
  const pushAndGo = useCallback((source, out, to) => {
    setLines((l) => [...l, { id: nextId.current++, source, out }]);
    const sel = to.startsWith("/") ? to.slice(1) : to;
    window.setTimeout(() => document.querySelector(sel)?.scrollIntoView(), 120);
  }, []);
  const pushAndRoute = useCallback((source, out, to) => {
    setLines((l) => [...l, { id: nextId.current++, source, out }]);
    window.setTimeout(() => navigate(to), 120);
  }, [navigate]);

  const usage = (name) => {
    const map = {
      help: "help — show this menu",
      ls: "ls — list files & directories in the current directory",
      cat: "cat <file|section> — view a file, or jump to a section (about, experience, projects, skills, achievements, contact, resume)",
      cd: "cd <dir> — change directory ('.', '..', '/' or a section name)",
      man: "man <command> — show usage for a command",
      matrix: "matrix — buckle up. (sudo rm matrix to leave)",
      whoami: "whoami — prints your identity",
      uptime: "uptime — time since this build was deployed",
      echo: "echo <text> — repeat after me",
      open: "open|goto <section> — jump to a section",
      goto: "open|goto <section> — jump to a section",
    };
    return map[name] || `man: no manual entry for ${name}`;
  };

  const bannerNode = (source) =>
    push(source, <pre className="term-pre">{banner || FALLBACK_BANNER}</pre>);

  const run = (raw) => {
    const argv = raw.trim().split(/ +/);
    const cmd = argv[0].toLowerCase();
    const rest = argv.slice(1);

    if (rest.includes("-h") || rest.includes("--help")) return usage(cmd);
    if (cmd === "man") return usage(rest[0]);

    switch (cmd) {
      case "clear":
        setCleared(true);
        setLines([]);
        return null;

      case "help":
        return COMMANDS.map(([c, d]) => `${c.padEnd(14)} ${d}`).join("\n");

      case "ls": {
        const dir = DIR_FILES[cwd];
        const items = [];
        (dir?.dirs || []).forEach((d) =>
          items.push(
            <span key={`d-${d}`} className="ls-dir">
              {d}/
            </span>,
          ),
        );
        (dir?.files || []).forEach((f) =>
          items.push(
            <span key={`f-${f}`} className={`ls-file${f.includes("ascii_art") ? " ls-file--art" : ""}`}>
              {f}
            </span>,
          ),
        );
        return items.length ? <div className="term-ls">{items}</div> : "empty";
      }

      case "cd": {
        const arg = rest[0];
        if (!arg || arg === "~" || arg === "/") setCwd("/");
        else if (arg === ".." || arg === "../") setCwd((p) => (p === "/" ? "/" : p.replace(/\/[^/]*$/, "") || "/"));
        else if (DIR_FILES[`/${arg}`]) setCwd(`/${arg}`);
        else return `cd: no such directory: ${arg}`;
        return null;
      }

      case "pwd":
        return cwd;

      case "cat": {
        const arg = rest.join(" ").toLowerCase();
        if (!arg) return "usage: cat <file|section>";
        const section = SECTIONS.find((s) => s.id === arg);
        if (section) {
          if (section.nav.startsWith("/#")) pushAndGo(raw, `opening ${arg}…`, section.nav);
          else pushAndRoute(raw, `opening ${arg}…`, section.nav);
          return null;
        }
        if (arg === "ascii_art.txt") {
          bannerNode(raw);
          return null;
        }
        if (arg === "ascii_art_2.txt") {
          push(
            raw,
            <pre className="term-pre">{fastArt || "fastfetch art not loaded yet."}</pre>,
          );
          return null;
        }
        if (FILE_BODIES[arg]) {
          if (arg === "resume.pdf" && cwd === "/") {
            pushAndRoute(raw, "opening resume.pdf…", "/#resume");
            return null;
          }
          return FILE_BODIES[arg];
        }
        return `cat: ${arg}: No such file or directory`;
      }

      case "open":
      case "goto": {
        const arg = rest[0] && rest[0].toLowerCase();
        const section = SECTIONS.find((s) => s.id === arg);
        if (section) {
          if (section.nav.startsWith("/#")) pushAndGo(raw, `going to ${arg}…`, section.nav);
          else pushAndRoute(raw, `going to ${arg}…`, section.nav);
          return null;
        }
        return `${cmd}: unknown section: ${arg}`;
      }

      case "whoami":
        return "aritra — full-stack developer, Kolkata (undercover)";

      case "neofetch":
        return <pre className="term-pre">{NEOFETCH_INFO(fastArt)}</pre>;

      case "uptime":
        return uptimeText();

      case "date":
        return new Date().toString();

      case "echo":
        return rest.join(" ") || "";

      case "history":
        if (!history.length) return "history: empty (nothing to regret yet)";
        return history.map((h, i) => `  ${i + 1}  ${h}`).join("\n");

      case "uname":
        return "Linux portfolio 5.15.0-cyber x86_64 GNU/DaMaster";

      case "banner":
        bannerNode(raw);
        return null;

      case "matrix":
        activateMatrix();
        return "follow the white rabbit and you shall face an ending like Subaru";

      case "creds":
        return "you found the secret. but did you find the secret to life?";

      case "67":
        return "the answer to life, the universe, and everything.";

      case "ping":
        return rest.length
          ? `PING ${rest[0]} (???): 64 bytes from 127.0.0.1 — the only ping that matters is the one you control.`
          : "ping: usage: ping <host>";

      case "weather":
        return "Kolkata: 26°C, mostly sunny, 90% chance of shipping something";

      case "git":
        return rest.join(" ") === "commit"
          ? "nothing to commit — everything is already perfect (he insists)."
          : "git: not a repository you're allowed to see";

      case "sudo": {
        const sub = rest.join(" ").toLowerCase();
        if (sub === "rm matrix" || sub === "rm -rf matrix") {
          deactivateMatrix();
          return "matrix.exe terminated. reality restored.";
        }
        if (sub === "rm -rf /") return "you have deleted / — but only in your imagination.";
        if (sub.startsWith("apt install sanity")) return "sanity: package not found. error: 404 personality not found.";
        if (sub === "whoami") return "you wish you were root.";
        if (!sub) return "nice try, bish.";
        return `${sub}: permission granted (whether you deserved it is another matter)`;
      }

      case "rm":
        return rest.join(" ") === "-rf /"
          ? "nice try. but no. the universe has an undo button, and it's not for you."
          : "rm: refusing to delete anything. this is a portfolio, not a burning archive.";

      case "exit":
        return "logout — but you can't leave. none of us can.";

      case "shutdown":
      case "reboot":
        return `${cmd}: permission denied. this machine runs on pure suffering and cannot be stopped.`;

      default:
        return `command not found: ${cmd}. try 'help'.`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;
    setHistory((h) => [raw, ...h]);
    setHistIdx(-1);
    setBuf("");
    setInput("");
    setSuggests(null);
    setSuggestIdx(-1);
    const out = run(raw);
    if (out != null) push(raw, out);
  };

  const completionMatches = useCallback(() => {
    const raw = input.trimEnd();
    const parts = raw ? raw.split(/ +/) : [];
    const last = parts.length ? parts.pop() : "";
    const prev = parts.length ? parts[parts.length - 1].toLowerCase() : null;
    const fileCmds = ["cat", "open", "goto", "cd", "man"];
    let names;
    if (prev && fileCmds.includes(prev)) {
      const dir = DIR_FILES[cwd];
      names = [...(dir?.dirs || []), ...(dir?.files || [])];
    } else {
      names = COMMAND_NAMES;
    }
    return {
      parts,
      matches: [...new Set(names)].filter((n) => n.startsWith(last) && n !== last),
    };
  }, [input, cwd]);

  const insertMatch = useCallback(
    (value, withSpace = false) => {
      const raw = input.trimEnd();
      const parts = raw ? raw.split(/ +/) : [];
      if (parts.length) parts[parts.length - 1] = value;
      else parts.push(value);
      setInput(parts.join(" ") + (withSpace ? " " : ""));
      setSuggests(null);
      setSuggestIdx(-1);
      inputRef.current?.focus();
    },
    [input],
  );

  const handleTab = () => {
    if (suggests) {
      const next = (suggestIdx + 1) % suggests.length;
      setSuggestIdx(next);
      insertMatch(suggests[next]);
      return;
    }
    const { matches } = completionMatches();
    if (matches.length === 0) {
      setSuggests(null);
      return;
    }
    if (matches.length === 1) {
      insertMatch(matches[0]);
      return;
    }
    setSuggests(matches);
    setSuggestIdx(0);
    insertMatch(matches[0]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      handleTab();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      if (histIdx === -1) setBuf(input);
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const next = histIdx - 1;
      if (next >= 0) {
        setHistIdx(next);
        setInput(history[next]);
      } else {
        setHistIdx(-1);
        setInput(buf);
      }
      return;
    }
    if (e.key === "Escape") {
      setInput("");
      setSuggests(null);
      setSuggestIdx(-1);
    }
  };

  return (
    <section id="terminal" className="section section--alt terminal-section">
      <MatrixOverlay active={matrix} />

      <div className="container" style={{ position: "relative", zIndex: 3 }}>
        <div className="terminal terminal--live">
          <div className="terminal__bar">
            <span className="terminal__dot terminal__dot--r" />
            <span className="terminal__dot terminal__dot--y" />
            <span className="terminal__dot terminal__dot--g" />
            <span className="terminal__name">aritra@portfolio — bash</span>
            <span className="terminal__clock">{clock}</span>
          </div>

          <div
            className="terminal__body--live"
            ref={bodyRef}
            onClick={() => inputRef.current?.focus()}
          >
            {!cleared && banner !== null && (
              <>
                <div className="term-out term-welcome">
                  welcome to aritra@portfolio — type &apos;help&apos; for available commands.
                </div>
                <pre className="term-banner" id="term-banner">
                  {banner}
                </pre>
              </>
            )}

            {lines.map((entry) => (
              <Entry key={entry.id} entry={entry} />
            ))}

            {suggests && (
              <div className="term-suggests" role="listbox" aria-label="Completions">
                {suggests.map((m, i) => (
                  <button
                    key={m}
                    type="button"
                    className={`term-chip${i === suggestIdx ? " is-active" : ""}`}
                    role="option"
                    aria-selected={i === suggestIdx}
                    tabIndex={-1}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      insertMatch(m);
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}

            <form className="term-line term-input" onSubmit={handleSubmit}>
              <span className="term-prompt">{PROMPT}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setSuggests(null);
                  setSuggestIdx(-1);
                }}
                onKeyDown={handleKeyDown}
                placeholder="type help…"
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal input"
                aria-autocomplete="list"
              />
            </form>
          </div>
        </div>

        <div className="terminal-hint">
          <span>
            try <code>help</code>, <code>cat about</code>, <code>uptime</code>
          </span>
          <span>tab to complete · ↑/↓ for history</span>
        </div>
      </div>
    </section>
  );
};