import { useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, XCircle, FileText, Users, Banknote } from "lucide-react";
import { Logo } from "./components/Logo";
import prop1 from "./assets/prop1.jpeg";
import prop2 from "./assets/prop2.jpeg";
import prop3 from "./assets/prop3.jpeg";
import prop4 from "./assets/prop4.jpeg";
import prop5 from "./assets/prop5.jpeg";
import prop6 from "./assets/prop6.jpeg";
import prop7 from "./assets/prop7.jpeg";
import prop8 from "./assets/prop8.jpeg";
import prop9 from "./assets/prop9.jpeg";
import prop10 from "./assets/prop10.jpeg";
import prop11 from "./assets/prop11.jpeg";
import team3 from "./assets/team-3.jpg";
import jose from "./assets/jose.jpeg";

const carouselImages = [prop4, prop7, prop11];
const teamImages = [team3, jose];
const teamNames = ["Chris", "Jose"];

export default function App() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const prevSlide = () => setCarouselIndex((i) => (i - 1 + carouselImages.length) % carouselImages.length);
  const nextSlide = () => setCarouselIndex((i) => (i + 1) % carouselImages.length);
  const [teamIndex, setTeamIndex] = useState(0);
  const prevTeam = () => setTeamIndex((i) => (i - 1 + teamImages.length) % teamImages.length);
  const nextTeam = () => setTeamIndex((i) => (i + 1) % teamImages.length);

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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex items-center justify-center min-h-[80vh]">
        <div className="absolute inset-0 z-0 select-none">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000" 
            alt="Beautiful home exterior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#FDFBF7]/90 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-[#1A3018]">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-[1.1]">
            The Simplest Way to Sell Your Florida Home <span className="italic font-medium text-[#2D5A27] relative whitespace-nowrap"><span className="relative z-10">– without Fees.</span></span>
          </h1>
          <p className="text-lg sm:text-xl text-[#5C6B5C] mb-10 max-w-3xl mx-auto">
            At <span className="text-[#1A3018] font-bold">Florida Fast Home Sale</span>, we believe the house selling process should be faster, easier, and hassle-free for Florida home sellers. <span className="text-[#2D5A27] font-bold underline decoration-[#2D5A27] underline-offset-4">Get Your Offer Today!</span>
          </p>
          
          <form className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-[32px] shadow-xl shadow-green-900/5 border border-[#E1EADB]">
            <input 
              type="text" 
              placeholder="Enter your home address" 
              className="flex-1 px-6 py-4 rounded-2xl bg-[#F8FAF8] border border-[#E1EADB] text-[#1A3018] focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
              required
            />
            <button 
              type="submit" 
              className="px-8 py-4 bg-[#2D5A27] text-white font-bold rounded-2xl shadow-lg shadow-green-900/20 hover:scale-[1.02] transition-transform whitespace-nowrap"
            >
              GET YOUR OFFER
            </button>
          </form>
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[prop1, prop2, prop3, prop4, prop5, prop6, prop7, prop8].map((img, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group border border-[#E1EADB]">
                <img
                  src={img}
                  alt={`As-is property ${i+1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
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
              <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, i) => (
                  <button key={i} onClick={() => setCarouselIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === carouselIndex ? 'bg-white scale-125' : 'bg-white/50'}`} />
                ))}
              </div>
            </div>
            
            <button className="mt-8 px-10 py-4 bg-[#FDFBF7] text-[#1A3018] font-bold rounded-2xl hover:bg-white transition-colors w-full max-w-md text-center shadow-lg">
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
          <div className="bg-[#1A3018] text-[#FDFBF7] p-8 sm:p-12 md:rounded-l-[32px] lg:my-8 shadow-xl">
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
          
          <div className="bg-[#2D5A27] text-white p-8 sm:p-12 md:rounded-r-[32px] md:scale-110 shadow-2xl relative z-10 border border-[#1E3D1A]">
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
              <button onClick={prevTeam} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={nextTeam} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
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

      {/* Bottom CTA Section */}
      <section className="relative py-32 flex items-center justify-center px-4 sm:px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441441247730-d09529166668?auto=format&fit=crop&q=80&w=2000" 
            alt="Beautiful nature scenery" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#A1B0A1]/20 backdrop-blur-sm mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 w-full max-w-3xl bg-white/95 backdrop-blur-md p-10 sm:p-14 rounded-[32px] text-center shadow-2xl border border-[#E1EADB]">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-8 text-[#1A3018]">Submit Your Property Here!</h2>
          <form className="flex flex-col sm:flex-row gap-3 bg-[#F8FAF8] p-2 rounded-2xl border border-[#E1EADB]">
            <input 
              type="text" 
              placeholder="Enter your home address" 
              className="flex-1 px-6 py-4 rounded-xl bg-transparent text-[#1A3018] focus:outline-none placeholder:text-[#A1B0A1]"
              required
            />
            <button 
              type="submit" 
              className="px-8 py-4 bg-[#2D5A27] text-white font-bold rounded-xl hover:bg-[#1E3D1A] transition-colors whitespace-nowrap shadow-md"
            >
              GET YOUR OFFER
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FDFBF7] py-16 text-center border-t border-[#E1EADB]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <Logo className="h-16 w-auto mb-6 opacity-90 hover:opacity-100 transition-opacity drop-shadow-sm" />
          
          <a href="tel:3214750983" className="text-2xl font-bold font-heading mb-4 text-[#1A3018] hover:text-[#2D5A27] transition-colors">
            (321) 475-0983
          </a>
          
          <a href="#" className="text-sm font-bold text-[#5C6B5C] hover:text-[#2D5A27] hover:underline mb-8">
            Privacy Policy
          </a>
          
          <p className="text-xs text-[#94A194]">
            Copyright {new Date().getFullYear()} © All rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

