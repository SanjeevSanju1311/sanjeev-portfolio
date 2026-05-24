import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const Projects = ({ onShowAll }) => {
  const featuredProjects = mockProjects.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const wrappers = document.querySelectorAll('.project-card-wrapper');
      let currentIdx = 0;
      
      wrappers.forEach((wrapper, index) => {
        const rect = wrapper.getBoundingClientRect();
        if (rect.top <= (window.innerHeight * 0.1) + (index * 35) + 50) {
          currentIdx = index;
        }
      });
      
      setActiveIndex(currentIdx);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="projects-section" id="projects" ref={containerRef}>
      
      {/* Sticky Animated Background */}
      <div className="projects-bg-container">
        <div className="projects-bg-sticky">
          <motion.img 
            src="/projects-bg.png" 
            alt="Cinematic Projects Background"
            className="projects-bg-img"
            style={{ y: bgY, scale: bgScale }}
          />
          <div className="projects-bg-overlay" />
        </div>
      </div>

      <div className="projects-content-wrapper">
        <div className="projects-header-v2">
          <div className="header-column left">
            <motion.h2 
              className="section-title" 
              initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: 0, textAlign: 'left' }}
            >
              Recent Works
            </motion.h2>
          </div>
          <div className="header-column right">
            <AnimatePresence>
              {isVisible && (
                <motion.div 
                  className="project-counter"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <span className="current-num">{String(Math.min(activeIndex + 1, featuredProjects.length)).padStart(2, '0')}</span>
                  <span className="counter-sep">/</span>
                  <span className="total-num">{String(featuredProjects.length).padStart(2, '0')}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {isVisible && (
            <motion.div 
              className="project-progress-dots"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              {featuredProjects.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`progress-dot ${activeIndex === idx ? 'active' : ''}`}
                  onClick={() => {
                    const wrappers = document.querySelectorAll('.project-card-wrapper');
                    wrappers[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="projects-stack-container">
          {featuredProjects.map((project, index) => (
            <VerticalStackedCard 
              key={project.id} 
              project={project} 
              index={index} 
              total={featuredProjects.length}
              onClick={() => setSelectedProject(project)}
            />
          ))}
          
          {/* Final "Show All" Card */}
          <VerticalStackedCard 
            index={featuredProjects.length}
            total={featuredProjects.length}
            isLast={true}
            onShowAll={onShowAll}
          />
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const VerticalStackedCard = ({ project, index, isLast, onShowAll, onClick }) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;

  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 0.96 : 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 0.9 : 0.6]);
  
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return (
    <div 
      ref={containerRef}
      className="project-card-wrapper"
      style={{ 
        top: isMobile ? `${140 + (index * 40)}px` : `calc(10vh + ${index * 35}px)`, 
        zIndex: index 
      }}
    >
      <motion.div 
        className="project-card-new"
        style={{ 
          scale: isLast ? 1 : smoothScale,
          opacity: isLast ? 1 : smoothOpacity,
          background: isLast ? 'var(--bg-color)' : 'var(--surface-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isLast ? (
          <div className="collection-card-inner" style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%', 
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src="/src/assets/collection.png" 
              alt="Project Collection" 
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
            <div className="rotating-border-container" style={{ 
              position: 'relative', 
              padding: '3px', 
              borderRadius: '100px', 
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }} onClick={onShowAll}>
              <motion.div 
                style={{
                  position: 'absolute',
                  width: '150%',
                  height: '150%',
                  background: 'conic-gradient(from 0deg, transparent, var(--accent-color), transparent 30%)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="collection-drawer-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  position: 'relative',
                  zIndex: 2,
                  margin: 0, 
                  padding: '1.4rem 3.8rem', 
                  borderRadius: '100px',
                  background: '#111',
                  color: 'var(--accent-color)',
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%'
                }}
              >
                Show All Collection
              </motion.div>
            </div>
          </div>
        ) : (
          <div onClick={onClick} style={{ width: '100%', height: '100%', cursor: 'pointer' }}>
            <ProjectCard project={project} index={index} />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export const mockProjects = [
  {
    id: 1,
    title: 'Linkify',
    subtitle: 'Global Secure File Sharing Platform',
    description: 'A lightning-fast and secure platform for global file sharing across devices.',
    image: '/src/assets/linkify.png',
    skills: ['Node.js', 'Express', 'React']
  },
  {
    id: 2,
    title: 'Catchey',
    subtitle: 'Musical Emotion & Sentiment Engine',
    description: 'Analyzes music lyrics using Gemini 1.5 Flash to visualize emotional resonance.',
    image: '/src/assets/catchy.png',
    skills: ['Vite', 'Gemini', 'React']
  },
  {
    id: 3,
    title: 'Lumina AI',
    subtitle: 'Neural Knowledge & Insights Engine',
    description: 'Distills PDFs and videos into actionable insights with mastery analytics.',
    image: '/src/assets/lumina.png',
    skills: ['Supabase', 'React', 'Vite']
  },
  {
    id: 4,
    title: 'Moda AI',
    subtitle: 'AI Fashion Consultant & Analyzer',
    description: 'Analyzes outfits via camera for color harmony and fit accuracy using Google Gemini.',
    image: '/src/assets/moda.png',
    skills: ['React', 'Gemini', 'Tailwind']
  },
  {
    id: 5,
    title: 'Exam Pro',
    subtitle: 'Advanced Assessment Dashboard',
    description: 'Secure assessment platform for teachers and students with tab-switch detection.',
    image: '/src/assets/exam.png',
    skills: ['TypeScript', 'React', 'Tailwind']
  },
  {
    id: 6,
    title: 'AI Summarizer',
    subtitle: 'Smart Study & Quiz Companion',
    description: 'Generates instant summaries and AI-powered quizzes for enhanced learning.',
    image: 'https://picsum.photos/seed/aisum/1200/800',
    skills: ['React', 'Gemini', 'CSS']
  },
  {
    id: 7,
    title: 'CareerPath AI',
    subtitle: 'AI-Driven Career Guidance System',
    description: 'Generates personalized career roadmaps for students using AI analysis.',
    image: 'https://picsum.photos/seed/careerpath/1200/800',
    skills: ['JavaScript', 'Vercel', 'AI']
  },
  {
    id: 8,
    title: 'Stock Alert',
    subtitle: 'Real-time Market Watch System',
    description: 'Monitoring tool sending instant alerts for price changes and market shifts.',
    image: 'https://picsum.photos/seed/stockalert/1200/800',
    skills: ['MongoDB', 'Express', 'Node']
  }
];

export default Projects;
