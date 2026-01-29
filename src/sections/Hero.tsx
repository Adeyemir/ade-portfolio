import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated background shader
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      time += 0.003;
      
      // Clear with black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw flowing gradient
      const gradient = ctx.createRadialGradient(
        canvas.width * (0.5 + Math.sin(time) * 0.3),
        canvas.height * (0.5 + Math.cos(time * 0.7) * 0.2),
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.8
      );

      gradient.addColorStop(0, 'rgba(255, 0, 0, 0.08)');
      gradient.addColorStop(0.5, 'rgba(100, 0, 0, 0.03)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle noise/grid pattern
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      
      const gridSize = 50;
      const offsetX = Math.sin(time * 0.5) * 10;
      const offsetY = Math.cos(time * 0.3) * 10;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + offsetX, 0);
        ctx.lineTo(x + offsetX, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + offsetY);
        ctx.lineTo(canvas.width, y + offsetY);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline animation
      const headlineLines = headlineRef.current?.querySelectorAll('.headline-line');
      if (headlineLines) {
        gsap.fromTo(
          headlineLines,
          { 
            rotateX: -90, 
            y: 50, 
            opacity: 0,
            transformOrigin: 'center bottom'
          },
          { 
            rotateX: 0, 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            stagger: 0.15, 
            ease: 'expo.out',
            delay: 0.3
          }
        );
      }

      // Subheadline animation
      gsap.fromTo(
        subheadlineRef.current,
        { filter: 'blur(10px)', y: 30, opacity: 0 },
        { filter: 'blur(0px)', y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.8 }
      );

      // CTA buttons animation
      const ctaButtons = ctaRef.current?.querySelectorAll('button, a');
      if (ctaButtons) {
        gsap.fromTo(
          ctaButtons[0],
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)', delay: 1 }
        );
        
        if (ctaButtons[1]) {
          gsap.fromTo(
            ctaButtons[1],
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: 'expo.out', delay: 1.1 }
          );
        }
      }

      // Social proof animation
      gsap.fromTo(
        socialRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', delay: 1.2 }
      );

      // Scroll-triggered parallax
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(headlineRef.current, { y: -80 * progress });
          gsap.set(subheadlineRef.current, { y: -120 * progress });
          gsap.set(ctaRef.current, { opacity: 1 - progress * 1.5 });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: -3 }}
      />

      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        <div 
          className="absolute top-[20%] left-[10%] w-32 h-32 border border-white/5 rounded-full animate-float-slow"
          style={{ animationDelay: '0s' }}
        />
        <div 
          className="absolute top-[60%] right-[15%] w-24 h-24 border border-red-500/10 rounded-full animate-float"
          style={{ animationDelay: '2s' }}
        />
        <div 
          className="absolute bottom-[20%] left-[20%] w-16 h-16 bg-red-500/5 rounded-full animate-float-slow"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-[5%] md:px-[10%] pt-20 sm:pt-24">
        <div className="max-w-4xl">
          {/* Headline */}
          <div ref={headlineRef} className="mb-6 sm:mb-8" style={{ transformStyle: 'preserve-3d' }}>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight">
              <span className="headline-line block">Creative</span>
              <span className="headline-line block">Designer <span className="text-red-500">&</span></span>
              <span className="headline-line block">Developer</span>
            </h1>
          </div>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-xl mb-8 sm:mb-10 leading-relaxed"
          >
            Crafting digital experiences that blend stunning visuals with flawless functionality. 
            I transform ideas into immersive web realities.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-12">
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, '#projects')}
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 text-sm sm:text-base"
            >
              View My Work
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#footer"
              onClick={(e) => handleNavClick(e, '#footer')}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-sm sm:text-base"
            >
              Get In Touch
            </a>
          </div>

          {/* Social Proof */}
          <div ref={socialRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex -space-x-2 sm:-space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-black bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden"
                >
                  <img
                    src={`/testimonial-${i}.jpg`}
                    alt={`Client ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-white">Trusted by 50+ brands worldwide</p>
              <div className="flex items-center gap-0.5 sm:gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}
