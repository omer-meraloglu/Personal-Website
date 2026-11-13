import { orbitData } from "./orbit-data.js";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { content, languages, projectData, certificateData } from "./content.js";

const Locale = createContext(null);
const useLocale = () => useContext(Locale);
const Arrow = () => <span aria-hidden="true">↗</span>;
const External = ({ href, children, ...props }) => (
  <a href={href} target="_blank" rel="noopener" {...props}>
    {children}
  </a>
);
const CV = ({ children, className = "text-link" }) => (
  <External href="/assets/Resume.pdf" className={className}>
    {children} <span className="file-language">PDF · EN</span> <Arrow />
  </External>
);
const SectionLabel = ({ number, children }) => (
  <p className="eyebrow">
    <span>{number} /</span>
    {children}
  </p>
);

function LanguageSwitcher() {
  const { language, chooseLanguage, t } = useLocale();
  return (
    <div className="language-switcher" role="group" aria-label={t.nav.language}>
      {languages.map(({ code, label, name }) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-label={name}
          aria-pressed={language === code}
          onClick={() => chooseLanguage(code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function Header() {
  const { t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const media = matchMedia("(min-width: 1001px)");
    const resize = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", close);
    media.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      media.removeEventListener("change", resize);
    };
  }, [menuOpen]);
  return (
    <header className="site-header" id="top">
      <a className="brand" href="#top" aria-label={t.nav.home}>
        <span className="brand-symbol" aria-hidden="true">
          ö<span>m</span>
        </span>
        <span>
          ömer
          <br />
          meraloğlu<span className="brand-dot">.</span>
        </span>
      </a>
      <nav className="desktop-nav" aria-label={t.nav.open}>
        <a href="#work">
          {t.nav.work} <sup>01</sup>
        </a>
        <a href="#about">{t.nav.about}</a>
        <a href="#experience">{t.nav.journey}</a>
      </nav>
      <div className="header-actions">
        <LanguageSwitcher />
        <a className="header-contact" href="#contact">
          {t.nav.contact} <Arrow />
        </a>
        <button
          className="menu-toggle"
          ref={toggleRef}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? t.nav.close : t.nav.open}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav
        className="mobile-nav"
        id="mobile-nav"
        hidden={!menuOpen}
        aria-label={t.nav.open}
        onClick={() => setMenuOpen(false)}
      >
        <a href="#work">{t.nav.work}</a>
        <a href="#about">{t.nav.about}</a>
        <a href="#experience">{t.nav.journey}</a>
        <a href="#credentials">{t.nav.credentials}</a>
        <a href="#contact">{t.nav.contact}</a>
      </nav>
    </header>
  );
}

function Hero() {
  const { t } = useLocale();
  const containerRef = useRef(null),
    sceneRef = useRef(null);
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const current = useRef({ selected, paused });
  current.current = { selected, paused };
  useEffect(() => {
    let cancelled = false;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    setPaused(media.matches);
    const changed = (event) => setPaused(event.matches);
    media.addEventListener("change", changed);
    import("./scene.js")
      .then(({ createScene }) => {
        if (cancelled) return;
        try {
          sceneRef.current = createScene(
            containerRef.current,
            setSceneReady,
            setSelected,
          );
          sceneRef.current.setSelected(current.current.selected);
          sceneRef.current.setPaused(media.matches || current.current.paused);
          setSceneReady(true);
        } catch {
          setSceneFailed(true);
        }
      })
      .catch(() => {
        if (!cancelled) setSceneFailed(true);
      });
    return () => {
      cancelled = true;
      media.removeEventListener("change", changed);
      sceneRef.current?.destroy();
      sceneRef.current = null;
    };
  }, []);
  useEffect(() => {
    sceneRef.current?.setSelected(selected);
  }, [selected]);
  useEffect(() => {
    sceneRef.current?.setPaused(paused);
  }, [paused]);
  useEffect(() => {
    sceneRef.current?.refreshLabels();
  }, [sceneReady, t.orbit]);
  const aspect = t.orbit.aspects[selected];
  return (
    <section className="hero wrap" aria-labelledby="hero-heading">
      <div className="hero-content">
        <p className="eyebrow">
          <span className="small-cross" aria-hidden="true">
            ✳
          </span>
          {t.role}
        </p>
        <h1 id="hero-heading">
          {t.hero.first}
          <br />
          {t.hero.second} <em>{t.hero.emphasis}</em>
        </h1>
        <p className="hero-intro">{t.hero.intro}</p>
        <div className="hero-links">
          <a className="button button-dark" href="#work">
            {t.hero.work} <span aria-hidden="true">↘</span>
          </a>
          <CV>{t.hero.cv}</CV>
        </div>
        <p className="hero-note">
          <span className="location-dot" aria-hidden="true" />
          {t.hero.location}
        </p>
      </div>
      <div className="hero-art professional-orbit">
        <div className="scene-index mono">{t.orbit.title}</div>
        <div className="scene-corner corner-tl" aria-hidden="true" />
        <div className="scene-corner corner-br" aria-hidden="true" />
        <div
          className={"scene" + (sceneReady ? " is-ready" : "")}
          id="scene"
          ref={containerRef}
          role="group"
          aria-label={t.orbit.label}
        >
          <div className="orbit-fallback" aria-hidden="true">
            <i className="fallback-core" />
            {Array.from({ length: 5 }, (_, index) => (
              <i
                className="fallback-orbit"
                key={index}
                style={{ "--orbit": index }}
              />
            ))}
          </div>
          <svg className="orbit-connections" aria-hidden="true">
            {orbitData.map((form, index) => (
              <line key={form.id} data-orbit-connector={index} />
            ))}
          </svg>
          <div
            className={"orbit-markers" + (sceneFailed ? " is-static" : "")}
            role="group"
            aria-label={t.orbit.explore}
            hidden={!sceneReady && !sceneFailed}
          >
            {orbitData.map((form, index) => (
              <button
                key={form.id}
                className="orbit-marker"
                data-orbit-marker={index}
                style={{ "--sphere-color": form.color }}
                aria-label={t.orbit.aspects[index].title}
                aria-pressed={selected === index}
                aria-controls="orbit-detail"
                title={t.orbit.aspects[index].title}
                onClick={() => setSelected(index)}
                onFocus={(event) => {
                  setSelected(index);
                  if (event.currentTarget.matches(":focus-visible"))
                    setPaused(true);
                }}
              >
                {t.orbit.aspects[index].title}
              </button>
            ))}
          </div>
        </div>
        <div className="world-list" role="group" aria-label={t.orbit.explore}>
          {orbitData.map((form, index) => (
            <button
              key={form.id}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              <i aria-hidden="true" style={{ background: form.color }} />
              {t.orbit.aspects[index].title}
            </button>
          ))}
        </div>
        <div className="orbit-toolbar">
          <p className="scene-hint mono">
            {sceneFailed ? t.orbit.fallback : t.orbit.hint}
          </p>
          <div className="scene-buttons" hidden={sceneFailed}>
            <button
              className="motion-toggle"
              id="motion-toggle"
              aria-label={paused ? t.orbit.resume : t.orbit.pause}
              aria-pressed={paused}
              onClick={() => setPaused(!paused)}
            >
              {paused ? "▷" : "Ⅱ"}
            </button>
            <div
              className="rotation-controls"
              role="group"
              aria-label={t.orbit.rotate}
            >
              <button
                aria-label={t.orbit.left}
                onClick={() => sceneRef.current?.rotate(-1)}
              >
                ←
              </button>
              <button
                aria-label={t.orbit.right}
                onClick={() => sceneRef.current?.rotate(1)}
              >
                →
              </button>
              <button
                aria-label={t.orbit.up}
                onClick={() => sceneRef.current?.rotate(0, -1)}
              >
                ↑
              </button>
              <button
                aria-label={t.orbit.down}
                onClick={() => sceneRef.current?.rotate(0, 1)}
              >
                ↓
              </button>
            </div>
            <button
              className="reset-view"
              aria-label={t.orbit.reset}
              onClick={() => sceneRef.current?.reset()}
            >
              ⟲
            </button>
          </div>
        </div>
        <div
          id="orbit-detail"
          className="orbit-detail"
          role="status"
          aria-live="polite"
        >
          <span className="orbit-detail-index mono">{t.orbit.detail}</span>
          <h3>{aspect.title}</h3>
          <p>{aspect.description}</p>
        </div>
      </div>
      <div className="hero-bottom mono">
        <span>{t.hero.motto}</span>
        <a href="#work">
          {t.hero.scroll} <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}

function ProjectVisual({ project, index }) {
  const { t } = useLocale();
  const text = t.projects[project.id];
  return (
    <External
      href={project.url}
      className={"project-visual visual-" + project.id}
      aria-label={`${text.title} — ${project.image ? t.work.visit : t.work.code}`}
    >
      <div className="visual-meta mono">
        <span>
          {String(index + 1).padStart(2, "0")} / {text.visual}
        </span>
        <span className="project-open" aria-hidden="true">
          ↗
        </span>
      </div>
      {project.image ? (
        <div className="browser-frame">
          <div className="browser-chrome" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>{new URL(project.url).hostname}</span>
          </div>
          <img
            src={"/assets/projects/" + project.image}
            alt={text.alt}
            loading="lazy"
            width="1280"
            height="720"
          />
        </div>
      ) : project.id === "fraud" ? (
        <div className="fraud-chart">
          <div className="chart-head mono">
            <span>IEEE-CIS / {t.work.comparison}</span>
            <span>PR-AUC</span>
          </div>
          <div className="metric-large">
            0.8834 <small>LightGBM</small>
          </div>
          <div className="chart-row">
            <span>LightGBM</span>
            <div className="bar-track">
              <i style={{ "--bar": "88.34%" }} />
            </div>
            <b>0.8834</b>
          </div>
          <div className="chart-row baseline">
            <span>{t.work.baseline}</span>
            <div className="bar-track">
              <i style={{ "--bar": "46.48%" }} />
            </div>
            <b>0.4648</b>
          </div>
          <div className="chart-foot mono">
            <span>{t.work.transactions}</span>
            <span>{t.work.holdout}</span>
          </div>
        </div>
      ) : (
        <div className="rag-workflow" aria-hidden="true">
          <div className="document-stack">
            <div />
            <div />
            <div>
              <span>PDF</span>
              <i />
              <i />
              <i />
              <i />
              <b>↗</b>
            </div>
          </div>
          <div className="rag-path">
            <span />
            <b>✳</b>
            <span />
          </div>
          <div className="rag-answer">
            <span className="mono">{t.work.document}</span>
            <strong>
              {t.work.questions}
              <br />
              <em>{t.work.answers}</em>
            </strong>
            <div className="rag-source">
              <span>01</span>
              {t.work.retrieve}
              <i>→</i>
              <span>02</span>
              {t.work.reason}
            </div>
          </div>
        </div>
      )}
      <span className="visual-bottom mono">
        {project.id === "rag"
          ? t.work.illustration
          : project.image
            ? t.work.screenshot
            : "BigQuery → Python → Power BI"}
      </span>
    </External>
  );
}

function Projects() {
  const { t } = useLocale();
  const [filter, setFilter] = useState("all");
  const count = projectData.filter(
    (project) => filter === "all" || project.categories.includes(filter),
  ).length;
  return (
    <section
      className="work-section wrap section-space"
      id="work"
      aria-labelledby="work-heading"
    >
      <div className="section-top reveal">
        <SectionLabel number="01">{t.work.eyebrow}</SectionLabel>
        <p className="section-aside">{t.work.aside}</p>
      </div>
      <div className="work-heading-row reveal">
        <h2 id="work-heading">
          {t.work.title} <em>{t.work.emphasis}</em>
        </h2>
        <div
          className="project-filters"
          role="group"
          aria-label={t.work.filters}
        >
          {["all", "software", "data"].map((value) => (
            <button
              key={value}
              data-filter={value}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {t.work[value]}
              {value === "all" && <sup>{projectData.length}</sup>}
            </button>
          ))}
        </div>
      </div>
      <p
        className="sr-only"
        id="filter-status"
        role="status"
        aria-live="polite"
      >
        {count} {t.work.showing}
      </p>
      <div className="projects-grid">
        {projectData.map((project, index) => {
          const text = t.projects[project.id];
          return (
            <article
              key={project.id}
              className={
                "project-card reveal" +
                (project.id === "steamcast" ? " project-featured" : "")
              }
              data-category={project.categories.join(" ")}
              hidden={filter !== "all" && !project.categories.includes(filter)}
            >
              <ProjectVisual project={project} index={index} />
              <div className="project-body">
                <div className="project-caption">
                  <div>
                    <p className="project-type mono">
                      {project.id === "steamcast" && (
                        <span className="featured-label">
                          {t.work.featured} ·{" "}
                        </span>
                      )}
                      {text.type}
                    </p>
                    <h3>
                      <External href={project.url}>
                        {text.title} <Arrow />
                      </External>
                    </h3>
                  </div>
                  <span className="project-number mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="project-description">{text.description}</p>
                {text.detail && <p className="project-detail">{text.detail}</p>}
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{t.work.tags?.[tag] || tag}</span>
                  ))}
                </div>
                {project.id === "steamcast" ? (
                  <>
                    <div className="project-actions">
                      <External href={project.url}>
                        {t.work.demo} <Arrow />
                      </External>
                      <External href={project.pipeline}>
                        {t.work.pipeline} <Arrow />
                      </External>
                      <External href={project.code}>
                        {t.work.interface} <Arrow />
                      </External>
                    </div>
                  </>
                ) : (
                  <External className="project-link" href={project.url}>
                    {project.image ? t.work.visit : t.work.code} <Arrow />
                  </External>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <div className="work-footer">
        <span className="mono">{t.work.more}</span>
        <External
          className="text-link"
          href="https://github.com/omer-meraloglu"
        >
          {t.work.github} <Arrow />
        </External>
      </div>
    </section>
  );
}

function About() {
  const { t } = useLocale();
  const stacks = [
    "Python · TypeScript · React · Next.js · FastAPI · Flask · MySQL · AWS",
    "SQL · Pandas · NumPy · BigQuery · Scikit-learn · Power BI · ETL",
    t.about.aiStack,
  ];
  return (
    <section
      className="about-section section-space"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="wrap">
        <div className="section-top reveal">
          <SectionLabel number="02">{t.about.eyebrow}</SectionLabel>
          <span className="mono">{t.about.place}</span>
        </div>
        <div className="about-grid">
          <div className="portrait-composition reveal">
            <div className="portrait-frame">
              <img
                src="/assets/portrait.webp"
                alt={t.about.portrait}
                width="1024"
                height="1024"
                loading="lazy"
              />
            </div>
            <div className="portrait-caption mono">
              <span>Ömer Meraloğlu</span>
              <span>{t.about.caption}</span>
            </div>
          </div>
          <div className="about-copy reveal">
            <h2 id="about-heading">
              {t.about.first}
              <br />
              {t.about.second} <em>{t.about.emphasis}</em>
            </h2>
            <p className="about-lead">{t.about.lead}</p>
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <CV>{t.about.cv}</CV>
          </div>
        </div>
        <div className="capability-grid reveal">
          {t.about.capabilities.map((capability, index) => (
            <div key={index}>
              <span className="capability-index mono">
                0{index + 1} / {capability.label}
              </span>
              <h3>{capability.title}</h3>
              <p>{stacks[index]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const { t } = useLocale();
  return (
    <section
      className="journey-section wrap section-space"
      id="experience"
      aria-labelledby="experience-heading"
    >
      <div className="journey-heading reveal">
        <SectionLabel number="03">{t.journey.eyebrow}</SectionLabel>
        <h2 id="experience-heading">
          {t.journey.title.map((line) => (
            <React.Fragment key={line}>
              {line}
              <br />
            </React.Fragment>
          ))}
          <em>{t.journey.emphasis}</em>
        </h2>
        <CV>{t.journey.cv}</CV>
      </div>
      <div className="journey-list">
        {t.journey.entries.map((entry, index) => (
          <article key={index} className="journey-item reveal">
            <p className="journey-date mono">{entry.date}</p>
            <div>
              <p className="journey-kind mono">{entry.kind}</p>
              <h3>{entry.title}</h3>
              <p className="journey-role">{entry.role}</p>
              <p className="journey-description">{entry.description}</p>
              {entry.tags && (
                <div className="mini-tags">
                  {entry.tags.map((tag) => (
                    <span key={tag}>{t.work.tags?.[tag] || tag}</span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Credentials() {
  const { t, language } = useLocale();
  return (
    <section
      className="credentials-section section-space"
      id="credentials"
      aria-labelledby="credentials-heading"
    >
      <div className="wrap">
        <div className="section-top reveal">
          <SectionLabel number="04">{t.credentials.eyebrow}</SectionLabel>
          <span className="section-aside">{t.credentials.aside}</span>
        </div>
        <h2 className="reveal" id="credentials-heading">
          {t.credentials.title} <em>{t.credentials.emphasis}</em>
        </h2>
        <div className="credentials-grid">
          {certificateData.map((certificate, index) => (
            <External
              key={certificate.file}
              className="credential reveal"
              href={"/assets/certificates/" + certificate.file}
              aria-label={`${certificate.title} — ${t.credentials.open}`}
            >
              <span
                className={"credential-mark mark-" + certificate.color}
                aria-hidden="true"
              >
                {certificate.mark}
              </span>
              <div>
                <span className="mono">
                  {certificate.issuer} · {certificate.year}
                </span>
                <h3 lang="en">{certificate.title}</h3>
                <p>
                  {certificate.hours
                    ? `${certificate.hours}${language === "en" ? "-" : " "}${t.credentials.hour} · ${t.credentials.completion}`
                    : index === 2
                      ? t.credentials.competency
                      : t.credentials.course}
                </p>
              </div>
              <span className="credential-arrow" aria-hidden="true">
                ↗
              </span>
            </External>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { t, language } = useLocale();
  const [copyState, setCopyState] = useState("idle");
  const [localTime, setLocalTime] = useState("UTC +03:00");
  useEffect(() => {
    const update = () =>
      setLocalTime(
        new Intl.DateTimeFormat(language === "en" ? "en-GB" : language, {
          timeZone: "Europe/Istanbul",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, [language]);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("omer-meraloglu@hotmail.com");
      setCopyState("done");
    } catch {
      setCopyState("failed");
    }
  }
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="wrap">
        <div className="section-top">
          <SectionLabel number="05">{t.contact.eyebrow}</SectionLabel>
          <span className="contact-asterisk" aria-hidden="true">
            ✳
          </span>
        </div>
        <div className="contact-main reveal">
          <h2 id="contact-heading">
            {t.contact.first}
            <br />
            {t.contact.second} <em>{t.contact.emphasis}</em>
          </h2>
          <p>{t.contact.intro}</p>
          <a className="contact-cta" href="mailto:omer-meraloglu@hotmail.com">
            {t.contact.cta} <Arrow />
          </a>
          <div className="email-line">
            <a href="mailto:omer-meraloglu@hotmail.com">
              omer-meraloglu@hotmail.com
            </a>
            <button
              className="copy-email"
              aria-label={t.contact.copyLabel}
              onClick={copyEmail}
            >
              {copyState === "done"
                ? t.contact.copied + " ✓"
                : copyState === "failed"
                  ? t.contact.failed
                  : t.contact.copy + " ↗"}
            </button>
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {copyState === "done"
              ? t.contact.success
              : copyState === "failed"
                ? t.contact.failure
                : ""}
          </p>
        </div>
        <div className="contact-bottom">
          <span className="mono">
            {t.contact.based}
            <br />
            {localTime} · {t.contact.local}
          </span>
          <div className="footer-socials">
            <External href="https://github.com/omer-meraloglu">
              GitHub <Arrow />
            </External>
            <External href="https://www.linkedin.com/in/omer-meraloglu/">
              LinkedIn <Arrow />
            </External>
            <CV>CV</CV>
          </div>
          <a className="back-top" href="#top" aria-label={t.contact.back}>
            ↑
          </a>
        </div>
      </div>
    </section>
  );
}

function usePageEffects(language) {
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    if (!media.matches && "IntersectionObserver" in window) {
      document.documentElement.classList.add("js-motion");
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          }),
        { threshold: 0.03 },
      );
      document
        .querySelectorAll(".reveal")
        .forEach((element) => observer.observe(element));
    }
    let queued = false,
      frame;
    const scroll = () => {
      if (queued) return;
      queued = true;
      frame = requestAnimationFrame(() => {
        const range = document.documentElement.scrollHeight - innerHeight;
        document.querySelector(".scroll-progress").style.width =
          `${range > 0 ? (scrollY / range) * 100 : 0}%`;
        queued = false;
      });
    };
    addEventListener("scroll", scroll, { passive: true });
    return () => {
      observer?.disconnect();
      removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, [language]);
  useEffect(() => {
    if (location.hash)
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
  }, []);
}

export default function App() {
  const [language, setLanguage] = useState("en");
  const t = content[language];
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("lang");
    let saved;
    try {
      saved = localStorage.getItem("portfolio-language");
    } catch {
      /* Browsing without storage keeps English. */
    }
    const initial = query || saved;
    if (Object.hasOwn(content, initial)) setLanguage(initial);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `Ömer Meraloğlu — ${t.role}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.meta);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", document.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", t.meta);
  }, [language, t]);
  function chooseLanguage(code) {
    setLanguage(code);
    try {
      localStorage.setItem("portfolio-language", code);
    } catch {
      /* Language switching also works without storage. */
    }
    const url = new URL(location.href);
    if (code === "en") url.searchParams.delete("lang");
    else url.searchParams.set("lang", code);
    history.replaceState(null, "", url.pathname + url.search + url.hash);
  }
  usePageEffects(language);
  return (
    <Locale.Provider value={{ language, chooseLanguage, t }}>
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main id="main">
        <Hero />
        <div className="discipline-strip" aria-hidden="true">
          <div className="wrap">
            {t.disciplines.map((discipline, index) => (
              <React.Fragment key={index}>
                <span>{discipline}</span>
                {index < 3 && <b>✳</b>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <Projects />
        <About />
        <Journey />
        <Credentials />
        <Contact />
      </main>
      <footer className="site-footer wrap mono">
        <span>© {new Date().getFullYear()} Ömer Meraloğlu</span>
        <span>{t.footer.built}</span>
        <span>
          {t.footer.thanks} <span aria-hidden="true">✳</span>
        </span>
      </footer>
    </Locale.Provider>
  );
}
