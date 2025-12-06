import React, { useEffect, useState, useRef } from 'react';
import { UI } from '../constants/UI_CONTENT';

interface TimelineItemProps {
  item: {
    year: string;
    title: string;
    subtitle: string;
    description: string;
  };
  index: number;
  isVisible: boolean;
  isActive: boolean;
  lineProgress: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, isVisible, isActive, lineProgress }) => {
  return (
    <div className="flex items-start w-full mb-32 relative">
      {/* Year - Positioned on the line */}
      <div className="absolute left-16 transform -translate-x-1/2 z-20">
        <div className={`transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative bg-black px-3 py-1">
            <div className="text-6xl font-bold text-gray-600">
              {item.year}
            </div>
            <div 
              className="absolute inset-0 px-3 py-1 text-6xl font-bold text-white transition-all duration-700 overflow-hidden"
              style={{ 
                clipPath: isActive ? `inset(${Math.max(0, 100 - lineProgress)}% 0 0 0)` : 'inset(100% 0 0 0)' 
              }}
            >
              {item.year}
            </div>
          </div>
        </div>
      </div>

      {/* Content - Right side only */}
      <div className="flex-1 pl-30">
        <div className={`transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-lg md:text-xl font-bold text-gray-300 mb-3 leading-tight">
            {item.title}
          </h3>
          <h4 className="text-3xl md:text-4xl text-white mb-6 font-medium">
            {item.subtitle}
          </h4>
          <div className="text-lg md:text-xl text-gray-400 leading-relaxed whitespace-pre-line max-w-4xl">
            {item.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Timeline: React.FC = () => {
  const { timeline } = UI;
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [itemProgresses, setItemProgresses] = useState<number[]>(new Array(timeline.length).fill(0));
  const [lineHeight, setLineHeight] = useState<number>(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !lineRef.current) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const items = timelineRef.current.querySelectorAll('[data-timeline-item]');
      
      const newVisibleItems = new Set<number>();
      const newItemProgresses: number[] = [];

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const yearElement = item.querySelector('[data-year-element]');
        
        // Check if item is visible
        const isInViewport = rect.top < viewportHeight * 0.9 && rect.bottom > viewportHeight * 0.1;
        if (isInViewport) {
          newVisibleItems.add(index);
        }

        // Calculate progress for each item based on how much of it has been scrolled through
        let itemProgress = 0;
        if (yearElement) {
          const yearRect = yearElement.getBoundingClientRect();
          const triggerPoint = viewportHeight * 0.6; // Line reaches year when it's 60% down viewport
          
          if (yearRect.top <= triggerPoint) {
            // Calculate how far past the trigger point we are
            const progressDistance = triggerPoint - yearRect.top;
            const maxProgressDistance = viewportHeight * 0.3; // Allow 30% of viewport for full progress
            itemProgress = Math.min(100, Math.max(0, (progressDistance / maxProgressDistance) * 100));
          }
        }
        
        newItemProgresses.push(itemProgress);
      });

      // Calculate overall line height based on scroll through timeline
      const timelineTop = timelineRect.top;
      const timelineBottom = timelineRect.bottom;
      const timelineMiddle = viewportHeight * 0.5;
      
      let overallLineHeight = 0;
      if (timelineTop <= timelineMiddle && timelineBottom >= timelineMiddle) {
        const scrolledDistance = timelineMiddle - timelineTop;
        const totalDistance = timelineRect.height;
        overallLineHeight = Math.min(100, Math.max(0, (scrolledDistance / totalDistance) * 100));
      } else if (timelineBottom < timelineMiddle) {
        overallLineHeight = 100;
      }

      setVisibleItems(newVisibleItems);
      setItemProgresses(newItemProgresses);
      setLineHeight(overallLineHeight);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [timeline.length]);

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            My Journey
          </h2>
          <p className="text-2xl md:text-3xl text-gray-400 font-light">
            Every step, every challenge, every victory
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Vertical Line */}
          <div className="absolute left-16 w-0.5 bg-gray-700 h-full">
            <div 
              ref={lineRef}
              className="w-full bg-gradient-to-b from-white to-gray-300 transition-all duration-200 ease-out origin-top"
              style={{ 
                height: `${lineHeight}%`,
                boxShadow: lineHeight > 0 ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none'
              }}
            ></div>
          </div>

          {/* Timeline Items */}
          {timeline.map((item, index) => (
            <div key={index} data-timeline-item>
              <div data-year-element>
                <TimelineItem
                  item={item}
                  index={index}
                  isVisible={visibleItems.has(index)}
                  isActive={itemProgresses[index] > 0}
                  lineProgress={itemProgresses[index]}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 