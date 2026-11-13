import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

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
  renderer.toneMappingExposure = 1.3;
  container.appendChild(renderer.domElement);
  renderer.domElement.setAttribute("aria-hidden", "true");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 0.15, 10);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = new RoomEnvironment();
  const envTarget = pmrem.fromScene(environment, 0.04);
  scene.environment = envTarget.texture;
  environment.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x697b4a, 2));
  const light = new THREE.DirectionalLight(0xfff5df, 4);
  light.position.set(-3, 5, 4);
  scene.add(light);
  const blueLight = new THREE.DirectionalLight(0x9babff, 2.5);
  blueLight.position.set(4, -1, 2);
  scene.add(blueLight);
  const group = new THREE.Group();
  scene.add(group);
  group.rotation.set(0.42, -0.45, -0.27);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xa4b18c,
    metalness: 0.95,
    roughness: 0.22,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.6,
  });
  const core = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.28, 0.43, 192, 32, 2, 3),
    material,
  );
  group.add(core);
  const orbit = new THREE.Group();
  group.add(orbit);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x8f9b7b,
    transparent: true,
    opacity: 0.35,
  });
  const ringPoints = Array.from(
    { length: 128 },
    (_, i) =>
      new THREE.Vector3(
        Math.cos((i / 128) * Math.PI * 2) * 2.35,
        Math.sin((i / 128) * Math.PI * 2) * 2.35,
        0,
      ),
  );
  const ring = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(ringPoints),
    lineMaterial,
  );
  ring.rotation.x = 1.15;
  ring.rotation.y = 0.3;
  orbit.add(ring);
  const satelliteMaterial = new THREE.MeshStandardMaterial({
    color: 0x3049dd,
    metalness: 0.8,
    roughness: 0.2,
    envMapIntensity: 1.5,
  });
  const satellite = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 24, 16),
    satelliteMaterial,
  );
  satellite.position.set(2.15, 0.35, -0.55);
  orbit.add(satellite);
  const satelliteTwo = new THREE.Mesh(
    new THREE.SphereGeometry(0.075, 16, 12),
    material,
  );
  satelliteTwo.position.set(-1.9, -0.8, 0.8);
  orbit.add(satelliteTwo);
  const positions = new Float32Array(260 * 3);
  for (let i = 0; i < 260; i++) {
    const y = 1 - (i / 259) * 2,
      radius = Math.sqrt(1 - y * y),
      theta = i * Math.PI * (3 - Math.sqrt(5));
    positions.set(
      [
        Math.cos(theta) * radius * 1.85,
        y * 1.85,
        Math.sin(theta) * radius * 1.85,
      ],
      i * 3,
    );
  }
  const pointGeometry = new THREE.BufferGeometry();
  pointGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );
  const points = new THREE.Points(
    pointGeometry,
    new THREE.PointsMaterial({
      color: 0x3049dd,
      size: 0.055,
      sizeAttenuation: true,
    }),
  );
  points.visible = false;
  group.add(points);
  const wire = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.55, 1)),
    new THREE.LineBasicMaterial({
      color: 0x799453,
      transparent: true,
      opacity: 0.24,
    }),
  );
  wire.visible = false;
  group.add(wire);
  let currentMode = "code",
    paused = true,
    inView = true,
    dragging = false,
    destroyed = false;
  let lastX = 0,
    lastY = 0,
    hoverX = 0,
    hoverY = 0,
    lastTime = 0,
    animationId = 0;
  const render = () => {
    if (!destroyed) renderer.render(scene, camera);
  };
  function frame(time) {
    animationId = 0;
    const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.04) : 0;
    lastTime = time;
    if (!dragging) {
      core.rotation.y += delta * 0.17;
      core.rotation.z += delta * 0.05;
      points.rotation.y += delta * 0.13;
      wire.rotation.y += delta * 0.13;
      group.rotation.x += (hoverY * 0.13 + 0.42 - group.rotation.x) * 0.025;
      group.rotation.y += (hoverX * 0.15 - 0.45 - group.rotation.y) * 0.025;
    }
    orbit.rotation.y += delta * 0.15;
    group.position.y = Math.sin(time / 1800) * 0.075;
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
  function setMode(mode) {
    if (mode !== currentMode) {
      core.geometry.dispose();
      core.geometry =
        mode === "ai"
          ? new THREE.TorusKnotGeometry(1.22, 0.29, 192, 24, 3, 4)
          : new THREE.TorusKnotGeometry(1.28, 0.43, 192, 32, 2, 3);
      currentMode = mode;
    }
    core.visible = mode !== "data";
    points.visible = wire.visible = mode === "data";
    material.color.setHex(mode === "ai" ? 0x899bcb : 0xa4b18c);
    core.rotation.set(0, 0, 0);
    render();
  }
  function rotate(direction) {
    [core, points, wire].forEach(
      (object) => (object.rotation.y += direction * 0.4),
    );
    render();
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
    const bounds = container.getBoundingClientRect();
    hoverX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    hoverY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    if (dragging) {
      [core, points, wire].forEach((object) => {
        object.rotation.y += (event.clientX - lastX) * 0.008;
        object.rotation.x += (event.clientY - lastY) * 0.008;
      });
      lastX = event.clientX;
      lastY = event.clientY;
      render();
    }
  });
  ["pointerup", "pointercancel", "lostpointercapture"].forEach((event) =>
    listen(container, event, () => {
      dragging = false;
    }),
  );
  listen(container, "pointerleave", () => {
    hoverX = hoverY = 0;
  });
  function resize() {
    const width = container.clientWidth,
      height = container.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.position.z = width < 400 ? 10.8 : 10;
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
    setMode,
    rotate,
    setPaused(value) {
      paused = value;
      if (paused) stop();
      else start();
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
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      envTarget.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
