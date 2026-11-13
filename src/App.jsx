import React, { useEffect, useRef, useState } from "react";

function usePageEffects() {
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
        { threshold: 0.05 },
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
    // A direct anchor visit is resolved after React has mounted its sections.
    if (location.hash)
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
    return () => {
      observer?.disconnect();
      document.documentElement.classList.remove("js-motion");
      removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, []);
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        document.querySelector(".menu-toggle")?.focus();
      }
    };
    const media = matchMedia("(min-width: 641px)");
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
      <a aria-label="Ömer Meraloğlu home" className="brand" href="#top">
        <span aria-hidden="true" className="brand-symbol">
          ö<span>m</span>
        </span>
        <span>
          ömer
          <br />
          meraloğlu<span className="brand-dot">.</span>
        </span>
      </a>
      <nav aria-label="Main navigation" className="desktop-nav">
        <a href="#work">
          Selected work <span>04</span>
        </a>
        <a href="#about">About</a>
        <a href="#experience">Journey</a>
      </nav>
      <div className="header-actions">
        <a className="header-contact" href="#contact">
          Let’s talk <span aria-hidden="true">↗</span>
        </a>
        <button
          aria-controls="mobile-nav"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen(!menuOpen)}
          className="menu-toggle"
        >
          <span></span>
          <span></span>
        </button>
      </div>
      <nav
        aria-label="Mobile navigation"
        className="mobile-nav"
        hidden={!menuOpen}
        id="mobile-nav"
        onClick={() => setMenuOpen(false)}
      >
        <a href="#work">Selected work</a>
        <a href="#about">About</a>
        <a href="#experience">Journey</a>
        <a href="#credentials">Credentials</a>
        <a href="assets/Resume.pdf" rel="noopener" target="_blank">
          View CV ↗
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const containerRef = useRef(null),
    sceneRef = useRef(null);
  const [mode, setMode] = useState("code");
  const [paused, setPaused] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const current = useRef({ mode, paused });
  current.current = { mode, paused };
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
          sceneRef.current = createScene(containerRef.current, (ready) =>
            setSceneReady(ready),
          );
          sceneRef.current.setMode(current.current.mode);
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
    sceneRef.current?.setMode(mode);
  }, [mode]);
  useEffect(() => {
    sceneRef.current?.setPaused(paused);
  }, [paused]);
  return (
    <section aria-labelledby="hero-heading" className="hero wrap">
      <div className="hero-content">
        <p className="eyebrow">
          <span aria-hidden="true" className="small-cross">
            ✳
          </span>{" "}
          SOFTWARE ENGINEER &amp; DATA SCIENTIST
        </p>
        <h1 id="hero-heading">
          Engineering
          <br />
          what’s <em>next.</em>
        </h1>
        <p className="hero-intro">
          I’m Ömer. I turn complex problems into
          <br className="desktop-break" /> thoughtful software, useful data, and
          practical AI.
        </p>
        <div className="hero-links">
          <a className="button button-dark" href="#work">
            Explore my work <span aria-hidden="true">↘</span>
          </a>
          <a
            className="text-link"
            href="assets/Resume.pdf"
            rel="noopener"
            target="_blank"
          >
            View my CV <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="hero-note">
          <span aria-hidden="true" className="location-dot"></span> Based in
          Istanbul. Building beyond borders.
        </div>
      </div>
      <div className="hero-art">
        <div aria-hidden="true" className="scene-corner corner-tl"></div>
        <div aria-hidden="true" className="scene-corner corner-br"></div>
        <div aria-hidden="true" className="scene-index mono">
          FIG. 01 — A CONNECTED MIND
        </div>
        <div
          aria-label="Interactive metallic 3D knot representing connected ideas. Drag to rotate, or use the view and rotation controls below."
          className={"scene" + (sceneReady ? " is-ready" : "")}
          ref={containerRef}
          id="scene"
          role="img"
        >
          <div aria-hidden="true" className="scene-fallback">
            <div className="fallback-ring ring-one"></div>
            <div className="fallback-ring ring-two"></div>
            <div className="fallback-ring ring-three"></div>
          </div>
        </div>
        <span aria-hidden="true" className="scene-label label-code mono">
          &lt; CODE /&gt;
        </span>
        <span aria-hidden="true" className="scene-label label-data mono">
          {"{ DATA }"}
        </span>
        <span aria-hidden="true" className="scene-label label-ai mono">
          [ AI ]
        </span>
        <div className="scene-footer">
          <span className="mono scene-hint">
            {sceneFailed ? "CODE × DATA × AI" : "↔ DRAG TO EXPLORE"}
          </span>
          <button
            aria-label={paused ? "Resume 3D animation" : "Pause 3D animation"}
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
            className="motion-toggle"
            id="motion-toggle"
            hidden={sceneFailed}
          >
            {paused ? "▷" : "Ⅱ"}
          </button>
        </div>
        <div aria-label="Choose 3D form" className="scene-modes" role="group">
          <button
            data-mode="code"
            aria-pressed={mode === "code"}
            onClick={() => setMode("code")}
            hidden={sceneFailed}
          >
            01 <span>Code</span>
          </button>
          <button
            data-mode="data"
            aria-pressed={mode === "data"}
            onClick={() => setMode("data")}
            hidden={sceneFailed}
          >
            02 <span>Data</span>
          </button>
          <button
            data-mode="ai"
            aria-pressed={mode === "ai"}
            onClick={() => setMode("ai")}
            hidden={sceneFailed}
          >
            03 <span>AI</span>
          </button>
        </div>
        <div
          aria-label="Rotate 3D form"
          className="rotation-controls"
          role="group"
        >
          <button
            data-rotate="-1"
            aria-label="Rotate 3D form left"
            onClick={() => sceneRef.current?.rotate(-1)}
            hidden={sceneFailed}
          >
            ←
          </button>
          <button
            data-rotate="1"
            aria-label="Rotate 3D form right"
            onClick={() => sceneRef.current?.rotate(1)}
            hidden={sceneFailed}
          >
            →
          </button>
        </div>
      </div>
      <div className="hero-bottom mono">
        <span>SOFTWARE WITH PURPOSE. DATA WITH DIRECTION.</span>
        <a href="#work">
          SCROLL TO DISCOVER <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}

function Projects() {
  const [filter, setFilter] = useState("all");
  return (
    <section
      aria-labelledby="work-heading"
      className="work-section wrap section-space"
      id="work"
    >
      <div className="section-top reveal">
        <p className="eyebrow">
          <span>01 /</span> SELECTED WORK
        </p>
        <p className="section-aside">
          A few things I’ve built.
          <br />
          Different challenges. The same curiosity.
        </p>
      </div>
      <div className="work-heading-row reveal">
        <h2 id="work-heading">
          Ideas, made <em>real.</em>
        </h2>
        <div
          aria-label="Filter projects"
          className="project-filters"
          role="group"
        >
          <button
            data-filter="all"
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All work <sup>4</sup>
          </button>
          <button
            data-filter="software"
            aria-pressed={filter === "software"}
            onClick={() => setFilter("software")}
          >
            Software
          </button>
          <button
            data-filter="data"
            aria-pressed={filter === "data"}
            onClick={() => setFilter("data")}
          >
            Data &amp; AI
          </button>
        </div>
      </div>
      <p
        aria-live="polite"
        className="sr-only"
        id="filter-status"
        role="status"
      >{`Showing ${filter === "all" ? 4 : 3} ${filter === "all" ? "" : filter === "software" ? "software " : "data and AI "}projects.`}</p>
      <div className="projects-grid">
        <article
          className="project-card reveal"
          data-category="software data"
          hidden={filter !== "all" && !["software", "data"].includes(filter)}
        >
          <a
            aria-label="Visit First Light, the AI-assisted weekday news briefing"
            className="project-visual visual-light"
            href="https://first-light-briefing-one.vercel.app/"
            rel="noopener"
            target="_blank"
          >
            <div className="visual-meta mono">
              <span>01 / AUTOMATION × EDITORIAL</span>
              <span aria-hidden="true" className="project-open">
                ↗
              </span>
            </div>
            <div aria-hidden="true" className="brief-orbit"></div>
            <div className="browser-frame">
              <div aria-hidden="true" className="browser-chrome">
                <i></i>
                <i></i>
                <i></i>
                <span>first-light-briefing-one.vercel.app</span>
              </div>
              <img
                alt="First Light’s warm editorial layout with a morning briefing and source-linked news"
                height="712"
                loading="lazy"
                src="assets/projects/first-light.webp"
                width="1265"
              />
            </div>
            <span className="visual-bottom mono">
              THE WORLD. IN FIVE MINUTES.
            </span>
          </a>
          <div className="project-caption">
            <div>
              <p className="project-type mono">
                AI AUTOMATION · WEB APPLICATION
              </p>
              <h3>
                <a
                  href="https://first-light-briefing-one.vercel.app/"
                  rel="noopener"
                  target="_blank"
                >
                  First Light <span aria-hidden="true">↗</span>
                </a>
              </h3>
            </div>
            <span className="project-number mono">01</span>
          </div>
          <p className="project-description">
            An AI-assisted, five-minute weekday news briefing. Automated
            research and publishing, direct source links, and a growing edition
            archive turn the daily news cycle into a calmer reading ritual.
          </p>
          <div className="project-tags">
            <span>Next.js</span>
            <span>AI workflows</span>
            <span>Vercel</span>
            <a
              href="https://first-light-briefing-one.vercel.app/"
              rel="noopener"
              target="_blank"
            >
              Visit website ↗
            </a>
          </div>
        </article>
        <article
          className="project-card reveal"
          data-category="data"
          hidden={filter !== "all" && !["data"].includes(filter)}
        >
          <a
            aria-label="Explore the IEEE-CIS fraud detection project on GitHub"
            className="project-visual visual-fraud"
            href="https://github.com/omer-meraloglu/fraud_detection"
            rel="noopener"
            target="_blank"
          >
            <div className="visual-meta mono">
              <span>02 / FINDING THE SIGNAL</span>
              <span aria-hidden="true" className="project-open">
                ↗
              </span>
            </div>
            <div className="fraud-chart">
              <div className="chart-head mono">
                <span>IEEE-CIS / MODEL COMPARISON</span>
                <span>PR-AUC</span>
              </div>
              <div className="metric-large">
                0.8834<span>LightGBM</span>
              </div>
              <div className="chart-row">
                <span>LightGBM</span>
                <div className="bar-track">
                  <i style={{ "--bar": "88.34%" }}></i>
                </div>
                <b>0.8834</b>
              </div>
              <div className="chart-row baseline">
                <span>Baseline</span>
                <div className="bar-track">
                  <i style={{ "--bar": "46.48%" }}></i>
                </div>
                <b>0.4648</b>
              </div>
              <div className="chart-foot mono">
                <span>~590K TRANSACTIONS</span>
                <span>STRATIFIED 80/20 HOLD-OUT</span>
              </div>
            </div>
            <span className="visual-bottom mono">
              FROM RAW DATA TO BETTER DECISIONS.
            </span>
          </a>
          <div className="project-caption">
            <div>
              <p className="project-type mono">
                MACHINE LEARNING · DATA ENGINEERING
              </p>
              <h3>
                <a
                  href="https://github.com/omer-meraloglu/fraud_detection"
                  rel="noopener"
                  target="_blank"
                >
                  Fraud, in focus <span aria-hidden="true">↗</span>
                </a>
              </h3>
            </div>
            <span className="project-number mono">02</span>
          </div>
          <p className="project-description">
            A collaborative fraud-detection study spanning BigQuery feature
            engineering, Python modeling, and Power BI. Compared logistic
            regression with LightGBM on highly imbalanced transaction data.
          </p>
          <div className="project-tags">
            <span>Python</span>
            <span>BigQuery</span>
            <span>LightGBM</span>
            <a
              href="https://github.com/omer-meraloglu/fraud_detection"
              rel="noopener"
              target="_blank"
            >
              Explore code ↗
            </a>
          </div>
        </article>
        <article
          className="project-card reveal"
          data-category="software"
          hidden={filter !== "all" && !["software"].includes(filter)}
        >
          <a
            aria-label="Visit Story Seeds, an interactive commemorative storytelling project"
            className="project-visual visual-seeds"
            href="https://storyseeds.vercel.app/"
            rel="noopener"
            target="_blank"
          >
            <div className="visual-meta mono">
              <span>03 / PHYSICAL MEETS DIGITAL</span>
              <span aria-hidden="true" className="project-open">
                ↗
              </span>
            </div>
            <div className="browser-frame seeds-frame">
              <div aria-hidden="true" className="browser-chrome">
                <i></i>
                <i></i>
                <i></i>
                <span>storyseeds.vercel.app</span>
              </div>
              <img
                alt="Story Seeds’ interactive website connecting 22 seed capsules to the stories of 22 nations"
                height="712"
                loading="lazy"
                src="assets/projects/story-seeds.webp"
                width="1265"
              />
            </div>
            <span className="visual-bottom mono">
              22 SEEDS. 22 STORIES. ONE SHARED FUTURE.
            </span>
          </a>
          <div className="project-caption">
            <div>
              <p className="project-type mono">
                INTERACTIVE EXPERIENCE · DIGITAL STORYTELLING
              </p>
              <h3>
                <a
                  href="https://storyseeds.vercel.app/"
                  rel="noopener"
                  target="_blank"
                >
                  Story Seeds <span aria-hidden="true">↗</span>
                </a>
              </h3>
            </div>
            <span className="project-number mono">03</span>
          </div>
          <p className="project-description">
            Physical seed capsules become a gateway to digital history. I
            engineered the interactive platform for a commemorative concept
            honoring the Korean War’s 22 UN Sending States, and contributed to
            its product development.
          </p>
          <div className="project-tags">
            <span>Interactive web</span>
            <span>3D</span>
            <span>Product development</span>
            <a
              href="https://storyseeds.vercel.app/"
              rel="noopener"
              target="_blank"
            >
              Visit website ↗
            </a>
          </div>
        </article>
        <article
          className="project-card reveal"
          data-category="data software"
          hidden={filter !== "all" && !["data", "software"].includes(filter)}
        >
          <a
            aria-label="Explore Agentic RAG on GitHub"
            className="project-visual visual-rag"
            href="https://github.com/omer-meraloglu/agentic_rag"
            rel="noopener"
            target="_blank"
          >
            <div className="visual-meta mono">
              <span>04 / KNOWLEDGE, CONNECTED</span>
              <span aria-hidden="true" className="project-open">
                ↗
              </span>
            </div>
            <div aria-hidden="true" className="rag-workflow">
              <div className="document-stack">
                <div></div>
                <div></div>
                <div>
                  <span>PDF</span>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <b>↗</b>
                </div>
              </div>
              <div className="rag-path">
                <span></span>
                <b>✳</b>
                <span></span>
              </div>
              <div className="rag-answer">
                <span className="mono">DOCUMENT → UNDERSTANDING</span>
                <strong>
                  Better questions.
                  <br />
                  <em>Grounded answers.</em>
                </strong>
                <div className="rag-source">
                  <span>01</span> Retrieve <i>→</i> <span>02</span> Reason
                </div>
              </div>
            </div>
            <span className="visual-bottom mono">
              WORKFLOW ILLUSTRATION / DOCUMENT-GROUNDED AI
            </span>
          </a>
          <div className="project-caption">
            <div>
              <p className="project-type mono">
                APPLIED AI · RETRIEVAL-AUGMENTED GENERATION
              </p>
              <h3>
                <a
                  href="https://github.com/omer-meraloglu/agentic_rag"
                  rel="noopener"
                  target="_blank"
                >
                  Agentic RAG <span aria-hidden="true">↗</span>
                </a>
              </h3>
            </div>
            <span className="project-number mono">04</span>
          </div>
          <p className="project-description">
            A document question-answering system that connects PDF extraction,
            vector search, and LLM reasoning. A Streamlit interface makes
            contextual, document-grounded exploration approachable.
          </p>
          <div className="project-tags">
            <span>LangChain</span>
            <span>FAISS</span>
            <span>Streamlit</span>
            <a
              href="https://github.com/omer-meraloglu/agentic_rag"
              rel="noopener"
              target="_blank"
            >
              Explore code ↗
            </a>
          </div>
        </article>
      </div>
      <div className="work-footer mono">
        <span>CURIOUS WHAT ELSE I’M BUILDING?</span>
        <a
          className="text-link"
          href="https://github.com/omer-meraloglu"
          rel="noopener"
          target="_blank"
        >
          More on GitHub ↗
        </a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      aria-labelledby="about-heading"
      className="about-section section-space"
      id="about"
    >
      <div className="wrap">
        <div className="section-top reveal">
          <p className="eyebrow">
            <span>02 /</span> THE PERSON BEHIND THE CODE
          </p>
          <span className="mono">ISTANBUL, TÜRKİYE</span>
        </div>
        <div className="about-grid">
          <div className="portrait-composition reveal">
            <div className="portrait-frame">
              <img
                alt="Portrait of Ömer Meraloğlu"
                height="1024"
                loading="lazy"
                src="assets/portrait.webp"
                width="1024"
              />
            </div>
            <div className="portrait-caption mono">
              <span>ÖMER MERALOĞLU</span>
              <span>ENGINEER. ANALYST. BUILDER.</span>
            </div>
            <span className="portrait-note">Always curious.</span>
          </div>
          <div className="about-copy reveal">
            <h2 id="about-heading">
              A builder’s instinct.
              <br />A scientist’s <em>curiosity.</em>
            </h2>
            <p className="about-lead">
              I like understanding how things work.
              <br />I like making them work better even more.
            </p>
            <p>
              My foundation is software engineering: building full-stack
              systems, developing business tools, and taking ideas from a first
              sketch to production. At SAB Tourismo, that meant turning real
              operational needs into software and CRM automation.
            </p>
            <p>
              That experience led me deeper into data. With a Software
              Engineering degree from Bahçeşehir University and completed Data
              Scientist AI and Data Analyst programs at Workintech, I bring an
              engineering mindset to analysis, machine learning, and AI-powered
              products.
            </p>
            <p>
              I’m most interested in the space between a useful insight and a
              working product. That’s where I want to build.
            </p>
            <a
              className="text-link"
              href="assets/Resume.pdf"
              rel="noopener"
              target="_blank"
            >
              The full story, in my CV <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="capability-grid reveal">
          <div>
            <span className="capability-index mono">01 / ENGINEER</span>
            <h3>Build the system.</h3>
            <p>
              Python · TypeScript · React · Next.js
              <br />
              FastAPI · Flask · MySQL · AWS
            </p>
          </div>
          <div>
            <span className="capability-index mono">02 / UNDERSTAND</span>
            <h3>Follow the data.</h3>
            <p>
              SQL · Pandas · NumPy · BigQuery
              <br />
              Scikit-learn · Power BI · ETL
            </p>
          </div>
          <div>
            <span className="capability-index mono">03 / EXPERIMENT</span>
            <h3>Explore what’s possible.</h3>
            <p>
              PyTorch · LLM integrations · LangChain
              <br />
              Vector search · Streamlit · Automation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section
      aria-labelledby="experience-heading"
      className="journey-section wrap section-space"
      id="experience"
    >
      <div className="journey-heading reveal">
        <p className="eyebrow">
          <span>03 /</span> THE JOURNEY
        </p>
        <h2 id="experience-heading">
          Learning.
          <br />
          Building.
          <br />
          <em>Connecting.</em>
        </h2>
        <a
          className="text-link"
          href="assets/Resume.pdf"
          rel="noopener"
          target="_blank"
        >
          View full CV ↗
        </a>
      </div>
      <div className="journey-list">
        <article className="journey-item reveal">
          <p className="mono journey-date">2026</p>
          <div>
            <p className="journey-kind mono">DATA SCIENCE &amp; AI</p>
            <h3>Workintech</h3>
            <p className="journey-role">
              Data Scientist AI &amp; Data Analyst programs
            </p>
            <p>
              Completed intensive programs in data science, analysis, and AI.
              Applied Python, SQL, machine learning, data engineering, and
              automation through practical project work.
            </p>
            <div className="mini-tags">
              <span>960-hour Data Scientist AI program</span>
              <span>432-hour Data Analyst program</span>
            </div>
          </div>
        </article>
        <article className="journey-item reveal">
          <p className="mono journey-date">2023 — 2025</p>
          <div>
            <p className="journey-kind mono">PROFESSIONAL EXPERIENCE</p>
            <h3>SAB Tourismo LTD</h3>
            <p className="journey-role">
              Research &amp; Development · Full-stack Engineering
            </p>
            <p>
              Developed and deployed full-stack systems for medical tourism
              operations. Worked with company leadership on business tools and
              CRM lifecycle automation using Python, Flask, MySQL, React,
              Next.js, and AWS.
            </p>
          </div>
        </article>
        <article className="journey-item reveal">
          <p className="mono journey-date">2024</p>
          <div>
            <p className="journey-kind mono">INTERNSHIP</p>
            <h3>Doğuş Teknoloji</h3>
            <p className="journey-role">Full-stack Developer Intern</p>
            <p>
              Collaborated in a virtual engineering team, developing experience
              with Git, GitHub, version control, and APIs.
            </p>
          </div>
        </article>
        <article className="journey-item reveal">
          <p className="mono journey-date">2020 — 2025</p>
          <div>
            <p className="journey-kind mono">EDUCATION</p>
            <h3>Bahçeşehir University</h3>
            <p className="journey-role">Bachelor of Software Engineering</p>
            <p>
              The engineering foundation behind my work across software systems,
              data, and applied AI.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

function Credentials() {
  return (
    <section
      aria-labelledby="credentials-heading"
      className="credentials-section section-space"
      id="credentials"
    >
      <div className="wrap">
        <div className="section-top reveal">
          <p className="eyebrow">
            <span>04 /</span> CONTINUOUS LEARNING
          </p>
          <span className="mono">SIX CREDENTIALS. ONE CURIOUS MIND.</span>
        </div>
        <h2 className="reveal" id="credentials-heading">
          Built on <em>foundations.</em>
        </h2>
        <div className="credentials-grid">
          <a
            className="credential reveal"
            href="assets/certificates/workintech-data-scientist-ai.pdf"
            rel="noopener"
            target="_blank"
          >
            <span
              aria-hidden="true"
              className="credential-mark mark-workintech"
            >
              w.
            </span>
            <div>
              <span className="mono">WORKINTECH · 2026</span>
              <h3>Data Scientist AI</h3>
              <p>960-hour program · Certificate of Completion</p>
            </div>
            <span aria-label="Open certificate" className="credential-arrow">
              ↗
            </span>
          </a>
          <a
            className="credential reveal"
            href="assets/certificates/workintech-data-analyst.pdf"
            rel="noopener"
            target="_blank"
          >
            <span
              aria-hidden="true"
              className="credential-mark mark-workintech"
            >
              w.
            </span>
            <div>
              <span className="mono">WORKINTECH · 2026</span>
              <h3>Data Analyst</h3>
              <p>432-hour program · Certificate of Completion</p>
            </div>
            <span aria-label="Open certificate" className="credential-arrow">
              ↗
            </span>
          </a>
          <a
            className="credential reveal"
            href="assets/certificates/nvidia-deep-learning.pdf"
            rel="noopener"
            target="_blank"
          >
            <span aria-hidden="true" className="credential-mark mark-nvidia">
              N
            </span>
            <div>
              <span className="mono">NVIDIA · APR 2025</span>
              <h3>Getting Started with Deep Learning</h3>
              <p>Certificate of Competency</p>
            </div>
            <span aria-label="Open certificate" className="credential-arrow">
              ↗
            </span>
          </a>
          <a
            className="credential reveal"
            href="assets/certificates/georgia-tech-ux.pdf"
            rel="noopener"
            target="_blank"
          >
            <span aria-hidden="true" className="credential-mark mark-georgia">
              GT
            </span>
            <div>
              <span className="mono">
                GEORGIA INSTITUTE OF TECHNOLOGY · MAR 2024
              </span>
              <h3>Introduction to User Experience Design</h3>
              <p>Course completion · Coursera</p>
            </div>
            <span aria-label="Open certificate" className="credential-arrow">
              ↗
            </span>
          </a>
          <a
            className="credential reveal"
            href="assets/certificates/michigan-ux.pdf"
            rel="noopener"
            target="_blank"
          >
            <span aria-hidden="true" className="credential-mark mark-michigan">
              M
            </span>
            <div>
              <span className="mono">UNIVERSITY OF MICHIGAN · MAR 2024</span>
              <h3>Introduction to User Experience Principles and Processes</h3>
              <p>Course completion · Coursera</p>
            </div>
            <span aria-label="Open certificate" className="credential-arrow">
              ↗
            </span>
          </a>
          <a
            className="credential reveal"
            href="assets/certificates/google-project-management.pdf"
            rel="noopener"
            target="_blank"
          >
            <span aria-hidden="true" className="credential-mark mark-google">
              G
            </span>
            <div>
              <span className="mono">GOOGLE · NOV 2023</span>
              <h3>Foundations of Project Management</h3>
              <p>Course completion · Coursera</p>
            </div>
            <span aria-label="Open certificate" className="credential-arrow">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copyState, setCopyState] = useState("idle");
  const [localTime, setLocalTime] = useState("UTC +03:00");
  useEffect(() => {
    const update = () =>
      setLocalTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Istanbul",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()) + " LOCAL TIME",
      );
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);
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
      aria-labelledby="contact-heading"
      className="contact-section"
      id="contact"
    >
      <div className="wrap">
        <div className="section-top">
          <p className="eyebrow">
            <span>05 /</span> LET’S CONNECT
          </p>
          <span aria-hidden="true" className="contact-asterisk">
            ✳
          </span>
        </div>
        <div className="contact-main reveal">
          <h2 id="contact-heading">
            Good things start
            <br />
            with a <em>conversation.</em>
          </h2>
          <p>
            A new opportunity, a technical challenge,
            <br />
            or an idea worth exploring. I’d love to hear it.
          </p>
          <a className="contact-cta" href="mailto:omer-meraloglu@hotmail.com">
            Let’s build something <span aria-hidden="true">↗</span>
          </a>
          <div className="email-line">
            <a href="mailto:omer-meraloglu@hotmail.com">
              omer-meraloglu@hotmail.com
            </a>
            <button
              aria-label="Copy email address"
              className="copy-email"
              onClick={copyEmail}
            >
              {copyState === "done"
                ? "COPIED ✓"
                : copyState === "failed"
                  ? "USE EMAIL LINK ↗"
                  : "COPY ↗"}
            </button>
          </div>
          <p
            aria-live="polite"
            className="sr-only"
            id="copy-status"
            role="status"
          >
            {copyState === "done"
              ? "Email address copied to clipboard."
              : copyState === "failed"
                ? "Copy is unavailable. Select the email address or use the email link."
                : ""}
          </p>
        </div>
        <div className="contact-bottom">
          <span className="mono">
            BASED IN ISTANBUL <span aria-hidden="true">↗</span>
            <br />
            <span id="istanbul-time">{localTime}</span>
          </span>
          <div className="footer-socials">
            <a
              href="https://github.com/omer-meraloglu"
              rel="noopener"
              target="_blank"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/omer-meraloglu/"
              rel="noopener"
              target="_blank"
            >
              LinkedIn ↗
            </a>
            <a href="assets/Resume.pdf" rel="noopener" target="_blank">
              CV ↗
            </a>
          </div>
          <a aria-label="Back to top" className="back-top" href="#top">
            ↑
          </a>
        </div>
      </div>
    </section>
  );
}
export default function App() {
  usePageEffects();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main id="main">
        <Hero />
        <div aria-hidden="true" className="discipline-strip">
          <div className="wrap">
            <span>SOFTWARE ENGINEERING</span>
            <b>✳</b>
            <span>DATA SCIENCE</span>
            <b>✳</b>
            <span>APPLIED AI</span>
            <b>✳</b>
            <span>HUMAN-CENTERED THINKING</span>
          </div>
        </div>
        <Projects />
        <About />
        <Journey />
        <Credentials />
        <Contact />
      </main>
      <footer className="site-footer wrap mono">
        <span>
          © <span id="year">{new Date().getFullYear()}</span> ÖMER MERALOĞLU
        </span>
        <span>BUILT WITH INTENTION &amp; A LITTLE CURIOSITY.</span>
        <span>
          THANKS FOR STOPPING BY <span aria-hidden="true">✳</span>
        </span>
      </footer>
    </>
  );
}
