"use client";
import Navbar from "./ai-automation/components/Navbar";
import Hero from "./ai-automation/components/Hero";
// import Hero from "@/components/ai/Hero";
// import Flow from "@/components/ai/Flow";
// import Dashboard from "@/components/ai/Dashboard";
// import NeuralUniverse from "@/components/ai/NeuralUniverse";
// import Footer from "@/components/ai/Footer";

export default function Page() {
  return (
    <main className="ai-page  ">
      <Navbar />
      <Hero />
      {/* <Flow />
      <Dashboard />
      <NeuralUniverse />
      <Footer /> */}
    </main>
  );
}
