"use client";
import Hero from "@/components/ai/Hero";
import Flow from "@/components/ai/Flow";
import Dashboard from "@/components/ai/Dashboard";
import WowInteraction from "@/components/ai/WowInteraction";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <main className="ai-page">
      <Navbar />
      <Hero />
      <Flow />
      <Dashboard />
      <WowInteraction />
    </main>
  );
}
