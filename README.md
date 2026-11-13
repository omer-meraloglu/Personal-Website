# Ömer Meraloğlu — Portfolio

A React portfolio for software engineering, data science, and applied AI. Includes an interactive Three.js scene, filterable project gallery, career timeline, current CV, and six certificates.

## Local development

Use Node.js 22 or 24.

```sh
npm ci
npm run dev
```

The application is in `src/`. Static documents, images, and self-hosted fonts are in `public/`. Three.js is loaded separately from the main React bundle. The scene pauses when it is offscreen or the tab is hidden, respects reduced motion, and releases its graphics resources on unmount. When WebGL is unavailable, a CSS illustration preserves the composition.

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

Current projects: First Light, IEEE-CIS Fraud Detection, Story Seeds, and Agentic RAG. Fraud detection is described as collaborative work; its model metrics come from the project's public README. Story Seeds is described as a commemorative concept, without implying UN sponsorship. Certificates confirm both Workintech programs were completed in 2026, superseding the CV's older “ongoing” wording on the webpage. The downloadable CV is the file supplied by its owner.

## Attribution

Three.js is MIT licensed. Font licenses are in `public/assets/fonts/`. Project thumbnails are captures of the owner's public sites. The portrait was extracted from the supplied CV. No third-party analytics or contact-form service is used.
