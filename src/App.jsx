import { useEffect, useMemo, useRef, useState } from "react";
import { projects, services, socialLinks } from "./content.js";

const Arrow = ({ diagonal = false, className = "", ...props }) => (
  <svg
    className={`arrow ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <path
      d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"}
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

function Asterisk({ className = "" }) {
  return (
    <svg
      className={`asterisk ${className}`}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <path
        d="M50 4v92M4 50h92M17.5 17.5l65 65m0-65-65 65"
        fill="none"
        stroke="currentColor"
        strokeWidth="15"
      />
    </svg>
  );
}

function NepalClock() {
  const [time, setTime] = useState("UTC +05:45");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kathmandu",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()) + " NPT",
      );
    tick();
    const timer = setInterval(tick, 10000);
    return () => clearInterval(timer);
  }, []);
  return <span className="clock">{time}</span>;
}

// A small parametric sculpture: every visible rib is an actual projected 3D curve.
function Sculpture() {
  const [variation, setVariation] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  const ribs = useMemo(() => {
    const result = [];
    const tilt = 0.88 + pointer.y * 0.22;
    const turn = -0.48 + pointer.x * 0.3 + variation * 0.4;
    const project = (x, y, z) => {
      const yy = y * Math.cos(tilt) - z * Math.sin(tilt);
      const zz = y * Math.sin(tilt) + z * Math.cos(tilt);
      return [
        260 + (x * Math.cos(turn) - yy * Math.sin(turn)),
        255 + (x * Math.sin(turn) + yy * Math.cos(turn)),
        zz,
      ];
    };
    for (let i = 0; i < 100; i++) {
      const u = (i / 100) * Math.PI * 2;
      const radius = 151 + (variation % 3 === 1 ? 13 * Math.cos(3 * u) : 0);
      const tube = 63 + (variation % 3 === 2 ? 14 * Math.sin(2 * u) : 0);
      const points = [];
      for (let j = 0; j <= 48; j++) {
        const v = (j / 48) * Math.PI * 2;
        points.push(
          project(
            (radius + tube * Math.cos(v)) * Math.cos(u),
            (radius + tube * Math.cos(v)) * Math.sin(u),
            tube * Math.sin(v),
          ),
        );
      }
      const light = 48 + Math.sin(u - 0.5) * 9;
      result.push({
        d:
          points
            .map(
              (p, j) => `${j ? "L" : "M"}${p[0].toFixed(2)},${p[1].toFixed(2)}`,
            )
            .join(" ") + "Z",
        depth: project(radius * Math.cos(u), radius * Math.sin(u), 0)[2],
        fill: `hsl(10 86% ${light}%)`,
      });
    }
    return result.sort((a, b) => a.depth - b.depth);
  }, [pointer, variation]);
  const move = (event) => {
    if (
      event.pointerType === "touch" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    const next = {
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    };
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => setPointer(next));
  };
  return (
    <div
      className="sculpture"
      onPointerMove={move}
      onPointerLeave={() => {
        cancelAnimationFrame(frame.current);
        setPointer({ x: 0, y: 0 });
      }}
    >
      <div className="sculpture-cross cross-one" aria-hidden="true">
        +
      </div>
      <div className="sculpture-cross cross-two" aria-hidden="true">
        +
      </div>
      <svg
        className="sculpture-svg"
        viewBox="0 0 520 510"
        role="img"
        aria-label="An orange sculptural loop made of a hundred fine ribs"
      >
        <ellipse
          cx="275"
          cy="463"
          rx="119"
          ry="9"
          fill="#252016"
          opacity=".07"
        />
        <g stroke="#a62b18" strokeWidth="0.75" strokeLinejoin="round">
          {ribs.map((rib, i) => (
            <path key={i} d={rib.d} fill={rib.fill} />
          ))}
        </g>
      </svg>
      <div className="sculpture-caption">
        <span>FIG. 0{(variation % 3) + 1} — FORM & FEELING</span>
        <button
          onClick={() => setVariation((v) => v + 1)}
          aria-label="Change sculpture shape"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M19 8a8 8 0 1 0 1 7M19 3v5h-5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <span>Play a little</span>
        </button>
      </div>
    </div>
  );
}

function ApexPreview() {
  return (
    <div className="project-art apex-art" aria-hidden="true">
      <div className="apex-sheet">
        <div className="mock-top">
          <span className="apex-logo">
            a<span>↗</span>
          </span>
          <span>apex / interface essentials</span>
          <span>V.01</span>
        </div>
        <div className="apex-title">
          Small details.
          <br />
          <span>Better interfaces.</span>
        </div>
        <div className="apex-components">
          <div className="apex-type">
            <small>01 / TYPOGRAPHY</small>
            <span>
              Aa<span className="type-dot">.</span>
            </span>
            <div>Space to make your mark.</div>
          </div>
          <div className="apex-controls">
            <small>02 / ELEMENTS</small>
            <div className="mock-button">
              Make it happen <span>↗</span>
            </div>
            <div className="control-row">
              <span className="mock-toggle" />
              <span className="mock-check">✓</span>
              <span className="mock-plus">+</span>
            </div>
            <div className="mock-swatches">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
        <div className="mock-bottom">
          <span>A considered component study</span>
          <span>Built to belong together. ↗</span>
        </div>
      </div>
      <span className="art-corner">SYSTEMS, WITH SOUL.</span>
    </div>
  );
}

function ChronosPreview() {
  return (
    <div className="project-art chronos-art" aria-hidden="true">
      <span className="chronos-wordmark">
        chronos<span>®</span>
      </span>
      <span className="chronos-caption">SOUND, GIVEN SHAPE.</span>
      <div className="record">
        <div className="record-center">
          <Asterisk />
        </div>
      </div>
      <div className="audio-player">
        <div>
          <span className="audio-track">Somewhere, slower.</span>
          <span className="audio-artist">A study in sound & motion</span>
        </div>
        <span className="audio-play">▶</span>
        <div className="waveform">
          {Array.from({ length: 39 }, (_, i) => (
            <i
              key={i}
              style={{
                height: `${10 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.3)) * 26}px`,
              }}
            />
          ))}
        </div>
        <span className="audio-time">
          01:24 <span>/ 04:08</span>
        </span>
      </div>
    </div>
  );
}

function VervePreview() {
  return (
    <div className="project-art verve-art" aria-hidden="true">
      <div className="verve-site">
        <div className="verve-nav">
          <span>verve.</span>
          <span>Objects for everyday.</span>
          <span>Bag (0) ↗</span>
        </div>
        <div className="verve-grid">
          <div className="verve-copy">
            <small>LESS, BUT CONSIDERED.</small>
            <span>
              Good things.
              <br />
              <em>Quietly made.</em>
            </span>
            <div>
              Explore the collection <span>↗</span>
            </div>
          </div>
          <div className="vase-scene">
            <div className="vase-shadow" />
            <div className="vase">
              <div className="vase-opening" />
            </div>
            <span>THE EVERYDAY VESSEL — 01</span>
          </div>
        </div>
        <div className="verve-bottom">
          <span>Natural forms. Everyday rituals.</span>
          <span>Designed to stay.</span>
        </div>
      </div>
    </div>
  );
}

const previews = {
  apex: ApexPreview,
  chronos: ChronosPreview,
  verve: VervePreview,
};

function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
      opener?.focus({ preventScroll: true });
    };
  }, []);
  const Preview = previews[project.id];
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="dialog-close"
        onClick={onClose}
        aria-label="Close project details"
      >
        ×
      </button>
      <Preview />
      <div className="dialog-body">
        <span className="eyebrow">{project.number} / INDEPENDENT CONCEPT</span>
        <h2 id="project-title">{project.title}</h2>
        <p className="dialog-intro">{project.description}</p>
        <div className="dialog-details">
          <div>
            <h3>The idea</h3>
            <p>{project.idea}</p>
          </div>
          <div>
            <h3>The approach</h3>
            <p>{project.approach}</p>
          </div>
        </div>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <p className="concept-note">
          An interface exploration from my portfolio. The artwork is a concept
          preview, not a live client product.
        </p>
        <a
          className="text-link"
          href="mailto:sijankoirala.official@gmail.com?subject=Let%E2%80%99s%20build%20something"
          onClick={onClose}
        >
          Have something like this in mind? <Arrow diagonal />
        </a>
      </div>
    </dialog>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [copyState, setCopyState] = useState("Copy email");
  const [activeSection, setActiveSection] = useState("");
  const copyTimer = useRef(null);
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -45% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        document.querySelector(".menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("sijankoirala.official@gmail.com");
      setCopyState("Email copied ✓");
    } catch {
      setCopyState("Use the email link ↗");
    }
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState("Copy email"), 3500);
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Sijan Koirala home">
          sijan<span className="brand-star">✳</span>
        </a>
        <span className="header-role">
          INDEPENDENT
          <br />
          WEB DEVELOPER
        </span>
        <nav
          id="navigation"
          className={menuOpen ? "navigation is-open" : "navigation"}
          aria-label="Main navigation"
        >
          {[
            ["work", "Work"],
            ["about", "About"],
            ["services", "What I do"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
              <span className="nav-dot" />
            </a>
          ))}
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Let’s talk <Arrow diagonal />
          </a>
        </nav>
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <main id="main">
        <section
          className="hero page-width"
          id="top"
          aria-labelledby="hero-title"
        >
          <div className="hero-topline">
            <span>
              <i className="status-dot" /> OPEN FOR COLLABORATIONS
            </span>
            <span>
              Biratnagar, NEPAL <span className="small-star">✳</span>{" "}
              <NepalClock />
            </span>
          </div>
          <div className="hero-main">
            <div className="hero-copy">
              <span className="hero-intro">HEY, I’M SIJAN KOIRALA.</span>
              <h1 id="hero-title">
                A little craft.
                <br />A lot of{" "}
                <span className="code-word">
                  code
                  <svg
                    viewBox="0 0 400 25"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 16Q180-5 395 10M38 23Q200 4 364 19"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                  </svg>
                </span>
                <span className="orange">.</span>
              </h1>
              <div className="hero-bottom">
                <p>
                  I’m a web developer who cares about how things <em>feel.</em>{" "}
                  Turning good ideas into websites with character, clarity, and
                  a purpose.
                </p>
                <a
                  href="#work"
                  className="circle-link"
                  aria-label="Explore selected work"
                >
                  <Arrow />
                  <span>
                    SCROLL TO
                    <br />
                    EXPLORE
                  </span>
                </a>
              </div>
            </div>
            <Sculpture />
          </div>
          <div className="hero-footnote">
            <span>GOOD DESIGN. CLEAN CODE. A HUMAN TOUCH.</span>
            <span>
              SCROLL A LITTLE <span>↓</span>
            </span>
          </div>
        </section>

        <div className="discipline-strip" aria-label="Focus areas">
          <span>Creative development</span>
          <Asterisk />
          <span>Thoughtful interfaces</span>
          <Asterisk />
          <span>Built for the web</span>
          <Asterisk />
        </div>

        <section
          className="work-section page-width section-space"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-top">
            <span className="eyebrow">01 / SELECTED EXPLORATIONS</span>
            <span className="section-aside">
              A few ideas, brought into focus.
            </span>
          </div>
          <div className="section-heading">
            <h2 id="work-title">
              Pixels with
              <br />
              <span className="serif">a point of view.</span>
            </h2>
            <p>
              A selection of interface concepts exploring systems, sound, and
              everyday objects.
              <br />
              <span>Different directions. The same care.</span>
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project) => {
              const Preview = previews[project.id];
              return (
                <article
                  key={project.id}
                  className={`project project-${project.id}`}
                >
                  <button
                    className="project-open"
                    onClick={() => setActiveProject(project)}
                    aria-label={`Explore ${project.title}`}
                  >
                    <Preview />
                    <span className="project-hover">
                      Explore the idea <Arrow diagonal />
                    </span>
                  </button>
                  <div className="project-info">
                    <div>
                      <span className="project-number">/{project.number}</span>
                      <h3>
                        <button onClick={() => setActiveProject(project)}>
                          {project.title}
                        </button>
                      </h3>
                      <p>{project.subtitle}</p>
                    </div>
                    <button
                      className="project-arrow"
                      aria-label={`Read about ${project.title}`}
                      onClick={() => setActiveProject(project)}
                    >
                      <Arrow diagonal />
                    </button>
                  </div>
                  <div className="project-meta">
                    <span>{project.category}</span>
                    <span>CONCEPT STUDY</span>
                  </div>
                </article>
              );
            })}
          </div>
          <a
            className="text-link github-link"
            href="https://github.com/Sijankoirala09"
            target="_blank"
            rel="noreferrer"
          >
            A little more under the hood. Find me on GitHub <Arrow diagonal />
          </a>
        </section>

        <section
          className="about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="page-width about-inner">
            <div className="about-photo">
              <div className="photo-frame">
                <img
                  src="/portrait.jpg"
                  width="460"
                  height="460"
                  loading="lazy"
                  alt="Sijan Koirala, web developer based in Nepal"
                />
              </div>
              <span className="photo-sticker">
                A PERSON,
                <br />
                <em>not a template.</em>
                <Asterisk />
              </span>
              <div className="photo-caption">
                <span>SIJAN KOIRALA</span>
                <span>27.7172° N, 85.3240° E</span>
              </div>
            </div>
            <div className="about-copy">
              <span className="eyebrow">02 / THE PERSON BEHIND THE PIXELS</span>
              <h2 id="about-title">
                Curious mind.
                <br />
                <span className="serif">Careful hands.</span>
              </h2>
              <p className="about-lead">
                Hi, I’m Sijan. A website developer & frontend engineer, based in
                Biratnagar, Nepal.
              </p>
              <p>
                I like the space where design meets development. A layout that
                breathes. A button that feels right. A website that makes sense
                on the phone in your hand.
              </p>
              <p>
                I build with React, modern CSS, and Node.js, bringing the visual
                details and the code together from the very first sketch.
              </p>
              <div className="about-signoff">
                <span className="signature">Sijan.</span>
                <span>
                  BASED IN NEPAL.
                  <br />
                  BUILDING FOR THE WEB.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="services-section page-width section-space"
          id="services"
          aria-labelledby="services-title"
        >
          <div className="section-top">
            <span className="eyebrow">03 / WHAT I BRING TO THE TABLE</span>
            <Asterisk />
          </div>
          <div className="section-heading">
            <h2 id="services-title">
              From “what if”
              <br />
              <span className="serif">to live on the web.</span>
            </h2>
            <p>
              Have an idea, a design, or a website that needs a fresh pair of
              eyes? Here’s where I can help.
            </p>
          </div>
          <div className="services-list">
            {services.map((service, index) => (
              <details
                className="service"
                key={service.title}
                open={index === 0}
              >
                <summary>
                  <span className="service-number">0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <span className="service-category">{service.category}</span>
                  <span className="service-toggle" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="service-content">
                  <p>{service.description}</p>
                  <ul>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
          <div className="toolbox">
            <span className="eyebrow">TOOLS OF THE TRADE</span>
            <div>
              {[
                "React",
                "JavaScript",
                "TypeScript",
                "Node.js",
                "CSS",
                "Git & GitHub",
              ].map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>
        </section>

        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="page-width">
            <div className="contact-top">
              <span className="eyebrow">
                04 / YOUR NEXT GOOD IDEA STARTS HERE
              </span>
              <span>
                <i className="status-dot" /> LET’S MAKE SOMETHING
              </span>
            </div>
            <a
              className="contact-heading"
              href="mailto:sijankoirala.official@gmail.com"
            >
              <h2 id="contact-title">
                Got a good
                <br />
                <span className="serif">feeling?</span>
              </h2>
              <Arrow diagonal />
            </a>
            <div className="contact-bottom">
              <p>
                A new website. An interesting collaboration.
                <br />
                Or just a hello. I’d love to hear it.
              </p>
              <div className="email-block">
                <a href="mailto:sijankoirala.official@gmail.com">
                  sijankoirala.official@gmail.com <Arrow diagonal />
                </a>
                <button onClick={copyEmail}>
                  <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <rect
                      x="6"
                      y="6"
                      width="9"
                      height="9"
                      rx="1"
                      stroke="currentColor"
                    />
                    <path d="M11 3H3v8" stroke="currentColor" />
                  </svg>
                  <span aria-live="polite">{copyState}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer page-width">
        <a className="footer-brand" href="#top">
          sijan<span>✳</span>
        </a>
        <span className="footer-credit">
          © 2026 SIJAN KOIRALA
          <br />
          MADE WITH INTENTION, IN NEPAL.
        </span>
        <div className="social-links">
          {socialLinks.map((link) => (
            <a
              href={link.href}
              key={link.label}
              target="_blank"
              rel="noreferrer"
            >
              {link.label} <Arrow diagonal />
            </a>
          ))}
        </div>
        <a className="back-top" href="#top" aria-label="Back to top">
          ↑
        </a>
      </footer>
      {activeProject && (
        <ProjectDialog
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
}

export default App;
