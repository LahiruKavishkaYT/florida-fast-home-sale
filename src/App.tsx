import { useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, XCircle, FileText, Users, Banknote, Phone, ShieldCheck, Mail } from "lucide-react";
import { Logo } from "./components/Logo";
import { useGoogleMaps } from "./hooks/useGoogleMaps";
import { OfferForm } from "./components/OfferForm";
import { ThankYou } from "./components/ThankYou";
import prop1 from "./assets/prop1.jpeg";
import prop2 from "./assets/prop2.jpeg";
import prop3 from "./assets/prop3.jpeg";
import prop4 from "./assets/prop4.jpeg";
import prop5 from "./assets/prop5.jpeg";
import prop6 from "./assets/prop6.jpeg";
import prop7 from "./assets/prop7.jpeg";
import prop8 from "./assets/prop8.jpeg";
import prop11 from "./assets/prop11.jpeg";
import team3 from "./assets/team-3.jpg";
import jose from "./assets/jose.jpeg";
import heroBg from "./assets/home.jpeg";

const carouselImages = [prop4, prop7, prop11];
const portfolioImages = [prop1, prop2, prop3, prop4, prop5, prop6, prop7, prop8];
const teamImages = [team3, jose];
const teamNames = ["Chris", "Jose"];

type View = "landing" | "thank-you";

export default function App() {
  const [view, setView] = useState<View>("landing");

  // Google Maps
  const mapsStatus = useGoogleMaps();

  // Carousels — all hooks must be declared before any early returns
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [portfolioIndex, setPortfolioIndex] = useState(0);
  const [teamIndex, setTeamIndex] = useState(0);

  const prevSlide = () => setCarouselIndex((i) => (i - 1 + carouselImages.length) % carouselImages.length);
  const nextSlide = () => setCarouselIndex((i) => (i + 1) % carouselImages.length);
  const prevPortfolio = () => setPortfolioIndex((i) => (i - 1 + portfolioImages.length) % portfolioImages.length);
  const nextPortfolio = () => setPortfolioIndex((i) => (i + 1) % portfolioImages.length);
  const prevTeam = () => setTeamIndex((i) => (i - 1 + teamImages.length) % teamImages.length);
  const nextTeam = () => setTeamIndex((i) => (i + 1) % teamImages.length);

  if (view === "thank-you") {
    return <ThankYou onBack={() => setView("landing")} />;
  }

  return (
    <div className="min-h-screen font-sans bg-[#FDFBF7] text-[#2D3A2D]">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/50 backdrop-blur-md border-b border-[#E1EADB] pb-2 pt-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <a href="#" className="flex-shrink-0">
            <Logo className="h-10 sm:h-14 w-auto" />
          </a>
          <div className="hidden sm:block">
            <a href="tel:3214750983" className="bg-[#2D5A27] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#1E3D1A] transition-colors">
              Call Us: (321) 475-0983
            </a>
          </div>
          <a href="tel:3214750983" className="sm:hidden bg-[#2D5A27] text-white px-4 py-2.5 rounded-full text-xs font-semibold hover:bg-[#1E3D1A] transition-colors flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            Call Now
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative flex items-center min-h-screen pt-20">
        <div className="absolute inset-0 z-0 select-none">
          <img
            src={heroBg}
            alt="Beautiful home exterior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16">
          <div className="text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-[1.1]">
              The Simplest Way to Sell Your Florida Home{" "}
              <span className="italic font-medium">– without Fees.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-lg">
              At <span className="font-bold text-white">Florida Fast Home Sale</span>, we believe the house selling process should be faster, easier, and hassle-free for Florida home sellers.{" "}
              <span className="font-bold underline underline-offset-4">Get Your Offer Today!</span>
            </p>
          </div>

          <div>
            <OfferForm mapsStatus={mapsStatus} onSubmit={() => setView("thank-you")} />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white border-t border-[#E1EADB] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-[#A1B0A1] tracking-widest uppercase mb-2 block">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 text-[#1A3018]">The Process Is As Simple As 1,2,3</h2>
            <p className="text-[#5C6B5C] font-medium tracking-wide">Sell Your House Fast For Cash In 3 Simple Steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#FDFBF7] p-10 text-center rounded-[32px] border border-[#E1EADB] flex flex-col items-center">
              <div className="w-20 h-20 mb-6 flex items-center justify-center text-[#2D5A27]">
                <FileText className="w-16 h-16 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1A3018]">Submit Your Info</h3>
              <p className="text-[#5C6B5C] text-sm leading-relaxed">
                In the coming 24 hours, a member of our team will reach out to arrange a consultation, entirely free of any obligation.
              </p>
            </div>
            
            <div className="bg-[#FDFBF7] p-10 text-center rounded-[32px] border border-[#E1EADB] flex flex-col items-center">
              <div className="w-20 h-20 mb-6 flex items-center justify-center text-[#2D5A27]">
                <Users className="w-16 h-16 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1A3018]">Let's Have A Conversation</h3>
              <p className="text-[#5C6B5C] text-sm leading-relaxed">
                Anticipate a call from our team to discuss the details of your property with you.
              </p>
            </div>
            
            <div className="bg-[#2D5A27] text-white p-10 text-center rounded-[32px] shadow-lg shadow-green-900/20 flex flex-col items-center transform md:-translate-y-2">
              <div className="w-20 h-20 mb-6 flex items-center justify-center">
                <Banknote className="w-16 h-16 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Receive Your Cash Offer</h3>
              <p className="text-[#E1EADB] text-sm leading-relaxed">
                When you approve our offer, we will close on your timeline and you get paid within days. It is that simple.
              </p>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-10 max-w-2xl mx-auto border-l-4 border-[#2D5A27] bg-[#F5FAF4] border border-[#C5D9C2] rounded-2xl px-6 py-5 flex items-start gap-4">
            <div className="flex-shrink-0 bg-[#2D5A27]/10 rounded-full p-2.5 mt-0.5">
              <ShieldCheck className="w-5 h-5 text-[#2D5A27]" />
            </div>
            <div>
              <p className="text-sm text-[#3D5C3A] leading-relaxed">
                Every closing is handled through{" "}
                <span className="font-semibold text-[#2D5A27]">First International Title</span>{" "}
                — your guarantee of a safe, transparent transaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* As-Is Properties Gallery */}
      <section className="py-24 bg-[#FDFBF7] px-4 sm:px-6 border-t border-[#E1EADB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-[#A1B0A1] tracking-widest uppercase mb-2 block">Our Portfolio</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 text-[#1A3018]">We Buy Properties In As-Is Condition</h2>
            <p className="text-[#5C6B5C] font-medium max-w-2xl mx-auto">No repairs, no cleaning, no hassle. Take a look at some of the properties we've purchased exactly as they were.</p>
          </div>
          
          <div className="relative w-full max-w-4xl mx-auto group">
            <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-[#E1EADB]">
              <img
                src={portfolioImages[portfolioIndex]}
                alt={`As-is property ${portfolioIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>
            <button onClick={prevPortfolio} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/80 hover:bg-white text-[#1A3018] rounded-full flex items-center justify-center shadow-md transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextPortfolio} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/80 hover:bg-white text-[#1A3018] rounded-full flex items-center justify-center shadow-md transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="flex justify-center gap-2 mt-5">
              {portfolioImages.map((_, i) => (
                <button key={i} onClick={() => setPortfolioIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === portfolioIndex ? 'bg-[#2D5A27] scale-125' : 'bg-[#A1B0A1]'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Previous Homes */}
      <section className="py-24 bg-[#1A3018] text-[#FDFBF7] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="leading-relaxed text-[#94A194] mb-6 text-sm">
              <strong className="text-white">Florida Fast Home Sale</strong> is your go-to home buying expert in <strong className="text-white">Florida</strong>, known for bringing smiles to hundreds of delighted clients. We're seasoned professionals when it comes to purchasing and selling homes in <strong className="text-white">Florida</strong> and its neighboring areas, which allows us to make the home buying process a breeze while offering unwavering support throughout the journey.
            </p>
            <p className="leading-relaxed text-[#94A194] mb-8 text-sm">
              If you're searching for a stress-free solution to sell your house fast, look no further! We can present you with an offer in just 24 hours. And if our offer fits the bill, simply pick a closing date and begin planning your move, leaving behind the worries of a conventional home listing. With <strong className="text-white">Florida Fast Home Sale</strong> by your side, you're in good hands!
            </p>
            
            <h3 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-4">Why other homeowners like you sold their home to Florida Fast Home Sale.</h3>
            
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2 text-sm text-[#E1EADB]">
              {['Foreclosure', 'Inherited Home', 'Bad Tenants', 'Expensive Repairs', 'Job Loss', 'Relocating', 'Downsizing', 'Damage', 'Retirement', 'Bankruptcy', 'Divorce', 'Health Issues'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A1B0A1] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-8 text-center text-white">Previous Homes We've<br/>Bought</h2>
            
            <div className="relative rounded-[48px] overflow-hidden w-full max-w-md aspect-[4/3] group shadow-2xl">
              <img
                src={carouselImages[carouselIndex]}
                alt={`Previous home bought ${carouselIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, i) => (
                  <button key={i} onClick={() => setCarouselIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === carouselIndex ? 'bg-white scale-125' : 'bg-white/50'}`} />
                ))}
              </div>
            </div>
            
            <button
              onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-8 px-10 py-4 bg-[#FDFBF7] text-[#1A3018] font-bold rounded-2xl hover:bg-white transition-colors w-full max-w-md text-center shadow-lg"
            >
              GET MY OFFER
            </button>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-[#FDFBF7] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 text-[#1A3018]">Our Cash Offer Program</h2>
          <p className="text-[#5C6B5C] font-medium">Why other homeowners like you sold their home to Florida Fast Home Sale.</p>
        </div>
        
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:gap-0 font-medium">
          <div className="bg-[#1A3018] text-[#FDFBF7] p-8 sm:p-12 rounded-[32px] md:rounded-r-none lg:my-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-8 text-white">Traditional Process</h3>
            <ul className="space-y-6">
              {[
                "The months it takes to sell add up",
                "Plenty of showings and disruption to your life",
                "It takes forever to close",
                "1-2% in closing costs paid by you, the seller",
                "Fees and commissions stack up",
                "You could be on the hook for repairs"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 border-b border-white/10 pb-6 last:border-0 last:pb-0">
                  <XCircle className="w-6 h-6 text-[#94A194] flex-shrink-0 stroke-[1.5]" />
                  <span className="text-[#E1EADB] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-[#2D5A27] text-white p-8 sm:p-12 rounded-[32px] md:rounded-l-none md:scale-105 shadow-2xl relative z-10 border border-[#1E3D1A]">
            <h3 className="text-3xl font-bold mb-8 drop-shadow-sm">Our Cash Offer Program</h3>
            <ul className="space-y-6">
              {[
                "Competitive cash offer within 24 hours",
                "No Showings - No Hassles",
                "You choose your closing day",
                "We pay ALL closing costs",
                "Zero fees. Zero commissions.",
                "We'll cover any repairs"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 border-b border-white/20 pb-6 last:border-0 last:pb-0">
                  <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                  <span className="text-white font-semibold text-[15px] leading-relaxed drop-shadow-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Meet Chris Section */}
      <section className="py-24 bg-white border-y border-[#E1EADB] px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <span className="text-[10px] font-bold text-[#A1B0A1] tracking-widest uppercase mb-2 block">About Us</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-8 text-[#1A3018]">Meet Chris and Jose</h2>
            <div className="space-y-6 text-[#5C6B5C] text-sm leading-loose">
              <p>
                I've been working with homeowners like you to sell your property with the right amount of speed and convenience so you deal with the least amount of stress. I make fair cash offers and buy properties as-is. My goal is to make this as smooth and simple as possible, and I'll walk you through every step at your own pace. You won't have to worry I'll handle the details for you.
              </p>
              <p>
                As someone with experience, I'll help you explore all the options available so you can make the decision that's truly best for you. I always keep your best interest at heart. Honesty, integrity and great service are what I live by.
              </p>
              <p>
                I run a local family business, and I've built a reputation you can trust. I work closely with a reputable title company that can confirm I follow through. I look forward to working with you.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="relative rounded-[48px] overflow-hidden aspect-square w-full shadow-2xl border border-[#E1EADB] transform md:rotate-2 hover:rotate-0 transition-transform duration-500 group">
              <img
                src={teamImages[teamIndex]}
                alt={`${teamNames[teamIndex]} - Our home buying expert`}
                className="w-full h-full object-cover object-top transition-opacity duration-300"
              />
              <button onClick={prevTeam} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={nextTeam} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {teamImages.map((_, i) => (
                  <button key={i} onClick={() => setTeamIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === teamIndex ? 'bg-white scale-125' : 'bg-white/50'}`} />
                ))}
              </div>
            </div>
            <p className="text-[#1A3018] font-bold text-lg">{teamNames[teamIndex]}</p>
          </div>
        </div>
      </section>

      {/* About Our Partners */}
      <section className="py-16 bg-[#F5FAF4] border-b border-[#E1EADB] px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-bold text-[#A1B0A1] tracking-widest uppercase mb-2 block">Our Partners</span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-5 text-[#1A3018]">About Our Partners</h2>
          <p className="text-sm font-bold text-[#1A3018] leading-loose mb-6">
            Florida Fast Home Sale operates as a real estate investment group serving homeowners across Florida. Purchase contracts may be executed under one of our affiliated entities: Legacy RE Capital Group LLC, Whatever It Takes Solutions LLC and All Door Investments LLC — each a legally registered and active business entity in good standing. All transactions are processed through a licensed title company ensuring a fully verified and transparent closing process.
          </p>
        
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="relative py-24 flex items-center justify-center px-4 sm:px-6">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441441247730-d09529166668?auto=format&fit=crop&q=80&w=2000"
            alt="Beautiful nature scenery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 w-full max-w-lg">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-8 text-center text-white">
            Submit Your Property Here!
          </h2>
          <OfferForm mapsStatus={mapsStatus} onSubmit={() => setView("thank-you")} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A3018] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col items-start">
            <Logo className="h-14 w-auto mb-4 brightness-0 invert opacity-90" />
            <p className="text-sm text-white/60 leading-relaxed">
              Serving homeowners across Florida with speed, honesty, and zero hassle.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-bold text-white/40 tracking-widest uppercase mb-4">Contact Us</p>
            <div className="space-y-3">
              <a href="tel:3214750983" className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors group">
                <Phone className="w-4 h-4 text-[#6BAA62] flex-shrink-0 group-hover:scale-110 transition-transform" />
                (321) 475-0983
              </a>
              <a href="mailto:Team@flfasthomesale.com" className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors group">
                <Mail className="w-4 h-4 text-[#6BAA62] flex-shrink-0 group-hover:scale-110 transition-transform" />
                Team@flfasthomesale.com
              </a>
            </div>
          </div>

          {/* Links + CTA */}
          <div>
            <p className="text-[10px] font-bold text-white/40 tracking-widest uppercase mb-4">Quick Links</p>
            <div className="space-y-3 mb-6">
              <a href="#" className="block text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</a>
            </div>
            <a
              href="#hero"
              className="inline-block px-5 py-2.5 rounded-lg border border-white/20 text-sm font-semibold text-white hover:bg-white hover:text-[#1A3018] transition-all"
            >
              Get My Cash Offer ↑
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-5 text-center">
          <p className="text-xs text-white/30">
            Copyright {new Date().getFullYear()} © Florida Fast Home Sale. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

