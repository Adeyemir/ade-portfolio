import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Design: Trends to Watch in 2024',
    category: 'Design',
    date: 'Jan 15, 2024',
    readTime: '5 min read',
    image: '/blog-1.jpg',
    excerpt: 'Explore the emerging trends shaping the future of web design, from AI-powered interfaces to immersive 3D experiences.',
    featured: true,
  },
  {
    id: 2,
    title: 'Building Performant Animations with CSS and GSAP',
    category: 'Development',
    date: 'Jan 10, 2024',
    readTime: '8 min read',
    image: '/blog-2.jpg',
    excerpt: 'Learn how to create smooth, performant animations that enhance user experience without sacrificing performance.',
    featured: false,
  },
  {
    id: 3,
    title: 'Color Psychology in Brand Design',
    category: 'Branding',
    date: 'Jan 5, 2024',
    readTime: '6 min read',
    image: '/blog-3.jpg',
    excerpt: 'Understanding how colors influence perception and how to use them effectively in your brand strategy.',
    featured: false,
  },
];

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
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

      // Featured post reveal
      gsap.fromTo(
        featuredRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Secondary posts
      const secondaryPosts = gridRef.current?.querySelectorAll('.blog-card');
      if (secondaryPosts) {
        gsap.fromTo(
          secondaryPosts,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const featuredPost = blogPosts.find((post) => post.featured);
  const secondaryPosts = blogPosts.filter((post) => !post.featured);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-black overflow-hidden"
    >
      <div className="relative z-10 w-full px-4 sm:px-[3%]">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <span className="animate-item block text-xs uppercase tracking-[3px] text-red-500 mb-3 sm:mb-4">
              Blog
            </span>
            <h2 className="animate-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Latest Insights
            </h2>
          </div>
          <p className="animate-item text-white/60 text-sm sm:text-base max-w-md">
            Thoughts on design, development, and creativity
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div
            ref={featuredRef}
            className="group relative mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer"
          >
            <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[3/1]">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-4 sm:p-6 md:p-10 flex flex-col justify-end">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-red-500 text-white rounded-full">
                  {featuredPost.category}
                </span>
                <span className="flex items-center gap-1 text-xs sm:text-sm text-white/60">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  {featuredPost.date}
                </span>
                <span className="flex items-center gap-1 text-xs sm:text-sm text-white/60">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  {featuredPost.readTime}
                </span>
              </div>

              <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 group-hover:text-red-500 transition-colors duration-300 max-w-2xl line-clamp-2 sm:line-clamp-none">
                {featuredPost.title}
              </h3>

              <p className="text-white/70 text-sm max-w-xl mb-3 sm:mb-4 hidden sm:block">
                {featuredPost.excerpt}
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-white font-medium text-sm group/link"
              >
                <span className="relative">
                  Read Article
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-500 group-hover/link:w-full transition-all duration-300" />
                </span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </a>
            </div>
          </div>
        )}

        {/* Secondary Posts Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {secondaryPosts.map((post) => (
            <article
              key={post.id}
              className="blog-card group relative rounded-xl sm:rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 hover:border-red-500/30 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Category Badge */}
                <span className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-black/50 text-white backdrop-blur-sm rounded-full group-hover:bg-red-500 transition-colors duration-300">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3 text-xs sm:text-sm text-white/50">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-base sm:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:text-red-500 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-white/60 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">
                  {post.excerpt}
                </p>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-red-500 transition-colors duration-300 group/link"
                >
                  Read More
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-12">
          <button className="group inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 border border-white/20 text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm sm:text-base">
            View All Articles
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
