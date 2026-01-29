import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Trophy, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  end: number;
  suffix?: string;
  isVisible: boolean;
}

function Counter({ end, suffix = '', isVisible }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Expo-out easing
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, isVisible]);

  return (
    <span ref={countRef} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

const awards = [
  { 
    icon: Award, 
    count: 12, 
    label: 'Site of the Day',
    description: 'Awards'
  },
  { 
    icon: Users, 
    count: 8, 
    label: 'User Choice',
    description: 'Awards'
  },
  { 
    icon: Trophy, 
    count: 25, 
    label: 'Best Design',
    description: 'Awards'
  },
  { 
    icon: Star, 
    count: 2, 
    label: 'Developer',
    description: 'Awards'
  },
];

export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left column entrance
      const leftItems = leftColRef.current?.querySelectorAll('.animate-item');
      if (leftItems && leftItems.length > 0) {
        gsap.fromTo(
          leftItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Right column counter cards
      const cards = rightColRef.current?.querySelectorAll('.counter-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'elastic.out(1, 0.7)',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
              onEnter: () => setIsVisible(true),
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black opacity-50" />

      <div className="relative z-10 w-full px-4 sm:px-[3%]">
        <div className="grid md:grid-cols-[45%_55%] gap-8 sm:gap-12 md:gap-16">
          {/* Left Column - Sticky Title */}
          <div ref={leftColRef} className="md:sticky md:top-[120px] md:self-start">
            <span className="animate-item block text-xs uppercase tracking-[3px] text-red-500 mb-3 sm:mb-4">
              Awards & Recognition
            </span>
            <h2 className="animate-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Excellence<br />
              <span className="text-white/60">Recognized</span>
            </h2>
            <p className="animate-item text-white/60 text-base sm:text-lg max-w-md">
              Industry validation for pushing creative boundaries and delivering exceptional digital experiences.
            </p>
          </div>

          {/* Right Column - Counter Cards */}
          <div ref={rightColRef} className="space-y-4 sm:space-y-6">
            {awards.map((award, index) => (
              <div
                key={award.label}
                className="counter-card group relative p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-red-500/30 transition-all duration-300"
                style={{ marginLeft: window.innerWidth >= 768 && index % 2 === 1 ? '20px' : '0' }}
              >
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                      <award.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-white/50 uppercase tracking-wide">{award.label}</p>
                      <p className="text-xs sm:text-sm text-white/40">{award.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white group-hover:text-red-500 transition-colors duration-300">
                      <Counter end={award.count} isVisible={isVisible} />
                    </span>
                  </div>
                </div>
                
                {/* Accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-500 group-hover:w-[40px] sm:group-hover:w-[60px] transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
