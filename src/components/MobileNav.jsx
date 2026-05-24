import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code2, Briefcase, Mail, Menu, X } from 'lucide-react';

const MobileNav = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME', icon: <Home size={24} /> },
    { id: 'about', label: 'ABOUT', icon: <User size={24} /> },
    { id: 'skills', label: 'SKILLS', icon: <Code2 size={24} /> },
    { id: 'projects', label: 'WORK', icon: <Briefcase size={24} /> },
    { id: 'contact', label: 'CONTACT', icon: <Mail size={24} /> },
  ];

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    opened: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    opened: { x: 0, opacity: 1 }
  };

  return (
    <>
      <button 
        className="mobile-hamburger" 
        onClick={() => setIsOpen(true)}
        aria-label="Open Menu"
      >
        <Menu size={32} color="var(--text-primary)" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial="closed"
            animate="opened"
            exit="closed"
            variants={menuVariants}
          >
            <div className="mobile-menu-header">
              <button onClick={() => setIsOpen(false)} className="close-menu">
                <X size={32} color="var(--text-primary)" />
              </button>
            </div>

            <div className="mobile-menu-links">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`mobile-menu-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                  variants={itemVariants}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                </motion.a>
              ))}
            </div>

            <motion.div className="mobile-menu-footer" variants={itemVariants}>

              <div className="mobile-copyright">
                © {new Date().getFullYear()} SANJEEV
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
