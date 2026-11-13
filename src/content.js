export const languages = [
  { code: "en", label: "EN", name: "English" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "tr", label: "TR", name: "Türkçe" },
];

export const projectData = [
  {
    id: "steamcast",
    categories: ["data", "software"],
    url: "https://steamcast.streamlit.app/",
    image: "steamcast.webp",
    tags: ["BigQuery", "dbt", "LightGBM", "XGBoost", "Optuna", "SHAP"],
    pipeline:
      "https://github.com/ErtugrulKaramanli/Steam-Price-Popularity-Predictor",
    code: "https://github.com/omer-meraloglu/streamlit-ui",
  },
  {
    id: "firstLight",
    categories: ["software", "data"],
    url: "https://first-light-briefing-one.vercel.app/",
    image: "first-light.webp",
    tags: ["Next.js", "AI workflows", "Vercel"],
  },
  {
    id: "fraud",
    categories: ["data"],
    url: "https://github.com/omer-meraloglu/fraud_detection",
    tags: ["Python", "BigQuery", "LightGBM", "Power BI"],
  },
  {
    id: "seeds",
    categories: ["software"],
    url: "https://storyseeds.vercel.app/",
    image: "story-seeds.webp",
    tags: ["Interactive web", "3D", "Product development"],
  },
  {
    id: "rag",
    categories: ["data", "software"],
    url: "https://github.com/omer-meraloglu/agentic_rag",
    tags: ["LangChain", "FAISS", "Streamlit"],
  },
];

export const certificateData = [
  {
    title: "Data Scientist AI",
    issuer: "Workintech",
    year: "2026",
    hours: 960,
    file: "workintech-data-scientist-ai.pdf",
    mark: "w.",
    color: "workintech",
  },
  {
    title: "Data Analyst",
    issuer: "Workintech",
    year: "2026",
    hours: 432,
    file: "workintech-data-analyst.pdf",
    mark: "w.",
    color: "workintech",
  },
  {
    title: "Getting Started with Deep Learning",
    issuer: "NVIDIA",
    year: "2025",
    file: "nvidia-deep-learning.pdf",
    mark: "N",
    color: "nvidia",
  },
  {
    title: "Introduction to User Experience Design",
    issuer: "Georgia Institute of Technology",
    year: "2024",
    file: "georgia-tech-ux.pdf",
    mark: "GT",
    color: "georgia",
  },
  {
    title: "Introduction to User Experience Principles and Processes",
    issuer: "University of Michigan",
    year: "2024",
    file: "michigan-ux.pdf",
    mark: "M",
    color: "michigan",
  },
  {
    title: "Foundations of Project Management",
    issuer: "Google",
    year: "2023",
    file: "google-project-management.pdf",
    mark: "G",
    color: "google",
  },
];

export const content = {
  en: {
    role: "Software Engineer & Data Scientist",
    meta: "Ömer Meraloğlu builds thoughtful software, practical AI, and data-driven systems. Explore projects, experience, and credentials.",
    nav: {
      work: "Selected work",
      about: "About",
      journey: "Journey",
      credentials: "Credentials",
      contact: "Let’s talk",
      open: "Open navigation",
      close: "Close navigation",
      language: "Website language",
      home: "Ömer Meraloğlu home",
      skip: "Skip to content",
    },
    hero: {
      first: "Engineering",
      second: "what’s",
      emphasis: "next.",
      intro:
        "I’m Ömer. I turn complex problems into thoughtful software, useful data, and practical AI.",
      work: "Explore my work",
      cv: "View my CV",
      location: "Currently in Istanbul. Building beyond borders.",
      scroll: "Scroll to discover",
    },
    orbit: {
      title: "Worlds I reside in",
      label:
        "Eight interactive worlds represent my professional strengths. Drag in any direction to rotate freely, or choose a name to explore.",
      hint: "Drag freely · Choose a world",
      explore: "Explore my professional strengths",
      pause: "Pause motion",
      resume: "Resume motion",
      left: "Rotate left",
      right: "Rotate right",
      up: "Rotate upward",
      down: "Rotate downward",
      rotate: "Rotate the composition",
      reset: "Reset view",
      fallback: "Eight ways I build",
      detail: "Professional strength",
      aspects: [
        {
          title: "Software Engineering",
          description:
            "Full-stack applications built with Python, TypeScript, React, and Next.js.",
        },
        {
          title: "Data Science",
          description:
            "Finding useful patterns through analysis, statistics, and machine learning.",
        },
        {
          title: "Applied AI",
          description:
            "Connecting LLMs, retrieval, and explainability with LangChain, FAISS, and SHAP.",
        },
        {
          title: "Data Engineering",
          description:
            "Turning raw data into usable foundations with SQL, BigQuery, dbt, and ETL.",
        },
        {
          title: "Automation",
          description:
            "Making repeatable work reliable, from CRM workflows to First Light’s publishing pipeline.",
        },
        {
          title: "Product Thinking",
          description:
            "Letting user experience and business needs guide the path from an idea to a useful product.",
        },
        {
          title: "Cloud Delivery",
          description:
            "Taking applications into production with AWS, Vercel, and practical deployment workflows.",
        },
        {
          title: "Collaboration",
          description:
            "Building with teammates, learning from mentors, and connecting engineering with data.",
        },
      ],
    },
    disciplines: [
      "Software engineering",
      "Data science",
      "Applied AI",
      "Human-centered thinking",
    ],
    work: {
      eyebrow: "Selected work",
      aside:
        "A few things I’ve built. Different challenges. The same curiosity.",
      title: "Ideas, made",
      emphasis: "real.",
      tags: {
        "AI workflows": "AI workflows",
        "Interactive web": "Interactive web",
        "Product development": "Product development",
      },
      filters: "Filter projects",
      all: "All work",
      software: "Software",
      data: "Data & AI",
      showing: "projects shown",
      more: "Curious what else I’m building?",
      github: "More on GitHub",
      visit: "Visit website",
      demo: "Live demo",
      code: "Explore code",
      pipeline: "Pipeline GitHub",
      interface: "Streamlit GitHub",
      featured: "Featured project",
      screenshot: "Live application preview",
      holdout: "Stratified 80/20 hold-out",
      transactions: "~590K transactions",
      baseline: "Baseline",
      comparison: "Model comparison",
      document: "Document → understanding",
      questions: "Better questions.",
      answers: "Grounded answers.",
      retrieve: "Retrieve",
      reason: "Reason",
      illustration: "Workflow illustration / document-grounded AI",
    },
    projects: {
      steamcast: {
        title: "Steamcast",
        type: "Machine learning · Decision support",
        visual: "Game market intelligence",
        description:
          "An end-to-end ML and decision support system for indie game developers. Simulate a game before release to explore projected sales, owner counts, peak concurrent players, and review scores.",
        detail:
          "139k+ Kaggle games modeled in BigQuery. A dbt staging-and-mart pipeline with Jinja encoding feeds LightGBM and XGBoost, tuned with Optuna and time-weighted, out-of-fold validation. Streamlit and SHAP make the predictions explainable.",
        alt: "Steamcast’s game configuration interface and a sample forecast showing ownership, review, and pricing estimates",
      },
      firstLight: {
        title: "First Light",
        type: "AI automation · Web application",
        visual: "The world. In five minutes.",
        description:
          "An AI-assisted, five-minute weekday news briefing. Automated research and publishing, direct source links, and an edition archive turn the daily news cycle into a calmer reading ritual.",
        alt: "First Light’s morning briefing and source-linked news",
      },
      fraud: {
        title: "Fraud, in focus",
        type: "Machine learning · Data engineering",
        visual: "Finding the signal",
        description:
          "A collaborative fraud-detection study spanning BigQuery feature engineering, Python modeling, and Power BI. Compared logistic regression with LightGBM on highly imbalanced transaction data.",
      },
      seeds: {
        title: "Story Seeds",
        type: "Interactive experience · Digital storytelling",
        visual: "22 seeds. 22 stories. One shared future.",
        description:
          "Physical seed capsules become a gateway to digital history. I engineered the interactive platform for a commemorative concept honoring the Korean War’s 22 UN Sending States, and contributed to its product development.",
        alt: "Story Seeds’ interactive website linking 22 seed capsules to the stories of 22 nations",
      },
      rag: {
        title: "Agentic RAG",
        type: "Applied AI · Retrieval-augmented generation",
        visual: "Knowledge, connected",
        description:
          "A document question-answering system connecting PDF extraction, vector search, and LLM reasoning. A Streamlit interface makes contextual, document-grounded exploration approachable.",
      },
    },
    about: {
      aiStack:
        "PyTorch · LLM · LangChain · Vector search · Streamlit · Automation",
      eyebrow: "The person behind the code",
      place: "Istanbul, Türkiye",
      title: "About me",
      lead: "I like understanding how things work. I like making them work better even more.",
      paragraphs: [
        "My foundation is software engineering: building full-stack systems, developing business tools, and taking ideas from a first sketch to production. At SAB Tourismo, that meant turning real operational needs into software and CRM automation.",
        "That experience led me deeper into data. With a Software Engineering degree from Bahçeşehir University and completed Data Scientist AI and Data Analyst programs at Workintech, I bring an engineering mindset to analysis, machine learning, and AI-powered products.",
        "I focus on turning useful insights into working products. Some of my professional work is covered by non-disclosure agreements and cannot be shared publicly.",
      ],
      cv: "The full story, in my CV",
      portrait: "Portrait of Ömer Meraloğlu",
      capabilities: [
        { label: "Engineer", title: "Build the system." },
        { label: "Understand", title: "Follow the data." },
        { label: "Experiment", title: "Explore what’s possible." },
      ],
    },
    journey: {
      eyebrow: "The journey",
      title: "My journey",
      cv: "View full CV",
      entries: [
        {
          date: "2026",
          kind: "Data science & AI",
          title: "Workintech",
          role: "Data Scientist AI & Data Analyst programs",
          description:
            "Completed intensive programs in data science, analysis, and AI. Applied Python, SQL, machine learning, data engineering, and automation through practical project work.",
          tags: [
            "960-hour Data Scientist AI program",
            "432-hour Data Analyst program",
          ],
        },
        {
          date: "2023 — 2025",
          kind: "Professional experience",
          title: "SAB Tourismo LTD",
          role: "Research & Development · Full-stack Engineering",
          description:
            "Developed and deployed full-stack systems for medical tourism operations. Worked with company leadership on business tools and CRM lifecycle automation using Python, Flask, MySQL, React, Next.js, and AWS.",
        },
        {
          date: "2024",
          kind: "Internship",
          title: "Doğuş Teknoloji",
          role: "Full-stack Developer Intern",
          description:
            "Collaborated in a virtual engineering team, developing experience with Git, GitHub, version control, and APIs.",
        },
        {
          date: "2020 — 2025",
          kind: "Education",
          title: "Bahçeşehir University",
          role: "Bachelor of Software Engineering",
          description:
            "The engineering foundation behind my work across software systems, data, and applied AI.",
        },
      ],
    },
    credentials: {
      eyebrow: "Continuous learning",
      aside: "Six credentials. One curious mind.",
      title: "Built on",
      emphasis: "foundations.",
      completion: "Certificate of Completion",
      competency: "Certificate of Competency",
      course: "Course completion · Coursera",
      hour: "hour program",
      open: "Open certificate",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's connect",
      intro:
        "A new opportunity, a technical challenge, or a business enquiry. I’d love to hear it.",
      cta: "Let’s build something",
      copy: "Copy",
      copied: "Copied",
      failed: "Use email link",
      copyLabel: "Copy email address",
      success: "Email address copied to clipboard.",
      failure:
        "Copy is unavailable. Select the email address or use the email link.",
      based: "Currently in Istanbul",
      local: "local time",
      back: "Back to top",
    },
    footer: {
      thanks: "Thanks for stopping by",
    },
  },
  de: {
    role: "Softwareentwickler & Data Scientist",
    meta: "Ömer Meraloğlu entwickelt durchdachte Software, praxisnahe KI und datenbasierte Systeme. Projekte, Erfahrung und Qualifikationen entdecken.",
    nav: {
      work: "Projekte",
      about: "Über mich",
      journey: "Werdegang",
      credentials: "Qualifikationen",
      contact: "Kontakt",
      open: "Navigation öffnen",
      close: "Navigation schließen",
      language: "Sprache der Website",
      home: "Ömer Meraloğlu Startseite",
      skip: "Zum Inhalt springen",
    },
    hero: {
      first: "Technik für",
      second: "das",
      emphasis: "Morgen.",
      intro:
        "Ich bin Ömer. Aus komplexen Problemen mache ich durchdachte Software, wertvolle Daten und praxisnahe KI.",
      work: "Projekte entdecken",
      cv: "Lebenslauf ansehen",
      location: "Derzeit in Istanbul. Über Grenzen hinweg tätig.",
      scroll: "Weiter entdecken",
    },
    orbit: {
      title: "Welten, in denen ich zu Hause bin",
      label:
        "Acht interaktive Welten stehen für meine beruflichen Stärken. Zum freien Drehen in eine beliebige Richtung ziehen oder einen Namen auswählen.",
      hint: "Frei drehen · Welt auswählen",
      explore: "Meine beruflichen Stärken entdecken",
      pause: "Bewegung anhalten",
      resume: "Bewegung fortsetzen",
      left: "Nach links drehen",
      right: "Nach rechts drehen",
      up: "Nach oben drehen",
      down: "Nach unten drehen",
      rotate: "Die Komposition drehen",
      reset: "Ansicht zurücksetzen",
      fallback: "Acht Facetten meiner Arbeit",
      detail: "Berufliche Stärke",
      aspects: [
        {
          title: "Softwareentwicklung",
          description:
            "Full-Stack-Anwendungen mit Python, TypeScript, React und Next.js entwickeln.",
        },
        {
          title: "Data Science",
          description:
            "Mit Analyse, Statistik und Machine Learning nützliche Muster erkennen.",
        },
        {
          title: "Angewandte KI",
          description:
            "LLMs, Informationsabruf und Erklärbarkeit mit LangChain, FAISS und SHAP verbinden.",
        },
        {
          title: "Data Engineering",
          description:
            "Rohdaten mit SQL, BigQuery, dbt und ETL in nutzbare Grundlagen verwandeln.",
        },
        {
          title: "Automatisierung",
          description:
            "Wiederkehrende Arbeit zuverlässig gestalten: von CRM-Abläufen bis zur Veröffentlichung von First Light.",
        },
        {
          title: "Produktdenken",
          description:
            "Nutzererfahrung und geschäftliche Anforderungen führen von einer Idee zu einem nützlichen Produkt.",
        },
        {
          title: "Cloud & Bereitstellung",
          description:
            "Anwendungen mit AWS, Vercel und praxisnahen Deployment-Abläufen in den Produktivbetrieb bringen.",
        },
        {
          title: "Zusammenarbeit",
          description:
            "Im Team entwickeln, von Mentoren lernen und Softwareentwicklung mit Daten verbinden.",
        },
      ],
    },
    disciplines: [
      "Softwareentwicklung",
      "Data Science",
      "Angewandte KI",
      "Nutzerorientiertes Denken",
    ],
    work: {
      eyebrow: "Ausgewählte Projekte",
      aside:
        "Ein Einblick in meine Arbeit. Unterschiedliche Aufgaben. Dieselbe Neugier.",
      title: "Aus Ideen wird",
      emphasis: "Wirklichkeit.",
      tags: {
        "AI workflows": "KI-Workflows",
        "Interactive web": "Interaktives Web",
        "Product development": "Produktentwicklung",
      },
      filters: "Projekte filtern",
      all: "Alle Projekte",
      software: "Software",
      data: "Daten & KI",
      showing: "Projekte angezeigt",
      more: "Neugierig auf weitere Projekte?",
      github: "Mehr auf GitHub",
      visit: "Website besuchen",
      demo: "Live-Demo",
      code: "Code ansehen",
      pipeline: "Pipeline auf GitHub",
      interface: "Streamlit auf GitHub",
      featured: "Projekt im Fokus",
      screenshot: "Vorschau der Live-Anwendung",
      holdout: "Stratifizierte 80/20-Aufteilung",
      transactions: "~590 Tsd. Transaktionen",
      baseline: "Basismodell",
      comparison: "Modellvergleich",
      document: "Vom Dokument zum Verständnis",
      questions: "Bessere Fragen.",
      answers: "Fundierte Antworten.",
      retrieve: "Abrufen",
      reason: "Ableiten",
      illustration: "Ablaufdarstellung / dokumentengestützte KI",
    },
    projects: {
      steamcast: {
        title: "Steamcast",
        type: "Machine Learning · Entscheidungsunterstützung",
        visual: "Daten für den Spielemarkt",
        description:
          "Ein durchgängiges ML- und Entscheidungsunterstützungssystem für Indie-Spieleentwickler. Noch vor der Veröffentlichung lassen sich prognostizierte Verkäufe, Besitzerzahlen, gleichzeitige Spieler und Bewertungsergebnisse untersuchen.",
        detail:
          "Über 139.000 Kaggle-Spiele, modelliert in BigQuery. Eine dbt-Pipeline mit Staging- und Mart-Schichten sowie Jinja-Kodierung liefert die Daten für LightGBM und XGBoost. Optuna sowie zeitgewichtete Out-of-Fold-Validierung unterstützen das Training. Streamlit und SHAP machen die Prognosen nachvollziehbar.",
        alt: "Steamcast mit Spielkonfiguration und einer Beispielprognose für Besitzerzahlen, Bewertungen und Preise",
      },
      firstLight: {
        title: "First Light",
        type: "KI-Automatisierung · Webanwendung",
        visual: "Die Welt. In fünf Minuten.",
        description:
          "Ein KI-gestütztes Nachrichtenbriefing für fünf Minuten an jedem Werktag. Automatisierte Recherche und Veröffentlichung, direkte Quellenlinks und ein Ausgabenarchiv machen den Nachrichtenalltag übersichtlicher.",
        alt: "Das Morgenbriefing von First Light mit direkten Nachrichtenquellen",
      },
      fraud: {
        title: "Betrug im Fokus",
        type: "Machine Learning · Data Engineering",
        visual: "Das Signal erkennen",
        description:
          "Ein gemeinsam entwickeltes Projekt zur Betrugserkennung: Feature Engineering in BigQuery, Modellierung in Python und Visualisierung in Power BI. Verglichen wurden logistische Regression und LightGBM auf stark unausgeglichenen Transaktionsdaten.",
      },
      seeds: {
        title: "Story Seeds",
        type: "Interaktives Erlebnis · Digitales Storytelling",
        visual: "22 Samen. 22 Geschichten. Eine gemeinsame Zukunft.",
        description:
          "Physische Samenkapseln öffnen den Zugang zu digitaler Geschichte. Ich entwickelte die interaktive Plattform für ein Erinnerungskonzept zu den 22 UN-Entsendestaaten des Koreakriegs und wirkte an der Produktentwicklung mit.",
        alt: "Story Seeds verbindet 22 Samenkapseln mit den Geschichten von 22 Nationen",
      },
      rag: {
        title: "Agentic RAG",
        type: "Angewandte KI · Retrieval-Augmented Generation",
        visual: "Wissen vernetzen",
        description:
          "Ein System für dokumentenbezogene Fragen und Antworten, das PDF-Extraktion, Vektorsuche und LLM-Verarbeitung verbindet. Eine Streamlit-Oberfläche macht die kontextbezogene Recherche zugänglich.",
      },
    },
    about: {
      aiStack:
        "PyTorch · LLM · LangChain · Vektorsuche · Streamlit · Automatisierung",
      eyebrow: "Der Mensch hinter dem Code",
      place: "Istanbul, Türkei",
      title: "Über mich",
      lead: "Ich möchte verstehen, wie Dinge funktionieren. Noch lieber mache ich sie besser.",
      paragraphs: [
        "Meine Grundlage ist die Softwareentwicklung: Full-Stack-Systeme bauen, Geschäftsanwendungen entwickeln und Ideen vom ersten Entwurf bis zum Produktivbetrieb begleiten. Bei SAB Tourismo setzte ich konkrete betriebliche Anforderungen in Software und CRM-Automatisierung um.",
        "Diese Erfahrung führte mich tiefer in die Welt der Daten. Mit einem Abschluss in Software Engineering der Bahçeşehir-Universität und abgeschlossenen Programmen für Data Scientist AI und Data Analyst bei Workintech verbinde ich technisches Denken mit Analyse, Machine Learning und KI-Produkten.",
        "Ich setze nützliche Erkenntnisse in funktionierende Produkte um. Ein Teil meiner beruflichen Arbeit unterliegt Geheimhaltungsvereinbarungen und kann nicht öffentlich gezeigt werden.",
      ],
      cv: "Mehr dazu in meinem Lebenslauf",
      portrait: "Porträt von Ömer Meraloğlu",
      capabilities: [
        { label: "Entwickeln", title: "Systeme bauen." },
        { label: "Verstehen", title: "Den Daten folgen." },
        { label: "Experimentieren", title: "Möglichkeiten entdecken." },
      ],
    },
    journey: {
      eyebrow: "Mein Werdegang",
      title: "Mein Werdegang",
      cv: "Lebenslauf ansehen",
      entries: [
        {
          date: "2026",
          kind: "Data Science & KI",
          title: "Workintech",
          role: "Programme Data Scientist AI & Data Analyst",
          description:
            "Intensivprogramme in Data Science, Analyse und KI abgeschlossen. Python, SQL, Machine Learning, Data Engineering und Automatisierung in praxisnahen Projekten angewendet.",
          tags: ["960 Stunden Data Scientist AI", "432 Stunden Data Analyst"],
        },
        {
          date: "2023 — 2025",
          kind: "Berufserfahrung",
          title: "SAB Tourismo LTD",
          role: "Forschung & Entwicklung · Full-Stack-Entwicklung",
          description:
            "Full-Stack-Systeme für den Medizintourismus entwickelt und bereitgestellt. Mit der Unternehmensleitung an Geschäftsanwendungen und CRM-Automatisierung gearbeitet, unter anderem mit Python, Flask, MySQL, React, Next.js und AWS.",
        },
        {
          date: "2024",
          kind: "Praktikum",
          title: "Doğuş Teknoloji",
          role: "Praktikum in der Full-Stack-Entwicklung",
          description:
            "In einem virtuellen Entwicklungsteam mitgearbeitet und Erfahrung mit Git, GitHub, Versionskontrolle und APIs gesammelt.",
        },
        {
          date: "2020 — 2025",
          kind: "Studium",
          title: "Bahçeşehir-Universität",
          role: "Bachelor in Software Engineering",
          description:
            "Das technische Fundament für meine Arbeit an Softwaresystemen, Daten und angewandter KI.",
        },
      ],
    },
    credentials: {
      eyebrow: "Lebenslanges Lernen",
      aside: "Sechs Qualifikationen. Ein neugieriger Kopf.",
      title: "Auf Wissen",
      emphasis: "aufgebaut.",
      completion: "Abschlusszertifikat",
      competency: "Kompetenzzertifikat",
      course: "Kursabschluss · Coursera",
      hour: "Stunden Programm",
      open: "Zertifikat öffnen",
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Kontakt aufnehmen",
      intro:
        "Eine neue berufliche Chance, eine technische Herausforderung oder eine geschäftliche Anfrage? Ich freue mich auf den Austausch.",
      cta: "Gemeinsam etwas entwickeln",
      copy: "Kopieren",
      copied: "Kopiert",
      failed: "E-Mail-Link nutzen",
      copyLabel: "E-Mail-Adresse kopieren",
      success: "E-Mail-Adresse in die Zwischenablage kopiert.",
      failure:
        "Kopieren ist nicht verfügbar. Bitte die Adresse markieren oder den E-Mail-Link verwenden.",
      based: "Derzeit in Istanbul",
      local: "Ortszeit",
      back: "Zurück nach oben",
    },
    footer: {
      thanks: "Danke für den Besuch",
    },
  },
  tr: {
    role: "Yazılım Mühendisi & Veri Bilimci",
    meta: "Ömer Meraloğlu; işlevsel yazılımlar, uygulanabilir yapay zekâ çözümleri ve veri odaklı sistemler geliştirir. Projelerini, deneyimini ve sertifikalarını keşfedin.",
    nav: {
      work: "Projeler",
      about: "Hakkımda",
      journey: "Yolculuğum",
      credentials: "Sertifikalar",
      contact: "İletişim",
      open: "Menüyü aç",
      close: "Menüyü kapat",
      language: "Site dili",
      home: "Ömer Meraloğlu ana sayfa",
      skip: "İçeriğe geç",
    },
    hero: {
      first: "Geleceğe",
      second: "kod",
      emphasis: "yazıyorum.",
      intro:
        "Ben Ömer. Karmaşık problemleri işlevsel yazılımlara, anlamlı verilere ve uygulanabilir yapay zekâ çözümlerine dönüştürüyorum.",
      work: "Projelerimi keşfet",
      cv: "Özgeçmişimi görüntüle",
      location: "Şu anda İstanbul’da. Sınırların ötesine.",
      scroll: "Keşfetmek için kaydır",
    },
    orbit: {
      title: "İçinde yaşadığım dünyalar",
      label:
        "Sekiz etkileşimli dünya, mesleki yetkinliklerimi temsil ediyor. Serbestçe döndürmek için herhangi bir yöne sürükleyin veya bir isim seçin.",
      hint: "Serbestçe döndür · Bir dünya seç",
      explore: "Mesleki yetkinliklerimi keşfet",
      pause: "Hareketi duraklat",
      resume: "Hareketi sürdür",
      left: "Sola döndür",
      right: "Sağa döndür",
      up: "Yukarı döndür",
      down: "Aşağı döndür",
      rotate: "Kompozisyonu döndür",
      reset: "Görünümü sıfırla",
      fallback: "Üretimimin sekiz yönü",
      detail: "Mesleki yetkinlik",
      aspects: [
        {
          title: "Yazılım mühendisliği",
          description:
            "Python, TypeScript, React ve Next.js ile uçtan uca uygulamalar geliştirmek.",
        },
        {
          title: "Veri bilimi",
          description:
            "Analiz, istatistik ve makine öğrenmesiyle veride anlamlı örüntüler bulmak.",
        },
        {
          title: "Uygulamalı yapay zekâ",
          description:
            "LLM, bilgi getirme ve açıklanabilirliği LangChain, FAISS ve SHAP ile birleştirmek.",
        },
        {
          title: "Veri mühendisliği",
          description:
            "SQL, BigQuery, dbt ve ETL ile ham veriyi kullanılabilir bir temele dönüştürmek.",
        },
        {
          title: "Otomasyon",
          description:
            "CRM iş akışlarından First Light’ın yayın sürecine kadar tekrar eden işleri güvenilir hâle getirmek.",
        },
        {
          title: "Ürün odaklı düşünce",
          description:
            "Bir fikri faydalı bir ürüne taşırken kullanıcı deneyimini ve iş ihtiyaçlarını merkeze almak.",
        },
        {
          title: "Buluta taşıma",
          description:
            "AWS, Vercel ve uygulanabilir dağıtım süreçleriyle uygulamaları canlıya almak.",
        },
        {
          title: "İş birliği",
          description:
            "Ekip arkadaşlarıyla üretmek, mentorlardan öğrenmek ve yazılımla veriyi buluşturmak.",
        },
      ],
    },
    disciplines: [
      "Yazılım mühendisliği",
      "Veri bilimi",
      "Uygulamalı yapay zekâ",
      "İnsan odaklı düşünce",
    ],
    work: {
      eyebrow: "Seçili projeler",
      aside:
        "Üzerinde çalıştığım fikirlerden birkaçı. Farklı problemler. Aynı merak.",
      title: "Fikirden",
      emphasis: "gerçeğe.",
      tags: {
        "AI workflows": "Yapay zekâ iş akışları",
        "Interactive web": "Etkileşimli web",
        "Product development": "Ürün geliştirme",
      },
      filters: "Projeleri filtrele",
      all: "Tüm projeler",
      software: "Yazılım",
      data: "Veri & Yapay Zekâ",
      showing: "proje gösteriliyor",
      more: "Başka neler geliştirdiğimi merak ettiniz mi?",
      github: "GitHub’da daha fazlası",
      visit: "Siteyi ziyaret et",
      demo: "Canlı demo",
      code: "Kodu incele",
      pipeline: "Veri hattı GitHub",
      interface: "Streamlit GitHub",
      featured: "Öne çıkan proje",
      screenshot: "Canlı uygulama önizlemesi",
      holdout: "Katmanlı 80/20 test ayrımı",
      transactions: "~590 bin işlem",
      baseline: "Temel model",
      comparison: "Model karşılaştırması",
      document: "Belgeden anlamaya",
      questions: "Daha iyi sorular.",
      answers: "Kaynağa dayalı yanıtlar.",
      retrieve: "Bilgiyi getir",
      reason: "Yorumla",
      illustration: "İş akışı gösterimi / belgeye dayalı yapay zekâ",
    },
    projects: {
      steamcast: {
        title: "Steamcast",
        type: "Makine öğrenmesi · Karar destek",
        visual: "Oyun pazarına veriyle bakış",
        description:
          "Bağımsız oyun geliştiricileri için uçtan uca makine öğrenmesi ve karar destek sistemi. Oyun henüz yayımlanmadan satış, sahip sayısı, eş zamanlı oyuncu sayısı ve inceleme puanlarına ilişkin tahminleri keşfetmeyi sağlar.",
        detail:
          "Kaggle’dan 139 bini aşkın oyun BigQuery’de modellendi. Jinja kodlaması ile staging ve mart katmanları içeren dbt veri hattı; Optuna ile ayarlanan, zaman ağırlıklı ve out-of-fold doğrulama kullanan LightGBM ve XGBoost modellerini besliyor. Streamlit ve SHAP, tahminleri açıklanabilir hâle getiriyor.",
        alt: "Steamcast oyun yapılandırma arayüzü ve sahip sayısı, inceleme ve fiyat tahminlerini gösteren örnek simülasyon",
      },
      firstLight: {
        title: "First Light",
        type: "Yapay zekâ otomasyonu · Web uygulaması",
        visual: "Dünya. Beş dakikada.",
        description:
          "Hafta içi her gün beş dakikada okunabilen, yapay zekâ destekli haber özeti. Otomatik araştırma ve yayımlama, doğrudan kaynak bağlantıları ve sayı arşiviyle gündemi takip etmeyi daha sakin bir deneyime dönüştürüyor.",
        alt: "First Light sabah özeti ve kaynak bağlantılı haberleri",
      },
      fraud: {
        title: "Dolandırıcılığa yakından bakış",
        type: "Makine öğrenmesi · Veri mühendisliği",
        visual: "Verideki sinyali bulmak",
        description:
          "BigQuery’de özellik mühendisliği, Python’da modelleme ve Power BI’da görselleştirmeyi birleştiren ekip projesi. Sınıf dağılımı oldukça dengesiz işlem verilerinde lojistik regresyon ve LightGBM karşılaştırıldı.",
      },
      seeds: {
        title: "Story Seeds",
        type: "Etkileşimli deneyim · Dijital hikâye anlatımı",
        visual: "22 tohum. 22 hikâye. Ortak bir gelecek.",
        description:
          "Fiziksel tohum kapsülleri, dijital tarihe açılan bir kapıya dönüşüyor. Kore Savaşı’na katılan 22 BM ülkesini anan bu konseptin etkileşimli platformunu geliştirdim ve ürün geliştirme sürecine katkı sağladım.",
        alt: "22 tohum kapsülünü 22 ülkenin hikâyesine bağlayan etkileşimli Story Seeds sitesi",
      },
      rag: {
        title: "Agentic RAG",
        type: "Uygulamalı yapay zekâ · RAG",
        visual: "Bilgiyle bağlantı kurmak",
        description:
          "PDF metin çıkarımı, vektör araması ve dil modeliyle akıl yürütmeyi birleştiren belge tabanlı soru-cevap sistemi. Streamlit arayüzü, bağlama ve belgelere dayalı araştırmayı erişilebilir kılıyor.",
      },
    },
    about: {
      aiStack:
        "PyTorch · LLM · LangChain · Vektör arama · Streamlit · Otomasyon",
      eyebrow: "Kodun arkasındaki insan",
      place: "İstanbul, Türkiye",
      title: "Hakkımda",
      lead: "Bir şeylerin nasıl çalıştığını anlamayı seviyorum. Onları daha iyi hâle getirmeyi ise daha çok.",
      paragraphs: [
        "Temelim yazılım mühendisliği: uçtan uca sistemler kurmak, iş araçları geliştirmek ve fikirleri ilk taslaktan canlı ürüne taşımak. SAB Tourismo’da bu, gerçek operasyonel ihtiyaçları yazılıma ve CRM otomasyonuna dönüştürmek demekti.",
        "Bu deneyim beni veri alanında derinleşmeye yöneltti. Bahçeşehir Üniversitesi Yazılım Mühendisliği lisansım ve Workintech’te tamamladığım Data Scientist AI ve Data Analyst programlarıyla analiz, makine öğrenmesi ve yapay zekâ ürünlerine mühendislik bakış açısı getiriyorum.",
        "Faydalı içgörüleri çalışan ürünlere dönüştürmeye odaklanıyorum. Profesyonel çalışmalarımın bir kısmı gizlilik sözleşmeleri kapsamında olduğundan kamuya açık olarak paylaşılamıyor.",
      ],
      cv: "Hikâyenin tamamı özgeçmişimde",
      portrait: "Ömer Meraloğlu’nun portresi",
      capabilities: [
        { label: "Geliştir", title: "Sistemi kur." },
        { label: "Anla", title: "Verinin izini sür." },
        { label: "Deneyimle", title: "Olasılıkları keşfet." },
      ],
    },
    journey: {
      eyebrow: "Yolculuğum",
      title: "Yolculuğum",
      cv: "Özgeçmişimi görüntüle",
      entries: [
        {
          date: "2026",
          kind: "Veri bilimi & yapay zekâ",
          title: "Workintech",
          role: "Data Scientist AI & Data Analyst programları",
          description:
            "Veri bilimi, analiz ve yapay zekâ alanlarında yoğun eğitim programlarını tamamladım. Python, SQL, makine öğrenmesi, veri mühendisliği ve otomasyonu uygulamalı projelerde kullandım.",
          tags: ["960 saat Data Scientist AI", "432 saat Data Analyst"],
        },
        {
          date: "2023 — 2025",
          kind: "İş deneyimi",
          title: "SAB Tourismo LTD",
          role: "Araştırma & Geliştirme · Full-stack Yazılım",
          description:
            "Sağlık turizmi operasyonları için uçtan uca sistemler geliştirip yayımladım. Şirket yönetimiyle iş araçları ve CRM otomasyonu üzerinde Python, Flask, MySQL, React, Next.js ve AWS kullanarak çalıştım.",
        },
        {
          date: "2024",
          kind: "Staj",
          title: "Doğuş Teknoloji",
          role: "Full-stack Geliştirici Stajyeri",
          description:
            "Uzaktan çalışan bir yazılım ekibinde yer alarak Git, GitHub, sürüm kontrolü ve API’ler konusunda deneyim kazandım.",
        },
        {
          date: "2020 — 2025",
          kind: "Eğitim",
          title: "Bahçeşehir Üniversitesi",
          role: "Yazılım Mühendisliği Lisans",
          description:
            "Yazılım sistemleri, veri ve uygulamalı yapay zekâ çalışmalarımın mühendislik temeli.",
        },
      ],
    },
    credentials: {
      eyebrow: "Sürekli öğrenme",
      aside: "Altı sertifika. Tek bir meraklı zihin.",
      title: "Sağlam",
      emphasis: "temeller.",
      completion: "Program Tamamlama Sertifikası",
      competency: "Yetkinlik Sertifikası",
      course: "Kurs tamamlama · Coursera",
      hour: "saatlik program",
      open: "Sertifikayı aç",
    },
    contact: {
      eyebrow: "İletişime geçelim",
      title: "İletişime geçelim",
      intro:
        "Yeni bir fırsat, teknik bir problem veya bir iş talebi. Sizden duymak isterim.",
      cta: "Birlikte bir şeyler üretelim",
      copy: "Kopyala",
      copied: "Kopyalandı",
      failed: "E-posta bağlantısını kullan",
      copyLabel: "E-posta adresini kopyala",
      success: "E-posta adresi panoya kopyalandı.",
      failure:
        "Kopyalama kullanılamıyor. E-posta adresini seçin veya e-posta bağlantısını kullanın.",
      based: "Şu anda İstanbul’da",
      local: "yerel saat",
      back: "Başa dön",
    },
    footer: {
      thanks: "Uğradığınız için teşekkürler",
    },
  },
};
