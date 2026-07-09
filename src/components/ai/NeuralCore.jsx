"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function NeuralCore() {
  const box = useRef();

  useEffect(() => {
    const container = box.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(500, 500);

    container.appendChild(renderer.domElement);

    const particles = 200;
    const positions = [];

    for (let i = 0; i < particles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 1.5;

      positions.push(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 3,
        Math.sin(angle) * radius,
      );
    }

    const geo = new THREE.BufferGeometry();

    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );

    const mat = new THREE.PointsMaterial({
      color: "#67e8f9",
      size: 0.045,
    });

    const points = new THREE.Points(geo, mat);

    scene.add(points);

    const mouse = {
      x: 0,
      y: 0,
    };

    const handleMouse = (e) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("mousemove", handleMouse);

    let frame;

    function animate() {
      points.rotation.y += 0.002;

      points.rotation.x = mouse.y * 0.3;

      points.rotation.z = mouse.x * 0.2;

      renderer.render(scene, camera);

      frame = requestAnimationFrame(animate);
    }

    animate();

    const scaleAnimation = gsap.to(points.scale, {
      x: 1.4,
      y: 1.4,
      z: 1.4,
      duration: 3,
      repeat: -1,
      yoyo: true,
    });

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener("mousemove", handleMouse);

      scaleAnimation.kill();

      geo.dispose();

      mat.dispose();

      renderer.dispose();

      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={box}
      className="relative flex justify-center items-center h-[500px]"
    />
  );
}
