import assert from "node:assert/strict";
import { orbitData } from "../src/orbit-data.js";
import {
  content,
  languages,
  projectData,
  certificateData,
} from "../src/content.js";

function leafPaths(value, prefix = "") {
  if (typeof value === "string") {
    assert.ok(value.trim(), `Empty translation: ${prefix}`);
    return [prefix];
  }
  return Object.entries(value).flatMap(([key, item]) =>
    leafPaths(item, `${prefix}.${key}`),
  );
}
assert.deepEqual(
  languages.map((language) => language.code),
  ["en", "de", "tr"],
);
const englishKeys = leafPaths(content.en).sort();
for (const { code } of languages) {
  assert.deepEqual(
    leafPaths(content[code]).sort(),
    englishKeys,
    `Incomplete translation coverage: ${code}`,
  );
  assert.deepEqual(
    Object.keys(content[code].projects).sort(),
    projectData.map((project) => project.id).sort(),
  );
  assert.equal(content[code].orbit.aspects.length, orbitData.length);
  assert.ok(
    !/solar system|Sonnensystem|Güneş Sistemi/i.test(
      JSON.stringify(content[code]),
    ),
  );
  assert.ok(!Object.hasOwn(content[code].orbit, "all"));
  assert.ok(!Object.hasOwn(content[code].orbit, "inner"));
  assert.ok(!Object.hasOwn(content[code].orbit, "outer"));
}
assert.equal(orbitData.length, 8);
assert.equal(new Set(orbitData.map((form) => form.id)).size, 8);
assert.equal(
  new Set(projectData.map((project) => project.id)).size,
  projectData.length,
);
for (const project of projectData) {
  for (const key of ["url", "pipeline", "code"]) {
    if (project[key]) assert.equal(new URL(project[key]).protocol, "https:");
  }
  assert.ok(project.categories.length > 0);
  assert.ok(
    project.categories.every((category) =>
      ["software", "data"].includes(category),
    ),
  );
}
assert.equal(
  projectData.find((project) => project.id === "steamcast").url,
  "https://steamcast.streamlit.app/",
);
assert.equal(certificateData.length, 6);
console.log(
  `Content checks passed: ${languages.length} complete languages, ${projectData.length} projects, ${certificateData.length} certificates.`,
);
