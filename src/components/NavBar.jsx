import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Home, User, Code2, Briefcase, Mail } from 'lucide-react';
import InteractiveImage from './InteractiveImage';

const NavBar = ({ activeSection }) => {
  const [isVisible, setIsVisible] = useState(false);
  const hideTimeoutRef = useRef(null);
  const isHoveredRef = useRef(false);
  
  const { scrollYProgress } = useScroll();

  const startHideTimer = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (window.scrollY < 50) return;
    
    hideTimeoutRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        setIsVisible(false);
      }
    }, 2000); // Hide after 2 seconds of reading/idle
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setIsVisible(false);
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        return;
      }

      setIsVisible(true);
      startHideTimer();
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME', icon: <Home size={20} /> },
    { id: 'about', label: 'ABOUT', icon: <User size={20} /> },
    { id: 'skills', label: 'SKILLS', icon: <Code2 size={20} /> },
    { id: 'projects', label: 'WORK', icon: <Briefcase size={20} /> },
    { id: 'contact', label: 'CONTACT', icon: <Mail size={20} /> },
  ];

  return (
    <AnimatePresence>
      {isVisible && activeSection !== 'skills' && (
        <motion.nav 
          className="bottom-mac-dock"
          initial={{ y: 100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 100, x: "-50%", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => {
            isHoveredRef.current = true;
            setIsVisible(true);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
            startHideTimer();
          }}
        >
          {/* Scroll Progress Outline */}
          <svg className="dock-outline-svg">
            <motion.rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx="35"
              className="dock-outline-rect"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>

          <div className="dock-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`dock-link ${activeSection === item.id ? 'active' : ''}`}
              >
                <div className="dock-icon-wrapper">
                  {item.icon}
                </div>
                <span className="dock-tooltip">{item.label}</span>
                {activeSection === item.id && (
                  <motion.div 
                    layoutId="dock-active-dot"
                    className="dock-active-dot"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default NavBar;
