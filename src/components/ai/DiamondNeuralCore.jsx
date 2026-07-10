"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function DiamondNeuralCore() {
  const wrapper = useRef();
  const canvas = useRef();

  const [mode, setMode] = useState("RAW SIGNALS");

  useEffect(() => {
    const container = canvas.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);

    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,

      antialias: true,
    });

    const size = container.clientWidth;

    renderer.setSize(size, size);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    const COUNT = 700;

    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(COUNT * 3);

    const raw = [];

    const diamond = [];

    for (let i = 0; i < COUNT; i++) {
      // RANDOM PARTICLES

      const r = 2 + Math.random() * 3;

      const theta = Math.random() * Math.PI * 2;

      const phi = Math.random() * Math.PI;

      raw.push({
        x: r * Math.sin(phi) * Math.cos(theta),

        y: r * Math.sin(phi) * Math.sin(theta),

        z: r * Math.cos(phi),
      });

      // DIAMOND FORM

      const t = Math.random() * Math.PI * 2;

      const y = (Math.random() - 0.5) * 3;

      const width = 1.7 * (1 - Math.abs(y) / 1.5);

      diamond.push({
        x: Math.cos(t) * width,

        y,

        z: Math.sin(t) * width,
      });

      positions[i * 3] = raw[i].x;

      positions[i * 3 + 1] = raw[i].y;

      positions[i * 3 + 2] = raw[i].z;
    }

    geometry.setAttribute(
      "position",

      new THREE.BufferAttribute(positions, 3),
    );

    const material = new THREE.PointsMaterial({
      color: "#67e8f9",

      size: 0.045,

      transparent: true,

      opacity: 0.9,
    });

    const points = new THREE.Points(geometry, material);

    scene.add(points);

    const progress = {
      value: 0,
    };

    const trigger = ScrollTrigger.create({
      trigger: wrapper.current,

      start: "top 75%",

      end: "center center",

      scrub: 2,

      onUpdate(self) {
        progress.value = self.progress;

        if (self.progress < 0.4) setMode("RAW SIGNALS");
        else if (self.progress < 0.8) setMode("FORMING CORE");
        else setMode("DIAMOND INTELLIGENCE");
      },
    });

    const mouse = {
      x: 0,

      y: 0,
    };

    function move(e) {
      mouse.x = e.clientX / window.innerWidth - 0.5;

      mouse.y = e.clientY / window.innerHeight - 0.5;
    }

    window.addEventListener("mousemove", move);

    let frame;

    function animate() {
      const attr = geometry.attributes.position;

      for (let i = 0; i < COUNT; i++) {
        const target = progress.value > 0.45 ? diamond[i] : raw[i];

        attr.array[i * 3] += (target.x - attr.array[i * 3]) * 0.035;

        attr.array[i * 3 + 1] += (target.y - attr.array[i * 3 + 1]) * 0.035;

        attr.array[i * 3 + 2] += (target.z - attr.array[i * 3 + 2]) * 0.035;
      }

      attr.needsUpdate = true;

      points.rotation.y += 0.002;

      points.rotation.x = mouse.y * 0.35;

      points.rotation.z = mouse.x * 0.25;

      renderer.render(scene, camera);

      frame = requestAnimationFrame(animate);
    }

    animate();

    function resize() {
      const s = container.clientWidth;

      renderer.setSize(s, s);
    }

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);

      trigger.kill();

      window.removeEventListener("mousemove", move);

      window.removeEventListener("resize", resize);

      geometry.dispose();

      material.dispose();

      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section
      ref={wrapper}
      className="
relative
min-h-screen
bg-[#020617]
px-6
py-32
overflow-hidden
"
    >
      <div
        className="
max-w-7xl
mx-auto
grid
lg:grid-cols-2
gap-10
items-center
"
      >
        <div>
          <p
            className="
text-cyan-300
tracking-[6px]
text-sm
"
          >
            DIAMOND AI CORE
          </p>

          <h2
            className="
text-5xl
md:text-7xl
font-bold
mt-6
"
          >
            From chaos
            <span
              className="
text-cyan-300
"
            >
              to intelligence.
            </span>
          </h2>

          <p
            className="
mt-6
text-gray-400
text-lg
max-w-xl
"
          >
            Raw signals reorganize into a structured diamond neural intelligence
            core.
          </p>

          <div
            className="
mt-10
inline-flex
px-6
py-3
rounded-full
border
border-white/10
text-cyan-300
"
          >
            {mode}
          </div>
        </div>

        <div
          ref={canvas}
          className="
relative
w-full
h-[350px]
sm:h-[500px]
lg:h-[600px]
"
        >
          <div
            className="
absolute
inset-20
bg-cyan-400/20
blur-[120px]
rounded-full
"
          />
        </div>
      </div>
    </section>
  );
}
