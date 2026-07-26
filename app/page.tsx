import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Services } from "@/components/Services";
import { TestimonialsStats } from "@/components/TestimonialsStats";
import { WaterHoverSection } from "@/components/WaterHoverSection";
import { WaveDivider } from "@/components/WaveDivider";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-navy">
      <Header />
      <Hero />
      <WaveDivider />
      <Services />
      <BeforeAfterSlider />
      <ProcessTimeline />
      <TestimonialsStats />
      <WaterHoverSection />
    </main>
  );
}
