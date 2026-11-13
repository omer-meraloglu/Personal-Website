import * as THREE from "three";

// Planet surfaces are drawn locally. The illustration has no remote texture requests.
function surfaceTexture(kind, colors) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (kind === "earth") {
    ctx.fillStyle = "#286caa";
    ctx.fillRect(0, 0, 512, 256);
    const continents = [
      [
        [0.1, 0.2],
        [0.2, 0.12],
        [0.31, 0.2],
        [0.27, 0.34],
        [0.21, 0.42],
        [0.17, 0.37],
        [0.13, 0.26],
      ],
      [
        [0.25, 0.43],
        [0.34, 0.47],
        [0.35, 0.59],
        [0.3, 0.76],
        [0.27, 0.86],
        [0.24, 0.66],
      ],
      [
        [0.46, 0.28],
        [0.52, 0.22],
        [0.57, 0.28],
        [0.55, 0.36],
        [0.48, 0.37],
      ],
      [
        [0.47, 0.38],
        [0.57, 0.39],
        [0.61, 0.51],
        [0.55, 0.71],
        [0.49, 0.64],
        [0.44, 0.48],
      ],
      [
        [0.55, 0.22],
        [0.7, 0.14],
        [0.86, 0.22],
        [0.88, 0.37],
        [0.77, 0.39],
        [0.73, 0.52],
        [0.64, 0.42],
        [0.58, 0.34],
      ],
      [
        [0.77, 0.64],
        [0.86, 0.61],
        [0.9, 0.7],
        [0.84, 0.77],
        [0.77, 0.73],
      ],
    ];
    ctx.fillStyle = "#78a589";
    continents.forEach((points) => {
      ctx.beginPath();
      points.forEach(([x, y], index) =>
        index ? ctx.lineTo(x * 512, y * 256) : ctx.moveTo(x * 512, y * 256),
      );
      ctx.closePath();
      ctx.fill();
    });
    ctx.fillStyle = "#e2ede1";
    ctx.fillRect(0, 0, 512, 13);
    ctx.fillRect(0, 242, 512, 14);
    ctx.strokeStyle = "#ffffff40";
    ctx.lineWidth = 8;
    for (let i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.ellipse(i * 94, 45 + ((i * 37) % 160), 65, 8, -0.2, 0, Math.PI * 1.7);
      ctx.stroke();
    }
  } else {
    const palette = colors.map((color) => new THREE.Color(color));
    const pixels = ctx.createImageData(512, 256);
    for (let y = 0; y < 256; y++)
      for (let x = 0; x < 512; x++) {
        const grain = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
        const bands =
          kind === "jupiter" || kind === "saturn"
            ? Math.sin(y * 0.34 + Math.sin(x * 0.025) * 0.8) +
              Math.sin(y * 0.11) * 0.6
            : Math.sin(x * 0.07 + y * 0.05) + Math.cos(y * 0.09 - x * 0.02);
        const amount = Math.max(
          0,
          Math.min(1, 0.5 + bands * 0.22 + grain * 0.08),
        );
        const color = palette[0].clone().lerp(palette[1], amount);
        color.convertLinearToSRGB();
        const i = (y * 512 + x) * 4;
        pixels.data[i] = color.r * 255;
        pixels.data[i + 1] = color.g * 255;
        pixels.data[i + 2] = color.b * 255;
        pixels.data[i + 3] = 255;
      }
    ctx.putImageData(pixels, 0, 0);
    if (kind === "jupiter") {
      ctx.fillStyle = "#a3603e";
      ctx.beginPath();
      ctx.ellipse(180, 157, 31, 11, -0.1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function glowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255,204,91,.7)");
  gradient.addColorStop(0.25, "rgba(255,176,55,.25)");
  gradient.addColorStop(1, "rgba(255,175,40,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

export function createScene(container, onReady) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  container.appendChild(renderer.domElement);
  renderer.domElement.setAttribute("aria-hidden", "true");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 0, 19.5);
  const system = new THREE.Group();
  scene.add(system);
  system.rotation.set(0.6, 0.12, -0.38);
  scene.add(new THREE.AmbientLight(0xffffff, 1.1));
  const sunLight = new THREE.PointLight(0xffe1a0, 28, 30, 1.5);
  scene.add(sunLight);
  const fill = new THREE.DirectionalLight(0xe4efff, 2.2);
  fill.position.set(-4, 5, 8);
  scene.add(fill);
  const textures = [];
  const sunMap = surfaceTexture("sun", ["#dc7515", "#ffd66b"]);
  textures.push(sunMap);
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(0.72, 48, 32),
    new THREE.MeshBasicMaterial({ map: sunMap }),
  );
  system.add(sun);
  const glowMap = glowTexture();
  textures.push(glowMap);
  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowMap,
      transparent: true,
      depthWrite: false,
    }),
  );
  halo.scale.set(4.2, 4.2, 1);
  system.add(halo);
  const specs = [
    {
      name: "Mercury",
      r: 1.06,
      size: 0.09,
      speed: 0.43,
      angle: 0.3,
      colors: ["#8c8378", "#c7b7a2"],
    },
    {
      name: "Venus",
      r: 1.48,
      size: 0.17,
      speed: 0.32,
      angle: 2.2,
      colors: ["#b77935", "#e9c58b"],
    },
    {
      name: "Earth",
      r: 1.97,
      size: 0.19,
      speed: 0.25,
      angle: 4.6,
      kind: "earth",
    },
    {
      name: "Mars",
      r: 2.48,
      size: 0.14,
      speed: 0.2,
      angle: 3.1,
      colors: ["#9e4b2c", "#d28656"],
    },
    {
      name: "Jupiter",
      r: 3.18,
      size: 0.4,
      speed: 0.105,
      angle: 5.8,
      kind: "jupiter",
      colors: ["#986344", "#efd5b0"],
    },
    {
      name: "Saturn",
      r: 4.02,
      size: 0.33,
      speed: 0.075,
      angle: 2.1,
      kind: "saturn",
      colors: ["#ba9e66", "#ead8ac"],
    },
    {
      name: "Uranus",
      r: 4.85,
      size: 0.24,
      speed: 0.055,
      angle: 3.8,
      colors: ["#79afb7", "#bce0df"],
    },
    {
      name: "Neptune",
      r: 5.6,
      size: 0.23,
      speed: 0.04,
      angle: 0.9,
      colors: ["#284f9c", "#5083c1"],
    },
  ];
  const planets = specs.map((spec, index) => {
    const path = new THREE.Group();
    path.name = spec.name;
    system.add(path);
    const points = Array.from(
      { length: 160 },
      (_, i) =>
        new THREE.Vector3(
          Math.cos((i / 160) * Math.PI * 2) * spec.r,
          Math.sin((i / 160) * Math.PI * 2) * spec.r,
          0,
        ),
    );
    const orbit = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({
        color: 0x899c76,
        transparent: true,
        opacity: index < 4 ? 0.55 : 0.44,
      }),
    );
    path.add(orbit);
    const map = surfaceTexture(
      spec.kind || spec.name.toLowerCase(),
      spec.colors,
    );
    textures.push(map);
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(spec.size, 40, 24),
      new THREE.MeshStandardMaterial({ map, roughness: 0.8, metalness: 0.05 }),
    );
    path.add(planet);
    if (spec.name === "Saturn") {
      const rings = new THREE.Mesh(
        new THREE.RingGeometry(0.4, 0.63, 96),
        new THREE.MeshStandardMaterial({
          color: 0xd7c49d,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.78,
          roughness: 1,
        }),
      );
      rings.rotation.set(0.6, 0.25, 0);
      planet.add(rings);
      const gap = new THREE.Mesh(
        new THREE.RingGeometry(0.5, 0.52, 96),
        new THREE.MeshBasicMaterial({
          color: 0x988b72,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.4,
        }),
      );
      rings.add(gap);
    }
    if (spec.name === "Earth") {
      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 16, 12),
        new THREE.MeshStandardMaterial({ color: 0xb9b6a9, roughness: 1 }),
      );
      moon.position.set(0.26, 0.08, 0.06);
      planet.add(moon);
    }
    return { path, planet, spec, index, angle: spec.angle };
  });
  // Small asteroids give the terrestrial and giant-planet regions a quiet boundary.
  const asteroids = new Float32Array(240 * 3);
  for (let i = 0; i < 240; i++) {
    const angle = i * 2.399963,
      r = 2.78 + Math.sin(i * 11.3) * 0.1;
    asteroids.set(
      [Math.cos(angle) * r, Math.sin(angle) * r, Math.cos(i * 5.1) * 0.025],
      i * 3,
    );
  }
  const asteroidGeometry = new THREE.BufferGeometry();
  asteroidGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(asteroids, 3),
  );
  const belt = new THREE.Points(
    asteroidGeometry,
    new THREE.PointsMaterial({
      color: 0x9b9582,
      size: 0.024,
      transparent: true,
      opacity: 0.5,
    }),
  );
  system.add(belt);
  let paused = true,
    inView = true,
    dragging = false,
    destroyed = false,
    lastX = 0,
    lastY = 0,
    lastTime = 0,
    animationId = 0;
  function positionPlanets() {
    planets.forEach(({ planet, spec, angle }) =>
      planet.position.set(
        Math.cos(angle) * spec.r,
        Math.sin(angle) * spec.r,
        0,
      ),
    );
  }
  positionPlanets();
  const render = () => {
    if (!destroyed) renderer.render(scene, camera);
  };
  function frame(time) {
    animationId = 0;
    const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.04) : 0;
    lastTime = time;
    planets.forEach((body) => {
      body.angle += delta * body.spec.speed;
      body.planet.rotation.y += delta * 0.18;
    });
    sun.rotation.y += delta * 0.035;
    positionPlanets();
    render();
    if (!paused && inView && !document.hidden && !destroyed)
      animationId = requestAnimationFrame(frame);
  }
  function start() {
    if (!paused && inView && !document.hidden && !animationId && !destroyed) {
      lastTime = 0;
      animationId = requestAnimationFrame(frame);
    }
  }
  function stop() {
    cancelAnimationFrame(animationId);
    animationId = 0;
  }
  const listeners = [];
  function listen(target, event, callback, options) {
    target.addEventListener(event, callback, options);
    listeners.push(() => target.removeEventListener(event, callback, options));
  }
  listen(container, "pointerdown", (event) => {
    if (event.button !== 0) return;
    dragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    container.setPointerCapture(event.pointerId);
  });
  listen(container, "pointermove", (event) => {
    if (!dragging) return;
    system.rotation.z += (event.clientX - lastX) * 0.006;
    system.rotation.x = THREE.MathUtils.clamp(
      system.rotation.x + (event.clientY - lastY) * 0.006,
      -0.4,
      1.3,
    );
    lastX = event.clientX;
    lastY = event.clientY;
    render();
  });
  ["pointerup", "pointercancel", "lostpointercapture"].forEach((event) =>
    listen(container, event, () => {
      dragging = false;
    }),
  );
  function resize() {
    const width = container.clientWidth,
      height = container.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.position.z = width / height < 0.8 ? 22 : 19.5;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    render();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  const viewObserver = new IntersectionObserver(
    (entries) => {
      inView = entries[0].isIntersecting;
      if (inView) start();
      else stop();
    },
    { threshold: 0.01 },
  );
  viewObserver.observe(container);
  listen(document, "visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });
  listen(renderer.domElement, "webglcontextlost", (event) => {
    event.preventDefault();
    stop();
    renderer.domElement.hidden = true;
    onReady(false);
  });
  listen(renderer.domElement, "webglcontextrestored", () => {
    renderer.domElement.hidden = false;
    onReady(true);
    resize();
    start();
  });
  resize();
  return {
    setMode(mode) {
      planets.forEach((body) => {
        body.path.visible =
          mode === "all" ||
          (mode === "inner" ? body.index < 4 : body.index >= 4);
      });
      belt.visible = mode === "all";
      system.scale.setScalar(mode === "inner" ? 2.05 : 1);
      render();
    },
    setPaused(value) {
      paused = value;
      if (paused) stop();
      else start();
    },
    rotate(direction) {
      system.rotation.z += direction * 0.25;
      render();
    },
    destroy() {
      destroyed = true;
      stop();
      resizeObserver.disconnect();
      viewObserver.disconnect();
      listeners.forEach((remove) => remove());
      const geometries = new Set(),
        materials = new Set();
      scene.traverse((object) => {
        if (object.geometry) geometries.add(object.geometry);
        if (object.material) materials.add(object.material);
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
