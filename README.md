# Ömer Meraloğlu — Portfolio

A React portfolio for software engineering, data science, and applied AI. Includes an interactive Three.js composition of satin-metal forms, filterable project gallery, career timeline, current CV, and six certificates. English is the default, with German and Turkish available in that order. A selected language is remembered locally; `?lang=de` and `?lang=tr` provide shareable language links.

## Local development

Use Node.js 22 or 24.

```sh
npm ci
npm run dev
```

The application is in `src/`. Translated content and project links are maintained in `src/content.js`. `npm run check` validates translation coverage, project links, and language ordering. Static documents, images, and self-hosted fonts are in `public/`. Three.js is loaded separately from the main React bundle. The scene pauses when it is offscreen or the tab is hidden, respects reduced motion, and releases its graphics resources on unmount. When WebGL is unavailable, a CSS illustration preserves the composition.

## Build and deploy

```sh
npm run publish:prepare
git add .
git commit -m "Update portfolio"
git push origin master
```

The production build pre-renders the React content into HTML and hydrates it in the browser. `publish:prepare` copies that build to the repository root, where the existing GitHub Pages configuration serves it. `dist/` is temporary and ignored. Keep the generated root `index.html` and `assets/` committed alongside the editable source. Edit `src/` and `public/`; generated root files are overwritten by the next build.

GitHub Pages publishes `master` at [www.omermeraloglu.com](https://www.omermeraloglu.com/). The `CNAME` file retains the custom domain. Domain registration is managed separately from website hosting.

## Content

Current projects: Steamcast, First Light, IEEE-CIS Fraud Detection, Story Seeds, and Agentic RAG. Steamcast includes the live demo, pipeline and interface repositories. Its description is grounded in the owner’s supplied LinkedIn post and the public pipeline README. Its thumbnail is a capture of the live application with an example prediction, not a claimed model performance result. Fraud detection is described as collaborative work; its model metrics come from the project's public README. Story Seeds is described as a commemorative concept, without implying UN sponsorship. Certificates confirm both Workintech programs were completed in 2026, superseding the CV's older “ongoing” wording on the webpage. The downloadable CV is the file supplied by its owner.

## Attribution

The orbiting chrome forms are an abstract map of eight professional strengths. The central form is a restrained interwoven sculpture with a soft brushed-metal finish. Pointer dragging and keyboard controls allow unrestricted rotation; named callouts reveal localized descriptions. Three.js is MIT licensed. Font licenses are in `public/assets/fonts/`. Project thumbnails are captures of the owner's public sites. The portrait was extracted from the supplied CV. No third-party analytics or contact-form service is used.
