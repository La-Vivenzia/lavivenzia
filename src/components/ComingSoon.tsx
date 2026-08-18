export default function ComingSoon() {
  const features = [
    { 
      icon: (
        <svg width="44" height="44" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#C6943B]">
          <path d="M18.8 35.4c-6.8-2.6-11.8-9.4-11.8-17.4 0-1.7.3-3.4.8-5" />
          <path d="M21.2 35.4c6.8-2.6 11.8-9.4 11.8-17.4 0-1.7-.3-3.4-.8-5" />
          
          <path d="M16 30c-2.5 1-5.2-.8-6-3.5 2.5-1 5.2.8 6 3.5z" />
          <path d="M14 24c-3 .5-5.5-2-5.5-5 3-.5 5.5 2 5.5 5z" />
          <path d="M12.5 17c-3-.5-4.5-3.5-3-6 3 .5 4.5 3.5 3 6z" />
          <path d="M10 11c-2-1.5-2-4.5 0-6 2 1.5 2 4.5 0 6z" />
          <path d="M16 30c-1-2.5.8-5.2 3.5-6-1 2.5-.8 5.2-3.5 6z" />
          <path d="M14 24c-.5-3 2-5.5 5-5.5.5 3-2 5.5-5 5.5z" />
          <path d="M12.5 17c.5-3 3.5-4.5 6-3-.5 3-3.5 4.5-6 3z" />

          <path d="M24 30c2.5 1 5.2-.8 6-3.5-2.5-1-5.2.8-6 3.5z" />
          <path d="M26 24c3 .5 5.5-2 5.5-5-3-.5-5.5 2-5.5 5z" />
          <path d="M27.5 17c3-.5 4.5-3.5 3-6-3 .5-4.5 3.5-3 6z" />
          <path d="M30 11c2-1.5 2-4.5 0-6-2 1.5-2 4.5 0 6z" />
          <path d="M24 30c1-2.5-.8-5.2-3.5-6 1 2.5.8 5.2 3.5 6z" />
          <path d="M26 24c.5-3-2-5.5-5-5.5-.5 3 2 5.5 5 5.5z" />
          <path d="M27.5 17c-.5-3-3.5-4.5-6-3 .5 3 3.5 4.5 6 3z" />
          
          <path d="M17 37l6-4" />
          <path d="M23 37l-6-4" />
        </svg>
      ),
      title: "CURATED WITH CARE", 
      desc: "Handpicked stays\nand experiences" 
    },
    { 
      icon: (
        <svg width="44" height="44" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#C6943B]">
          <circle cx="20" cy="20" r="11" />
          <path d="M20 2v36" />
          <path d="M2 20h36" />
          <path d="M12 12l16 16" />
          <path d="M12 28l16-16" />
          <path d="M20 6 l3 11 11 3 -11 3 -3 11 -3-11 -11-3 11-3 Z" />
        </svg>
      ),
      title: "AUTHENTIC & LOCAL", 
      desc: "Real places, local hosts,\nmeaningful connections" 
    },
    { 
      icon: (
        <svg width="44" height="44" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#C6943B]">
          <circle cx="20" cy="10" r="2.5" />
          <path d="M9 24 C9 14, 15 12.5, 20 12.5 C25 12.5, 31 14, 31 24" />
          <rect x="7" y="24" width="26" height="3" rx="1.5" />
          <path d="M5 31 h30" />
          <rect x="19" y="35" width="2" height="2" fill="currentColor" stroke="none" />
        </svg>
      ),
      title: "PERSONALIZED SERVICE", 
      desc: "Thoughtful support,\nevery step of the way" 
    },
    { 
      icon: (
        <svg width="44" height="44" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#C6943B]">
          <path d="M20 36 C20 36, 6 28, 6 10 L20 4 L34 10 C34 28, 20 36, 20 36 Z" />
          <path d="M20 32 C20 32, 10 25.5, 10 12 L20 7.5 L30 12 C30 25.5, 20 32, 20 32 Z" />
          <path d="M15 19 l3.5 3.5 l7.5 -7.5" />
        </svg>
      ),
      title: "TRUSTED & SECURE", 
      desc: "Your journey,\nin safe hands" 
    },
  ];

  return (
    <section className="relative bg-[#080806] pt-24 pb-8 overflow-hidden">
      {/* Decorative floral/leaf pattern on the left */}
      <div className="absolute left-0 bottom-0 opacity-20 pointer-events-none">
        <svg width="200" height="300" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-20 320C40 250 100 200 150 100C120 120 80 180 -20 220" stroke="#C6943B" strokeWidth="0.5"/>
          <path d="M-20 270C30 220 80 150 100 80C80 100 40 150 -20 180" stroke="#C6943B" strokeWidth="0.5"/>
          <path d="M-20 220C20 180 50 100 60 40C40 70 20 120 -20 140" stroke="#C6943B" strokeWidth="0.5"/>
          {/* Subtle leaves on the decorative branch */}
          <path d="M20 250c10-5 20-5 25 5-10 10-20 5-25-5z" stroke="#C6943B" strokeWidth="0.5" />
          <path d="M40 200c10-5 20-5 25 5-10 10-20 5-25-5z" stroke="#C6943B" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        
        {/* Main Box */}
  <h2 className="text-3xl sm:text-4xl lg:text-[42px] tracking-wide mb-10" style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif' }}>
  <span className="text-[#D7C29E] italic font-light">Live beautifully. </span>
  <span className="text-[#C6943B] italic font-light">Travel meaningfully.</span>
</h2>

<div className="w-full max-w-[1100px] bg-[#0A0806] border border-[#2A2012] rounded-[16px] flex flex-col lg:flex-row shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className={`flex flex-row items-center gap-5 px-8 py-10 flex-1 ${
                idx !== features.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-[#2A2012]' : ''
              }`}
            >
              {/* Icon */}
              <div className="shrink-0 drop-shadow-[0_0_8px_rgba(198,148,59,0.3)]">
                {feature.icon}
              </div>
              
              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="text-[#A89C8B] text-xs font-semibold tracking-[0.15em] uppercase font-sans">
                  {feature.title}
                </h3>
                <p className="text-[#C8BCA9] text-[15px] font-serif whitespace-pre-line leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
