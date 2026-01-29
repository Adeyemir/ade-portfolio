import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    title: 'Nexus Platform',
    category: 'Web Design',
    year: '2024',
    image: '/project-1.jpg',
    description: 'A modern SaaS platform with intuitive user interface and seamless experience.',
  },
  {
    id: '02',
    title: 'Brand Evolution',
    category: 'Branding',
    year: '2024',
    image: '/project-2.jpg',
    description: 'Complete brand identity redesign for a leading retail company.',
  },
  {
    id: '03',
    title: 'Motion Stories',
    category: 'Animation',
    year: '2023',
    image: '/project-3.jpg',
    description: 'Interactive storytelling experience with immersive animations.',
  },
  {
    id: '04',
    title: 'Digital Experience',
    category: 'UI/UX',
    year: '2023',
    image: '/project-4.jpg',
    description: 'E-commerce platform redesign focused on conversion optimization.',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const gallery = galleryRef.current;
    const progress = progressRef.current;
    if (!section || !gallery || !progress) return;

    // Check if mobile
    const isMobile = window.innerWidth < 768;

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

      // Only enable horizontal scroll on desktop
      if (!isMobile) {
        // Horizontal scroll animation
        const cards = gallery.querySelectorAll('.project-card');
        const cardWidth = window.innerWidth * 0.5 + 32; // md:w-[50vw]
        const totalWidth = (cards.length - 1) * cardWidth;

        gsap.to(gallery, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${window.innerHeight * 2}`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            onUpdate: (self) => {
              gsap.set(progress, { scaleX: self.progress });
            },
          },
        });

        // Card scale animation based on position
        cards.forEach((card, index) => {
          const startOffset = index / cards.length;
          const endOffset = (index + 1) / cards.length;
          
          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: `+=${window.innerHeight * 2}`,
            scrub: 0.5,
            onUpdate: (self) => {
              const progress = self.progress;
              const cardProgress = (progress - startOffset) / (endOffset - startOffset);
              const scale = 0.95 + Math.sin(cardProgress * Math.PI) * 0.05;
              gsap.set(card, { scale: Math.max(0.95, Math.min(1, scale)) });
            },
          });
        });
      } else {
        // Mobile: show progress as full
        gsap.set(progress, { scaleX: 1 });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-black overflow-hidden"
    >
      {/* Header */}
      <div ref={headerRef} className="absolute top-0 left-0 right-0 z-20 pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-[3%]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-4">
          <div>
            <span className="animate-item block text-xs uppercase tracking-[3px] text-red-500 mb-1 sm:mb-2">
              Portfolio
            </span>
            <h2 className="animate-item text-3xl sm:text-4xl md:text-5xl font-bold">Recent Projects</h2>
          </div>
          <p className="animate-item text-white/60 text-sm sm:text-base max-w-md">
            A curated selection of my finest work, showcasing creativity and technical excellence.
          </p>
        </div>
      </div>

      {/* Gallery - Horizontal on desktop, vertical scroll on mobile */}
      <div className="relative h-auto md:h-screen flex items-center pt-28 sm:pt-32 pb-20 md:pb-0">
        <div
          ref={galleryRef}
          className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 px-4 sm:px-[3%] md:pl-[3%] md:pr-[30vw] w-full"
          style={{ willChange: 'transform' }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative flex-shrink-0 w-full md:w-[50vw] lg:w-[40vw] h-[50vh] sm:h-[60vh] md:h-[70vh] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer"
              style={{ 
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end">
                {/* Project Number */}
                <span className="absolute top-4 sm:top-6 right-4 sm:right-6 text-4xl sm:text-6xl md:text-7xl font-bold text-white/10">
                  {project.id}
                </span>

                {/* Category & Year */}
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-xs sm:text-sm text-white/50">{project.year}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-red-500 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* View Project Link */}
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-white font-medium text-sm group/link"
                >
                  <span className="relative">
                    View Project
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-500 group-hover/link:w-full transition-all duration-300" />
                  </span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/30 rounded-xl sm:rounded-2xl transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar - Hidden on mobile */}
      <div className="hidden md:block absolute bottom-8 left-[3%] right-[3%] h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-red-500 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* View All Button */}
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-[3%]">
        <button className="group flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/10 text-white text-xs sm:text-sm font-medium rounded-full hover:bg-red-500 transition-all duration-300">
          View All
          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </section>
  );
}
