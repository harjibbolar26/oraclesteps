<script setup lang="ts">
import * as THREE from "three";
const host = ref<HTMLDivElement>();
let cleanup = () => {};
onMounted(() => {
  if (
    !host.value ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const el = host.value;
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
  } catch {
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  el.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0f19, 0.04);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 12, 24);
  camera.lookAt(0, 0, 0);
  const geometry = new THREE.PlaneGeometry(68, 40, 68, 40);
  geometry.rotateX(-Math.PI / 2);
  const base = Float32Array.from(geometry.attributes.position.array);
  const material = new THREE.MeshBasicMaterial({
    color: 0x387de3,
    wireframe: true,
    transparent: true,
    opacity: 0.23,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.z = -0.15;
  scene.add(mesh);
  const pointsMaterial = new THREE.PointsMaterial({
    color: 0x72adff,
    size: 0.055,
    transparent: true,
    opacity: 0.6,
  });
  const points = new THREE.Points(geometry, pointsMaterial);
  points.rotation.copy(mesh.rotation);
  scene.add(points);
  let frame = 0,
    last = 0,
    visible = true;
  const pointer = { x: 0, y: 0 };
  const resize = () => {
    const w = el.clientWidth,
      h = el.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(el);
  const move = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth - 0.5) * 20;
    pointer.y = (e.clientY / window.innerHeight - 0.5) * 10;
  };
  const draw = (time: number) => {
    frame = requestAnimationFrame(draw);
    if (!visible || time - last < 32) return;
    last = time;
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3],
        z = base[i * 3 + 2];
      const d = Math.hypot(x - pointer.x, z - pointer.y);
      pos.setY(
        i,
        Math.sin(x * 0.19 + time * 0.00025) * 1.45 +
          Math.cos(z * 0.27 + time * 0.0002) * 0.8 +
          Math.exp(-d * 0.2) * 0.7,
      );
    }
    pos.needsUpdate = true;
    renderer.render(scene, camera);
  };
  const intersection = new IntersectionObserver(
    ([entry]) => (visible = entry.isIntersecting),
  );
  intersection.observe(el);
  const visibility = () => (visible = !document.hidden);
  window.addEventListener("pointermove", move, { passive: true });
  document.addEventListener("visibilitychange", visibility);
  resize();
  frame = requestAnimationFrame(draw);
  cleanup = () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    intersection.disconnect();
    window.removeEventListener("pointermove", move);
    document.removeEventListener("visibilitychange", visibility);
    geometry.dispose();
    material.dispose();
    pointsMaterial.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
});
onBeforeUnmount(() => cleanup());
</script>
<template><div ref="host" class="quantum-mesh" aria-hidden="true" /></template>
