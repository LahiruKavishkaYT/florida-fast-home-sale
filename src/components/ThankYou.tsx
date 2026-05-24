import { Logo } from "./Logo";
import { Phone } from "lucide-react";
import thankYouVideo from "../assets/vid.mp4";

interface ThankYouProps {
  onBack: () => void;
}

export function ThankYou({ onBack }: ThankYouProps) {
  return (
    <div className="min-h-screen font-sans bg-[#1A3018] text-[#FDFBF7] flex flex-col">
      {/* Nav */}
      <nav className="w-full bg-[#1A3018]/80 backdrop-blur-md border-b border-white/10 pb-2 pt-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <button onClick={onBack} className="flex-shrink-0 focus:outline-none">
            <Logo className="h-10 sm:h-14 w-auto" inverted />
          </button>
          <a
            href="tel:3214750983"
            className="hidden sm:block bg-[#FDFBF7] text-[#1A3018] px-6 py-3 rounded-full text-sm font-semibold hover:bg-white transition-colors"
          >
            Call Us: (321) 475-0983
          </a>
          <a
            href="tel:3214750983"
            className="sm:hidden bg-[#FDFBF7] text-[#1A3018] px-4 py-2.5 rounded-full text-xs font-semibold hover:bg-white transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            Call Now
          </a>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16 gap-8">
        {/* Heading */}
        <div className="text-center max-w-xl">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3 text-white">
            Thank You!
          </h1>
          <p className="text-[#94A194] text-sm leading-relaxed">
            We've received your information and will be in touch within 24
            hours. In the meantime, watch this short video to learn more about
            how we work.
          </p>
        </div>

        {/* Video player */}
        <div className="w-full max-w-2xl rounded-[24px] overflow-hidden shadow-2xl border border-white/10 bg-black aspect-video">
          <video
            src={thankYouVideo}
            controls
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* CTA back */}
        <button
          onClick={onBack}
          className="text-xs text-[#94A194] hover:text-white underline underline-offset-4 transition-colors"
        >
          ← Back to homepage
        </button>
      </div>
    </div>
  );
}
