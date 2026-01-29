import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  Send,
  Twitter,
  Linkedin,
  Dribbble,
  Github,
  Instagram,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Dribbble', icon: Dribbble, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Content animations
      const items = contentRef.current?.querySelectorAll('.animate-item');
      if (items) {
        gsap.fromTo(
          items,
          { y: 50, opacity: 0 },
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

      // Form animation
      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Social links animation
      const socials = section.querySelectorAll('.social-link');
      gsap.fromTo(
        socials,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <footer
      ref={sectionRef}
      id="footer"
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black to-black" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-[3%] py-16 sm:py-24 md:py-32">
        {/* CTA Section */}
        <div ref={contentRef} className="text-center mb-12 sm:mb-20">
          <span className="animate-item block text-xs uppercase tracking-[3px] text-red-500 mb-3 sm:mb-4">
            Let's Work Together
          </span>
          <h2 className="animate-item text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6">
            Ready to Start<br />
            <span className="text-white/60">Your Project?</span>
          </h2>
          <p className="animate-item text-white/60 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 px-4 sm:px-0">
            I'm always excited to discuss new opportunities and creative challenges. 
            Let's create something amazing together.
          </p>
          <a
            href="mailto:hello@ade.design"
            className="animate-item group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-red-500 text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-sm sm:text-base"
          >
            Get In Touch
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-20">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-6 p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Send a Message</h3>
            
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm text-white/60 mb-1.5 sm:mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-red-500 transition-colors duration-300 text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm text-white/60 mb-1.5 sm:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-red-500 transition-colors duration-300 text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-xs sm:text-sm text-white/60 mb-1.5 sm:mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-red-500 transition-colors duration-300 resize-none text-sm"
                placeholder="Tell me about your project..."
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || submitted}
              className={`w-full flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 sm:py-4 font-semibold rounded-lg sm:rounded-xl transition-all duration-300 text-sm sm:text-base ${
                submitted
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-black hover:bg-red-500 hover:text-white'
              }`}
            >
              {isSubmitting ? (
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : submitted ? (
                <>Message Sent!</>
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              )}
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Contact Info</h3>
              <div className="space-y-3 sm:space-y-4">
                <a
                  href="mailto:hello@ade.design"
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/10 hover:border-red-500/30 transition-all duration-300 group"
                >
                  <div className="p-2 sm:p-3 rounded-md sm:rounded-lg bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-white/50">Email</p>
                    <p className="text-white text-sm sm:text-base group-hover:text-red-500 transition-colors duration-300">
                      hello@ade.design
                    </p>
                  </div>
                </a>
                
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/10 hover:border-red-500/30 transition-all duration-300 group"
                >
                  <div className="p-2 sm:p-3 rounded-md sm:rounded-lg bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-white/50">Phone</p>
                    <p className="text-white text-sm sm:text-base group-hover:text-red-500 transition-colors duration-300">
                      +1 (234) 567-890
                    </p>
                  </div>
                </a>
                
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="p-2 sm:p-3 rounded-md sm:rounded-lg bg-red-500/10 text-red-500">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-white/50">Location</p>
                    <p className="text-white text-sm sm:text-base">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Follow Me</h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="social-link group p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/10 text-white/60 hover:bg-red-500 hover:text-white hover:border-red-500 hover:scale-110 hover:rotate-[10deg] transition-all duration-300"
                    aria-label={social.name}
                  >
                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold">
                Ade<span className="text-red-500">.</span>
              </span>
            </div>
            
            <p className="text-white/40 text-xs sm:text-sm text-center">
              © {new Date().getFullYear()} Ade. All rights reserved.
              <span className="hidden md:inline"> • </span>
              <br className="md:hidden" />
              Crafted with passion
            </p>
            
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="#" className="text-xs sm:text-sm text-white/40 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-xs sm:text-sm text-white/40 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
