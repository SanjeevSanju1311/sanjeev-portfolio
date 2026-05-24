import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';

import Loader from './components/Loader';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import NavBar from './components/NavBar';

const SectionWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

import AllProjectsView from './components/AllProjectsView';
import { mockProjects } from './components/Projects';
import Potential from './components/Potential';

import MobileNav from './components/MobileNav';

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [activeSection, setActiveSection] = useState('home');
  const [currentView, setCurrentView] = useState('main'); // 'main' or 'potential'
  const [savedScroll, setSavedScroll] = useState(0);
  const lenisRef = useRef(null);

  const handleExplorePotential = () => {
    setSavedScroll(window.scrollY);
    setCurrentView('potential');
  };

  const handleBackToHome = () => {
    setCurrentView('main');
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => 1 - Math.pow(1 - t, 4), // Custom quartic easing for smoother feel
      lerp: 0.1, // Added lerp for better interpolation
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });
    
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync section highlighting with Lenis scroll
    lenis.on('scroll', () => {
      if (currentView !== 'main') return;
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      let current = '';

      if (window.scrollY < 50) {
        current = 'home';
      } else {
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 400 && rect.bottom > 400) {
              current = section;
            }
          }
        }
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
          current = 'contact';
        }
      }

      if (current) {
        setActiveSection(current);
      }
    });

    return () => {
      lenis.destroy();
    };
  }, [currentView]);

  // We manage scroll positions when components mount using helper components inside the views


  // Lock body scroll when overlay is open
  useEffect(() => {
    if (showAllProjects) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showAllProjects]);

  return (
    <>
      <div className="noise-overlay" />
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {!loading && (
        <AnimatePresence mode="wait">
          {currentView === 'main' ? (
            <motion.div
              key="main-portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MainViewScroll savedScroll={savedScroll} lenisRef={lenisRef} />
              {isMobile ? <MobileNav activeSection={activeSection} /> : <NavBar activeSection={activeSection} />}
              <main className={`main-content ${activeSection === 'home' ? 'home-active' : ''}`}>
                <SectionWrapper><Home /></SectionWrapper>
                <SectionWrapper><About onExplorePotential={handleExplorePotential} /></SectionWrapper>
                <SectionWrapper><Skills /></SectionWrapper>
                <SectionWrapper><Projects onShowAll={() => setShowAllProjects(true)} /></SectionWrapper>
                <SectionWrapper><Contact onExplorePotential={handleExplorePotential} /></SectionWrapper>
              </main>

              <AnimatePresence>
                {showAllProjects && (
                  <AllProjectsView projects={mockProjects} onClose={() => setShowAllProjects(false)} />
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="potential-page"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <PotentialViewScroll lenisRef={lenisRef} />
              <Potential onClose={handleBackToHome} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

const MainViewScroll = ({ savedScroll, lenisRef }) => {
  useEffect(() => {
    const handleScroll = () => {
      if (lenisRef.current) lenisRef.current.scrollTo(savedScroll, { immediate: true });
      window.scrollTo(0, savedScroll);
    };
    const timer = setTimeout(handleScroll, 50);
    return () => clearTimeout(timer);
  }, [savedScroll, lenisRef]);
  return null;
};

const PotentialViewScroll = ({ lenisRef }) => {
  useEffect(() => {
    const handleScroll = () => {
      if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    };
    const timer = setTimeout(handleScroll, 50);
    return () => clearTimeout(timer);
  }, [lenisRef]);
  return null;
};

function App() {
  return (
    <AppContent />
  );
}

export default App;
