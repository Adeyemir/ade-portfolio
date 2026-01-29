import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Monitor, 
  Layers, 
  Code, 
  Layout, 
  Sparkles, 
  MessageCircle,
  ArrowUpRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Monitor,
    title: 'Web Design',
    description: 'Crafting visually stunning, user-centric websites that convert visitors into customers.',
    features: ['UI Design', 'Responsive Design', 'Prototyping'],
  },
  {
    icon: Layers,
    title: 'Branding',
    description: 'Building memorable brand identities that stand out in crowded markets.',
    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity'],
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Bringing designs to life with clean, performant, and scalable code.',
    features: ['React/Next.js', 'TypeScript', 'Node.js'],
  },
  {
    icon: Layout,
    title: 'UI/UX Design',
    description: 'Creating intuitive interfaces that users love and businesses benefit from.',
    features: ['User Research', 'Wireframing', 'Usability Testing'],
  },
  {
    icon: Sparkles,
    title: 'Motion Design',
    description: 'Adding life to digital products with purposeful animations.',
    features: ['Micro-interactions', 'Scroll Animations', 'Lottie'],
  },
  {
    icon: MessageCircle,
    title: 'Consulting',
    description: 'Strategic guidance to help your digital presence thrive.',
    features: ['Design Audit', 'Strategy', 'Mentoring'],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Service cards animation with stagger
      const cards = gridRef.current?.querySelectorAll('.service-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { 
              y: 60, 
              rotateX: 10, 
              opacity: 0,
              transformOrigin: 'center bottom'
            },
            {
              y: 0,
              rotateX: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              delay: (index % 3) * 0.1,
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-[3%]">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-16">
          <span className="animate-item block text-xs uppercase tracking-[3px] text-red-500 mb-3 sm:mb-4">
            Services
          </span>
          <h2 className="animate-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            What I Do
          </h2>
          <p className="animate-item text-white/60 text-base sm:text-lg max-w-xl mx-auto">
            End-to-end digital solutions tailored to your needs
          </p>
        </div>

        {/* Services Grid - Staggered Masonry on desktop */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          style={{ perspective: '800px' }}
        >
          {services.map((service, index) => (
            <div
              key={service.title}
              className="service-card group relative p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-red-500/30 hover:-translate-y-2 transition-all duration-300"
              style={{ 
                marginTop: window.innerWidth >= 1024 ? (index % 3 === 1 ? '40px' : index % 3 === 2 ? '80px' : '0') : '0',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Icon */}
              <div className="mb-4 sm:mb-6">
                <div className="inline-flex p-3 sm:p-4 rounded-lg sm:rounded-xl bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 group-hover:rotate-[5deg] group-hover:scale-110">
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-red-500 transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed mb-4 sm:mb-6">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-white/5 text-white/70 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Learn More Link */}
              <a
                href="#"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-red-500 transition-colors duration-300 group/link"
              >
                Learn More
                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none glow-red-subtle" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
