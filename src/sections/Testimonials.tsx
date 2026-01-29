import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'CEO, TechStart',
    image: '/testimonial-1.jpg',
    quote: "Ade transformed our vision into a digital masterpiece. The attention to detail and creative problem-solving exceeded all expectations. Our user engagement increased by 200% after the redesign.",
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Marketing Director, BrandCo',
    image: '/testimonial-2.jpg',
    quote: "Working with Ade was a game-changer. Our conversion rates increased by 150% after the redesign. The strategic approach to design thinking really sets Ade apart from other designers.",
  },
  {
    id: 3,
    name: 'Emily Roberts',
    role: 'Founder, Creative Studio',
    image: '/testimonial-3.jpg',
    quote: "The perfect blend of creativity and technical expertise. Ade delivers work that's both beautiful and functional. I've never worked with someone who understands user needs so deeply.",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      const headerItems = headerRef.current?.querySelectorAll('.animate-item');
      if (headerItems && headerItems.length > 0) {
        gsap.fromTo(
          headerItems,
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

      // Carousel entrance
      gsap.fromTo(
        carouselRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'elastic.out(1, 0.7)',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrev = () => {
    goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    goToSlide((activeIndex + 1) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

      <div className="relative z-10 w-full px-4 sm:px-[3%]">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-16">
          <span className="animate-item block text-xs uppercase tracking-[3px] text-red-500 mb-3 sm:mb-4">
            Testimonials
          </span>
          <h2 className="animate-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            Client Stories
          </h2>
          <p className="animate-item text-white/60 text-base sm:text-lg max-w-xl mx-auto">
            What people say about working with me
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="relative max-w-4xl mx-auto"
          style={{ perspective: '1000px' }}
        >
          {/* Main Card */}
          <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-4 sm:top-8 right-4 sm:right-8">
              <Quote className="w-10 h-10 sm:w-16 sm:h-16 text-red-500/20" />
            </div>

            {/* Testimonial Content */}
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    index === activeIndex
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 absolute inset-0 translate-x-8'
                  }`}
                >
                  {/* Quote */}
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-6 sm:mb-8">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-red-500/30">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm sm:text-base">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <div
                className="h-full bg-red-500 transition-all duration-300"
                style={{
                  width: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 sm:mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-6 sm:w-8 bg-red-500'
                      : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={goToPrev}
                className="p-2 sm:p-3 rounded-full bg-white/10 text-white hover:bg-red-500 hover:scale-110 transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={goToNext}
                className="p-2 sm:p-3 rounded-full bg-white/10 text-white hover:bg-red-500 hover:scale-110 transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Side Cards (Desktop) */}
        <div className="hidden lg:block">
          {testimonials.map((testimonial, index) => {
            if (index === activeIndex) return null;
            const isPrev = index === (activeIndex - 1 + testimonials.length) % testimonials.length;
            
            return (
              <div
                key={testimonial.id}
                className={`absolute top-1/2 -translate-y-1/2 w-64 opacity-30 ${
                  isPrev ? 'left-[5%]' : 'right-[5%]'
                }`}
                style={{
                  transform: `translateY(-50%) translateX(${isPrev ? '-20px' : '20px'}) scale(0.85)`,
                }}
              >
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{testimonial.name}</p>
                      <p className="text-xs text-white/50">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/60 line-clamp-3">
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
