import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { orbitData } from "./orbit-data.js";

function brushedTexture(seed = 1) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  const pixels = ctx.createImageData(256, 128);
  for (let y = 0; y < 128; y++)
    for (let x = 0; x < 256; x++) {
      const grain = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
      const value =
        190 +
        Math.sin(y * 0.68 + Math.sin(x * 0.025 + seed) * 0.6) * 14 +
        (grain - Math.floor(grain)) * 9;
      const index = (y * 256 + x) * 4;
      pixels.data[index] =
        pixels.data[index + 1] =
        pixels.data[index + 2] =
          value;
      pixels.data[index + 3] = 255;
    }
  ctx.putImageData(pixels, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

export function createScene(container, onReady, onSelect) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  container.appendChild(renderer.domElement);
  renderer.domElement.setAttribute("aria-hidden", "true");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 0, 21);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x7a8963, 1.6));
  const key = new THREE.DirectionalLight(0xfff6e8, 3.4);
  key.position.set(-3, 5, 6);
  scene.add(key);
  const accent = new THREE.DirectionalLight(0x9baeff, 2.1);
  accent.position.set(4, -1, 3);
  scene.add(accent);
  const assembly = new THREE.Group();
  assembly.rotation.set(0.6, 0.12, -0.38);
  scene.add(assembly);
  const initialOrientation = assembly.quaternion.clone();
  const textures = [];
  const coreBrush = brushedTexture(19);
  textures.push(coreBrush);
  const coreGeometry = new THREE.TorusKnotGeometry(0.46, 0.16, 144, 24, 2, 3);
  const core = new THREE.Mesh(
    coreGeometry,
    new THREE.MeshPhysicalMaterial({
      color: 0xaeb99c,
      metalness: 0.72,
      roughness: 0.68,
      roughnessMap: coreBrush,
      clearcoat: 0.12,
      clearcoatRoughness: 0.45,
      envMapIntensity: 0.75,
    }),
  );
  core.rotation.set(0.3, -0.2, 0.35);
  assembly.add(core);
  const bodies = orbitData.map((spec, index) => {
    const path = new THREE.Group();
    assembly.add(path);
    const points = Array.from(
      { length: 160 },
      (_, i) =>
        new THREE.Vector3(
          Math.cos((i / 160) * Math.PI * 2) * spec.radius,
          Math.sin((i / 160) * Math.PI * 2) * spec.radius,
          0,
        ),
    );
    path.add(
      new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({
          color: 0x9ca98e,
          transparent: true,
          opacity: index < 4 ? 0.45 : 0.3,
        }),
      ),
    );
    const brush = brushedTexture(index + 1);
    textures.push(brush);
    const material = new THREE.MeshPhysicalMaterial({
      color: spec.color,
      metalness: 0.72,
      roughness: spec.roughness,
      roughnessMap: brush,
      bumpMap: brush,
      bumpScale: 0.001,
      clearcoat: 0.15,
      clearcoatRoughness: 0.4,
      envMapIntensity: 0.85,
    });
    const form = new THREE.Mesh(
      new THREE.SphereGeometry(spec.size, 48, 32),
      material,
    );
    form.userData.index = index;
    path.add(form);
    if (spec.ring) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.39, 0.61, 96),
        new THREE.MeshPhysicalMaterial({
          color: 0xb9bfad,
          metalness: 0.75,
          roughness: 0.5,
          side: THREE.DoubleSide,
          envMapIntensity: 0.8,
          clearcoat: 0.1,
        }),
      );
      ring.rotation.set(0.65, 0.2, 0.1);
      form.add(ring);
    }
    return {
      spec,
      index,
      path,
      form,
      angle: spec.angle,
      marker: container.querySelector(`[data-orbit-marker="${index}"]`),
      connector: container.querySelector(`[data-orbit-connector="${index}"]`),
      labelWidth: 0,
      labelHeight: 0,
      screenX: 0,
      screenY: 0,
    };
  });
  const connectionPositions = new Float32Array(220 * 3);
  for (let i = 0; i < 220; i++) {
    const angle = i * 2.399963,
      radius = 3.25 + Math.sin(i * 11.3) * 0.08;
    connectionPositions.set(
      [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        Math.cos(i * 5.1) * 0.02,
      ],
      i * 3,
    );
  }
  const connectionGeometry = new THREE.BufferGeometry();
  connectionGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(connectionPositions, 3),
  );
  assembly.add(
    new THREE.Points(
      connectionGeometry,
      new THREE.PointsMaterial({
        color: 0x9da78f,
        size: 0.021,
        transparent: true,
        opacity: 0.35,
      }),
    ),
  );
  const projected = new THREE.Vector3();
  const world = new THREE.Vector3();
  const corePosition = new THREE.Vector3();
  let labelsDirty = true;
  let selected = 0,
    paused = true,
    inView = true,
    dragging = false,
    destroyed = false,
    lastTime = 0,
    animationId = 0,
    width = 1,
    height = 1;
  function positionBodies() {
    bodies.forEach((body) =>
      body.form.position.set(
        Math.cos(body.angle) * body.spec.radius,
        Math.sin(body.angle) * body.spec.radius,
        0,
      ),
    );
  }
  positionBodies();
  function layoutLabels() {
    const labels = bodies.filter((body) => body.marker);
    if (labelsDirty) {
      labels.forEach((body) => {
        body.labelWidth = body.marker.offsetWidth;
        body.labelHeight = body.marker.offsetHeight;
      });
      labelsDirty = false;
    }
    labels.sort((a, b) => a.screenX - b.screenX);
    for (let side = 0; side < 2; side++) {
      const column = labels
        .slice(side * 4, side * 4 + 4)
        .sort((a, b) => a.screenY - b.screenY);
      let bottom = 22;
      column.forEach((body) => {
        body.labelY = Math.max(
          bottom,
          Math.min(
            height - body.labelHeight - 22,
            body.screenY - body.labelHeight / 2,
          ),
        );
        bottom = body.labelY + body.labelHeight + 12;
      });
      let ceiling = height - 22;
      for (let i = column.length - 1; i >= 0; i--) {
        const body = column[i];
        body.labelY = Math.min(body.labelY, ceiling - body.labelHeight);
        ceiling = body.labelY - 12;
      }
      column.forEach((body) => {
        const labelX = side === 0 ? 5 : width - body.labelWidth - 5;
        body.marker.style.transform = `translate3d(${labelX}px,${body.labelY}px,0)`;
        body.marker.style.zIndex = body.index === selected ? "20" : "12";
        body.marker.style.opacity = "1";
        if (body.connector) {
          body.connector.setAttribute("x1", String(body.screenX));
          body.connector.setAttribute("y1", String(body.screenY));
          body.connector.setAttribute(
            "x2",
            String(side === 0 ? labelX + body.labelWidth : labelX),
          );
          body.connector.setAttribute(
            "y2",
            String(body.labelY + body.labelHeight / 2),
          );
        }
      });
    }
  }
  function render() {
    if (destroyed) return;
    renderer.render(scene, camera);
    bodies.forEach((body) => {
      body.form.getWorldPosition(world);
      projected.copy(world).project(camera);
      body.screenX = (projected.x * 0.5 + 0.5) * width;
      body.screenY = (-projected.y * 0.5 + 0.5) * height;
    });
    layoutLabels();
  }

  function frame(time) {
    animationId = 0;
    const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.04) : 0;
    lastTime = time;
    bodies.forEach((body) => {
      body.angle += delta * body.spec.speed;
      body.form.rotation.y += delta * 0.1;
    });
    core.rotation.y += delta * 0.035;
    positionBodies();
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
  const rotation = new THREE.Quaternion();
  const euler = new THREE.Euler();
  function rotate(horizontal, vertical = 0) {
    rotation.setFromEuler(euler.set(vertical, horizontal, 0, "XYZ"));
    assembly.quaternion.premultiply(rotation).normalize();
    render();
  }
  const raycaster = new THREE.Raycaster(),
    pointer = new THREE.Vector2();
  let lastX = 0,
    lastY = 0,
    startX = 0,
    startY = 0,
    moved = false;
  listen(container, "pointerdown", (event) => {
    if (event.button !== 0 || event.target.closest("button")) return;
    dragging = true;
    moved = false;
    lastX = startX = event.clientX;
    lastY = startY = event.clientY;
    container.setPointerCapture(event.pointerId);
    container.classList.add("is-dragging");
  });
  listen(container, "pointermove", (event) => {
    if (!dragging) return;
    if (Math.hypot(event.clientX - startX, event.clientY - startY) > 4)
      moved = true;
    // Incremental quaternions allow unlimited movement across both axes, including the poles.
    rotate((event.clientX - lastX) * 0.009, (event.clientY - lastY) * 0.009);
    lastX = event.clientX;
    lastY = event.clientY;
  });
  listen(container, "pointerup", (event) => {
    if (dragging && !moved) {
      const bounds = container.getBoundingClientRect();
      pointer.set(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        (-(event.clientY - bounds.top) / bounds.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(
        bodies.map((body) => body.form),
        false,
      )[0];
      if (hit) onSelect(hit.object.userData.index);
    }
    dragging = false;
    container.classList.remove("is-dragging");
  });
  ["pointercancel", "lostpointercapture"].forEach((event) =>
    listen(container, event, () => {
      dragging = false;
      container.classList.remove("is-dragging");
    }),
  );
  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.position.z = Math.max(
      20.3,
      6.6 /
        (Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) *
          Math.min(camera.aspect, 1)),
    );
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    labelsDirty = true;
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
    setSelected(index) {
      selected = index;
      bodies.forEach((body) => {
        body.form.material.emissive.setHex(
          body.index === selected ? 0x15224d : 0,
        );
        body.form.material.emissiveIntensity = 0.06;
        if (body.connector)
          body.connector.dataset.selected = String(body.index === selected);
      });
      render();
    },
    refreshLabels() {
      labelsDirty = true;
      render();
    },
    setPaused(value) {
      paused = value;
      if (paused) stop();
      else start();
    },
    rotate(horizontal, vertical = 0) {
      rotate(horizontal * 0.35, vertical * 0.35);
    },
    reset() {
      assembly.quaternion.copy(initialOrientation);
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
      textures.forEach((texture) => texture.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      bodies.forEach((body) => body.marker?.style.removeProperty("transform"));
    },
  };
}
