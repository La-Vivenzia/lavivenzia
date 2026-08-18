import Header from "@/components/Header";
import Categories from "@/components/Categories";
import WhyJoin from "@/components/WhyJoin";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function ForHostPage() {
  return (
    <main className="min-h-screen bg-[#080806] text-[#fcfbf9]">
      <Header />
      <div className="pt-24">
        <Categories />
        <WhyJoin />
        <HowItWorks />
      </div>
      <Footer />
    </main>
  );
}
