import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMonitor, FiCode, FiZap, FiPenTool, FiArrowUpRight } from 'react-icons/fi';
import aboutImage from '../assets/image.png';

const About = ({ onExplorePotential }) => {
  const projectList = ["E-Commerce Platform", "AI Chat Dashboard", "Crypto Portfolio", "Social Connect", "Modern SaaS UI"];
  const hackathonList = [
    { name: "Smart India Hackathon", year: "2023" },
    { name: "HackFest Delhi", year: "2024" },
    { name: "CodeKshatra", year: "2022" },
    { name: "DevScript 2.0", year: "2023" },
    { name: "Global Dev Expo", year: "2024" }
  ];

  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeHackIdx, setActiveHackIdx] = useState(0);
  const [hoveredStat, setHoveredStat] = useState(null);

  useEffect(() => {
    let interval;
    if (hoveredStat === 'projects') {
      interval = setInterval(() => {
        setActiveProjectIdx(prev => (prev + 1) % projectList.length);
      }, 2000);
    } else if (hoveredStat === 'hackathons') {
      interval = setInterval(() => {
        setActiveHackIdx(prev => (prev + 1) % hackathonList.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [hoveredStat, hackathonList.length, projectList.length]);

  return (
    <section id="about" className="about-strict-section">
      
      {/* Absolute Decorators */}
      <div className="about-left-decorator">
        <div className="text">BUILDING DIGITAL EXPERIENCES</div>
        <div className="line"></div>
      </div>

      <div className="about-right-nav">
        <div className="nav-item">
          <span className="num">01</span><span className="line"></span><span className="text">DESIGN.</span>
        </div>
        <div className="nav-item">
          <span className="num">02</span><span className="line"></span><span className="text">CODE.</span>
        </div>
        <div className="nav-item">
          <span className="num">03</span><span className="line"></span><span className="text">IMPACT.</span>
        </div>
      </div>

      <motion.div 
        className="about-top-right-image"
        initial={{ x: 120, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.25, 0.8, 0.25, 1] }}
        viewport={{ once: false, amount: 0.6 }}
      >
        <img src={aboutImage} alt="Sanjeev Portfolio" />
      </motion.div>

      <div className="about-bottom-left-topo">
        <svg viewBox="0 0 200 200" preserveAspectRatio="none">
           <path d="M0,200 Q50,150 100,200 T200,200" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.1"/>
           <path d="M0,180 Q50,130 100,180 T200,180" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.15"/>
           <path d="M0,160 Q50,110 100,160 T200,160" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.2"/>
           <path d="M0,140 Q50,90 100,140 T200,140" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.1"/>
           <path d="M0,120 Q50,70 100,120 T200,120" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.05"/>
        </svg>
      </div>

      <div className="about-bottom-right-diag">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="100" x2="100" y2="0" stroke="#FFD700" strokeWidth="1" opacity="0.2" />
          <line x1="20" y1="100" x2="100" y2="20" stroke="#FFD700" strokeWidth="1" opacity="0.2" />
          <line x1="40" y1="100" x2="100" y2="40" stroke="#FFD700" strokeWidth="1" opacity="0.2" />
          <line x1="60" y1="100" x2="100" y2="60" stroke="#FFD700" strokeWidth="1" opacity="0.2" />
          <line x1="80" y1="100" x2="100" y2="80" stroke="#FFD700" strokeWidth="1" opacity="0.2" />
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="about-content">
        
        {/* Top Bar */}
        <motion.div 
          className="about-top"
          initial={{ y: -80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.8, 0.25, 1] }}
          viewport={{ once: false, amount: 0.6 }}
        >
          <span className="num">01</span>
          <span className="line"></span>
          <span className="text">ABOUT ME</span>
        </motion.div>

        {/* Hero */}
        <div className="about-hero">
          <motion.div 
            className="hero-text"
            initial={{ x: -120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.3, ease: [0.25, 0.8, 0.25, 1] }}
            viewport={{ once: false, amount: 0.6 }}
          >
            <h1>I DON'T JUST<br/>BUILD<br/><span className="yellow">WEBSITES.</span></h1>
            <div className="hero-line"></div>
            <h2>I CREATE DIGITAL <span className="yellow">EXPERIENCES</span> THAT<br/>PEOPLE REMEMBER.</h2>
          </motion.div>
          <div className="hero-divider">
            <div className="dot"></div>
          </div>
        </div>

        {/* Mobile Image (Visible only on smaller screens) */}
        <motion.div 
          className="mobile-hero-image"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
          viewport={{ once: false, amount: 0.6 }}
        >
          <img src={aboutImage} alt="Sanjeev Portfolio" />
        </motion.div>

        {/* Middle (Bio, Skills, Quote) */}
        <motion.div 
          className="about-middle"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.8, 0.25, 1], delay: 0.1 }}
          viewport={{ once: false, amount: 0.6 }}
        >
          <div className="bio-col">
            <p>
              I'm a final year student and passionate web developer who loves <span className="yellow">turning ideas into real, impactful digital experiences.</span> I build applications that are fast, accessible, and visually engaging.
              <br/><br/>
              I believe in writing <span className="yellow">clean code</span>, crafting <span className="yellow">smooth animations</span>, and delivering <span className="yellow">seamless user experiences.</span> My focus is bridging the gap between complex logic and beautiful design to build robust, scalable solutions.
            </p>
          </div>

          <div className="mid-divider"></div>

          <div className="quote-col">
            <div className="quote-mark">“</div>
            <p>
              Beyond code, I am committed to building meaningful digital experiences <span className="yellow">that leave a lasting impact on users and the web ecosystem.</span>
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="about-stats"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.25, 0.8, 0.25, 1], delay: 0.2 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className="stat-item" onMouseEnter={() => setHoveredStat('projects')} onMouseLeave={() => setHoveredStat(null)}>
            <span className="num">10+</span>
            <span className="label yellow">PROJECTS</span>
            <span className="desc">Completed</span>
            <AnimatePresence>
              {hoveredStat === 'projects' && (
                <motion.div className="stat-tooltip" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}}>
                  <div className="title">{projectList[activeProjectIdx]}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="stat-line"></div>
          
          <div className="stat-item" onMouseEnter={() => setHoveredStat('hackathons')} onMouseLeave={() => setHoveredStat(null)}>
            <span className="num">4+</span>
            <span className="label yellow">HACKATHONS</span>
            <span className="desc">Participated</span>
            <AnimatePresence>
              {hoveredStat === 'hackathons' && (
                <motion.div className="stat-tooltip" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}}>
                  <div className="title">{hackathonList[activeHackIdx].name}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="stat-line"></div>
          
          <div className="stat-item" onMouseEnter={() => setHoveredStat('certs')} onMouseLeave={() => setHoveredStat(null)} onClick={() => onExplorePotential && onExplorePotential()}>
            <span className="num">30+</span>
            <span className="label yellow">CERTIFICATES</span>
            <span className="desc">Earned</span>
            <AnimatePresence>
              {hoveredStat === 'certs' && (
                <motion.div className="stat-tooltip" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}}>
                  <div className="title">View Collection</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
