import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#080806] text-[#fcfbf9]">
      <Header />
      <div className="pt-24">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
