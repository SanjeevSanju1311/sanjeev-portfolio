import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import collectionImg from '../assets/collection.png';
import linkifyImg from '../assets/linkify.png';
import catchyImg from '../assets/catchy.png';
import luminaImg from '../assets/lumina.png';
import modaImg from '../assets/moda.png';
import examImg from '../assets/exam.png';
import xenthisImg from '../assets/xenthis.png';
import qrGeneratorImg from '../assets/QR generator.png';
import calculatorImg from '../assets/calculator.png';
import todoImg from '../assets/todo.png';

const Projects = ({ onShowAll }) => {
  const featuredProjects = mockProjects.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);
  const stackRef = useRef(null);
  
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

  const { scrollYProgress: stackProgress } = useScroll({
    target: stackRef,
    offset: ["start 50%", "end 50%"]
  });

  useMotionValueEvent(stackProgress, "change", (latest) => {
    const totalCards = featuredProjects.length + 1; // 5 featured + 1 show all = 6
    let newIndex = Math.floor(latest * totalCards);
    if (newIndex >= totalCards) newIndex = totalCards - 1;
    if (newIndex < 0) newIndex = 0;
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  return (
    <section className="projects-section" id="projects" ref={containerRef}>
      

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

        <div className="projects-stack-container" ref={stackRef}>
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
      data-index={index}
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
              src={collectionImg} 
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

// eslint-disable-next-line react-refresh/only-export-components
export const mockProjects = [
  {
    id: 1,
    title: 'Linkify',
    subtitle: 'Global Secure File Sharing Platform',
    description: 'Linkify is a cutting-edge, ultra-secure file-sharing platform designed for seamless global connectivity. By leveraging end-to-end encryption and a highly optimized architecture, it allows users to effortlessly transfer files of any size across diverse devices and operating systems without compromising on speed or security. The intuitive user interface ensures that sharing sensitive documents or large multimedia files is just a click away.',
    image: linkifyImg,
    skills: ['Node.js', 'Express', 'React', 'MongoDB'],
    liveLink: 'https://linkify-share-pro.vercel.app/',
    githubLink: 'https://github.com/SanjeevSanju1311/Linkify'
  },
  {
    id: 2,
    title: 'Catchey',
    subtitle: 'Musical Emotion & Sentiment Engine',
    description: 'Catchey is an innovative music sentiment engine that deeply analyzes lyrical content to visualize the core emotional resonance of songs. Utilizing the advanced capabilities of Gemini 1.5 Flash, it processes complex poetic structures to generate real-time emotional maps and sentiment scores. This provides music enthusiasts and creators with a profound new way to understand and interact with their favorite tracks.',
    image: catchyImg,
    skills: ['Vite', 'Gemini', 'React', 'Tailwind CSS'],
    liveLink: 'https://catchey.netlify.app/',
    githubLink: 'https://github.com/SanjeevSanju1311/Catchey'
  },
  {
    id: 3,
    title: 'Lumina AI',
    subtitle: 'Neural Knowledge & Insights Engine',
    description: 'Lumina AI transforms the way you learn by distilling lengthy PDFs and educational videos into concise, actionable insights. With an integrated mastery analytics dashboard, it tracks your learning progress, highlights critical knowledge gaps, and dynamically adapts its summaries. Whether you are a student preparing for exams or a professional reviewing reports, Lumina AI is your ultimate knowledge companion.',
    image: luminaImg,
    skills: ['Supabase', 'React', 'Vite', 'AI Integration'],
    liveLink: 'https://lumina-ai-summarizer.vercel.app/',
    githubLink: 'https://github.com/SanjeevSanju1311/Lumina-AI'
  },
  {
    id: 4,
    title: 'Moda AI',
    subtitle: 'AI Fashion Consultant & Analyzer',
    description: 'Moda AI is a personal styling assistant that analyzes your outfits through your device\'s camera. Powered by Google Gemini, it evaluates color harmony, seasonal trends, and fit accuracy to provide bespoke fashion advice. It empowers users to make confident sartorial choices, offering smart wardrobe suggestions and instant feedback on daily looks with remarkable precision.',
    image: modaImg,
    skills: ['React', 'Gemini', 'Tailwind', 'Computer Vision'],
    liveLink: 'https://moda-ai-fashion-analyzer.vercel.app/',
    githubLink: 'https://github.com/SanjeevSanju1311/Moda-AI'
  },
  {
    id: 5,
    title: 'Exam Pro',
    subtitle: 'Advanced Assessment Dashboard',
    description: 'Exam Pro is a robust, highly secure online assessment platform engineered for modern educational institutions. It features an intelligent proctoring system with tab-switch detection and real-time monitoring to ensure academic integrity. For educators, it offers a comprehensive dashboard to effortlessly manage quizzes, analyze student performance metrics, and generate detailed reports.',
    image: examImg,
    skills: ['TypeScript', 'React', 'Tailwind', 'Node.js'],
    liveLink: 'https://exampro-online-exam.netlify.app/',
    githubLink: 'https://github.com/SanjeevSanju1311/Exam-Pro'
  },
  {
    id: 6,
    title: 'AI Summarizer',
    subtitle: 'Smart Study & Quiz Companion',
    description: 'An integral component of the Exam Pro ecosystem, the AI Summarizer acts as an intelligent study companion. It instantly generates highly accurate summaries from extensive study materials and automatically creates AI-powered quizzes to reinforce learning. This tool drastically reduces study time while maximizing retention, making it an indispensable asset for proactive learners.',
    image: examImg,
    skills: ['React', 'Gemini', 'CSS', 'API Integration'],
    liveLink: 'https://exampro-ai-analyzer.netlify.app/',
    githubLink: 'https://github.com/SanjeevSanju1311/ExamPro-AI-Analyzer'
  },
  {
    id: 7,
    title: 'Xenthis',
    subtitle: 'Tech Agency Website',
    description: 'A modern, responsive landing page for a tech agency or startup. It features smooth animations, an engaging layout, and a clean, professional aesthetic to effectively showcase digital services and products.',
    image: xenthisImg,
    skills: ['HTML', 'CSS', 'JavaScript'],
    liveLink: 'https://xenthis-tech.github.io/xenthis/',
    githubLink: 'https://github.com/Xenthis-Tech/xenthis'
  },
  {
    id: 8,
    title: 'QR Code Generator 2.0',
    subtitle: 'Dynamic QR Code Creator',
    description: 'A sleek and highly efficient utility tool designed to instantly generate customizable QR codes from text, URLs, and other data inputs. Built with a responsive and user-friendly interface for seamless operation across devices.',
    image: qrGeneratorImg,
    skills: ['React', 'JavaScript', 'CSS'],
    liveLink: 'https://qr-code-generator-2-0.netlify.app/',
    githubLink: 'https://github.com/SanjeevSanju1311/qr-code-generator-2-0'
  },
  {
    id: 9,
    title: 'Responsive Calculator',
    subtitle: 'Web-Based Calculator',
    description: 'A beautifully designed, fully responsive calculator application. It provides standard arithmetic operations with a clean, intuitive, and satisfying glassmorphism user interface.',
    image: calculatorImg,
    skills: ['HTML', 'CSS', 'JavaScript'],
    liveLink: 'https://simple-responsive-calculator.netlify.app/',
    githubLink: 'https://github.com/SanjeevSanju1311/simple-responsive-calculator'
  },
  {
    id: 10,
    title: 'TaskMaster To-Do',
    subtitle: 'Interactive Task Manager',
    description: 'A robust to-do list application that helps users organize their daily tasks efficiently. Features intuitive task addition, deletion, and status toggling with persistent data management for a flawless user experience.',
    image: todoImg,
    skills: ['React', 'Tailwind', 'JavaScript'],
    liveLink: 'https://to-do-list-sanjeev.netlify.app/',
    githubLink: 'https://github.com/SanjeevSanju1311/to-do-list'
  }
];

export default Projects;
