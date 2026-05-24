import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code2, Briefcase, Mail } from 'lucide-react';
import InteractiveImage from './InteractiveImage';

const NavBar = ({ activeSection }) => {

  const navItems = [
    { id: 'home', label: 'HOME', icon: <Home size={20} /> },
    { id: 'about', label: 'ABOUT', icon: <User size={20} /> },
    { id: 'skills', label: 'SKILLS', icon: <Code2 size={20} /> },
    { id: 'projects', label: 'WORK', icon: <Briefcase size={20} /> },
    { id: 'contact', label: 'CONTACT', icon: <Mail size={20} /> },
  ];

  return (
    <AnimatePresence>
      {activeSection !== 'home' && (
        <motion.nav 
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="sidebar-nav"
        >
          <div className="sidebar-top">
            <div className="sidebar-profile">
              <InteractiveImage className="profile-img" />
            </div>
          </div>

          <div className="sidebar-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`sidebar-link ${activeSection === item.id ? 'active' : ''}`}
              >
                <span className="link-icon">{item.icon}</span>
                <span className="link-text">{item.label}</span>
                {activeSection === item.id && (
                  <motion.div 
                    layoutId="active-pill"
                    className="active-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="sidebar-bottom">

            <div className="sidebar-copyright">
              © {new Date().getFullYear()} Your Name
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default NavBar;
