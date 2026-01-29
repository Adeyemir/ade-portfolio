import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Calendar, Briefcase, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Calendar, value: '8+', label: 'Years Experience' },
  { icon: Briefcase, value: '150+', label: 'Projects Completed' },
  { icon: Users, value: '50+', label: 'Happy Clients' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Content animations
      const contentItems = contentRef.current?.querySelectorAll('.animate-item');
      if (contentItems) {
        gsap.fromTo(
          contentItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0 0 0)', y: 30 },
        {
          clipPath: 'inset(0% 0 0 0)',
          y: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'elastic.out(1, 0.7)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Parallax effect on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(imageRef.current, { y: -50 * (progress - 0.5) });
          gsap.set(contentRef.current, { y: -80 * (progress - 0.5) });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 w-full px-4 sm:px-[3%]">
        <div className="grid lg:grid-cols-[55%_45%] gap-8 sm:gap-12 lg:gap-8 items-center">
          {/* Content Column */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <span className="animate-item block text-xs uppercase tracking-[3px] text-red-500 mb-3 sm:mb-4">
              About Me
            </span>
            
            <h2 className="animate-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
              Turning Vision<br />
              <span className="text-white/60">Into Reality</span>
            </h2>

            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              <p className="animate-item text-white/70 text-base sm:text-lg leading-relaxed">
                With over 8 years of experience in digital design and development, I've had the 
                privilege of working with startups, agencies, and Fortune 500 companies. My approach 
                combines strategic thinking with creative execution.
              </p>
              <p className="animate-item text-white/70 text-base sm:text-lg leading-relaxed">
                I believe great design is invisible—it just works. Every pixel, every interaction, 
                every animation serves a purpose. I'm obsessed with the details that others overlook.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 sm:mb-10">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="stat-item group p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-red-500/30 transition-all duration-300"
                >
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-white/50 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="animate-item group inline-flex items-center justify-center sm:justify-start gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 border border-white/20 text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm sm:text-base w-full sm:w-auto">
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              Download Resume
            </button>
          </div>

          {/* Image Column */}
          <div className="order-1 lg:order-2 relative">
            <div
              ref={imageRef}
              className="relative aspect-[3/4] sm:aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden max-w-sm sm:max-w-none mx-auto lg:mx-0"
            >
              <img
                src="/about-portrait.jpg"
                alt="Portrait"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Decorative frame */}
              <div className="absolute inset-3 sm:inset-4 border border-white/20 rounded-lg sm:rounded-xl pointer-events-none" />
            </div>

            {/* Floating accent */}
            <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-16 sm:w-24 h-16 sm:h-24 bg-red-500/20 rounded-full blur-2xl" />
            <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-20 sm:w-32 h-20 sm:h-32 bg-red-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
