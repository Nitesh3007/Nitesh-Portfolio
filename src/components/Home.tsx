import React, { useEffect, useState } from 'react';
import { UI } from '../constants/UI_CONTENT';

export const Home: React.FC = () => {
  const { home } = UI;
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showJourney, setShowJourney] = useState(false);
  const [allowScroll, setAllowScroll] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      if (visibleLines < home.greeting.length) {
        setVisibleLines(prev => prev + 1);
      } else if (!showJourney) {
        setTimeout(() => {
          setShowJourney(true);
          setTimeout(() => {
            setAllowScroll(true);
            document.body.style.overflow = 'auto';
            window.scrollTo(0, 0);
          }, 600);
        }, 200);
      }
    }, 320);

    return () => clearTimeout(timer);
  }, [visibleLines, showJourney, home.greeting.length]);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-between px-4 relative">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between">
        {/* Greetings - Top Left */}
        <div className="pt-30 pb-8">
          {home.greeting.map((line, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${
                index < visibleLines 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              } ${
                index === 2 
                  ? 'text-4xl md:text-6xl lg:text-8xl font-bold text-white lg:-mb-4 md:-mb-3 -mb-2 leading-tight tracking-tighter'
                  : index === 3
                  ? 'text-4xl md:text-7xl lg:text-9xl text-gray-300 font-light tracking-tighter'
                  : 'text-3xl md:text-3xl lg:text-4xl text-gray-400 mb-2 tracking-tighter font-light'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Journey Section - Center */}
        <div className="flex-1 flex items-center justify-center">
          <div className={`text-center max-w-4xl transition-all duration-1000 ${
            showJourney ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {home.journeyIntro}
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed font-light max-w-3xl mx-auto">
              {home.journeyDescription}
            </p>
          </div>
        </div>

        {/* Scroll indicator - Bottom */}
        <div className={`pb-8 transition-all duration-1000 delay-1000 ${
          allowScroll ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex flex-col items-center">
            <span className="text-xs md:text-sm text-gray-500 mb-3 tracking-wider uppercase">scroll to explore</span>
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 