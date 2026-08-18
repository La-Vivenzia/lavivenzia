
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ComingSoon from "@/components/ComingSoon";
import Viveniq from "@/components/Viveniq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-body-text">

      <Header />
      <Hero />
      <div id="viveniq" className="pt-8"><Viveniq /></div>
      <div id="coming-soon"><ComingSoon /></div>
      <Footer />
    </main>
  );
}
