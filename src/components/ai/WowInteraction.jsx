"use client";

import { useEffect, useRef, useState } from "react";

import * as THREE from "three";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function WowInteraction() {
  const wrapper = useRef();

  const canvas = useRef();

  const [mode, setMode] = useState("RAW DATA");

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);

    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(600, 600);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    canvas.current.appendChild(renderer.domElement);

    const COUNT = 900;

    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(COUNT * 3);

    const chaos = [];

    const core = [];

    for (let i = 0; i < COUNT; i++) {
      const r = 2 + Math.random() * 2.8;

      const theta = Math.random() * Math.PI * 2;

      const phi = Math.random() * Math.PI;

      chaos.push({
        x: r * Math.sin(phi) * Math.cos(theta),

        y: r * Math.sin(phi) * Math.sin(theta),

        z: r * Math.cos(phi),
      });

      const angle = (i / COUNT) * Math.PI * 2;

      core.push({
        x: Math.cos(angle) * 1.7,

        y: Math.sin(angle) * 1.7,

        z: Math.sin(i * 0.08) * 0.5,
      });

      positions[i * 3] = chaos[i].x;

      positions[i * 3 + 1] = chaos[i].y;

      positions[i * 3 + 2] = chaos[i].z;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: "#67e8f9",

      size: 0.035,

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

      start: "top 70%",

      end: "bottom 30%",

      scrub: true,

      onUpdate(self) {
        progress.value = self.progress;

        if (self.progress < 0.3) {
          setMode("RAW DATA");
        } else if (self.progress < 0.7) {
          setMode("AI PROCESSING");
        } else {
          setMode("INTELLIGENCE");
        }
      },
    });

    const mouse = {
      x: 0,
      y: 0,
    };

    function mouseMove(e) {
      mouse.x = e.clientX / window.innerWidth - 0.5;

      mouse.y = e.clientY / window.innerHeight - 0.5;
    }

    window.addEventListener("mousemove", mouseMove);

    let frame;

    function animate() {
      const attr = geometry.attributes.position;

      for (let i = 0; i < COUNT; i++) {
        const target = progress.value > 0.5 ? core[i] : chaos[i];

        attr.array[i * 3] += (target.x - attr.array[i * 3]) * 0.04;

        attr.array[i * 3 + 1] += (target.y - attr.array[i * 3 + 1]) * 0.04;

        attr.array[i * 3 + 2] += (target.z - attr.array[i * 3 + 2]) * 0.04;
      }

      attr.needsUpdate = true;

      points.rotation.y += 0.002;

      points.rotation.x = mouse.y * 0.4;

      points.rotation.z = mouse.x * 0.3;

      camera.position.x = mouse.x * 0.8;

      camera.position.y = mouse.y * 0.8;

      renderer.render(scene, camera);

      frame = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener("mousemove", mouseMove);

      trigger.kill();

      geometry.dispose();

      material.dispose();

      renderer.dispose();

      if (canvas.current) {
        canvas.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  function triggerMorph() {
    gsap.to(".core-button", {
      scale: 1.15,

      duration: 0.3,

      yoyo: true,

      repeat: 1,
    });
  }

  return (
    <section
      ref={wrapper}
      className="min-h-screen relative bg-[#020617] px-6 py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-10">
        <div>
          <p className="text-cyan-300 tracking-[6px] text-sm">
            SIGNATURE AI CORE
          </p>

          <h2 className="text-6xl font-bold mt-6">
            The system that
            <span className="text-cyan-300">thinks.</span>
          </h2>

          <p className="mt-6 text-gray-400 text-lg">
            Thousands of raw signals reorganize into a living intelligence
            network. Scroll to transform the system.
          </p>

          <div className="mt-10 flex items-center gap-5">
            <button
              onClick={triggerMorph}
              className="core-button px-8 py-4 rounded-full bg-cyan-300 text-black font-semibold"
            >
              Activate AI Core
            </button>

            <div className="border border-white/10 px-5 py-3 rounded-full text-cyan-300">
              {mode}
            </div>
          </div>
        </div>

        <div ref={canvas} className="h-[600px] relative">
          <div className="absolute inset-20 bg-cyan-400/20 blur-[120px] rounded-full" />
        </div>
      </div>
    </section>
  );
}
