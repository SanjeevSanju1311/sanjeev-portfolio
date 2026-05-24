import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import InteractiveImage from './InteractiveImage';

const About = ({ onExplorePotential }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "start 40%"]
  });

  const textXLeft = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const textXRight = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const desc = "I am a final year student and passionate web developer, constantly pushing the boundaries of what's possible on the web. I specialize in building highly interactive, accessible, and performant web applications with a focus on premium aesthetics and fluid animations.";
  const words = desc.split(" ");

  const projectList = ["E-Commerce Platform", "AI Chat Dashboard", "Crypto Portfolio", "Social Connect", "Modern SaaS UI"];
  const hackathonList = [
    { name: "Smart India Hackathon", year: "2023" },
    { name: "HackFest Delhi", year: "2024" },
    { name: "CodeKshatra", year: "2022" },
    { name: "DevScript 2.0", year: "2023" },
    { name: "Global Dev Expo", year: "2024" }
  ];

  const [activeProjectIdx, setActiveProjectIdx] = React.useState(0);
  const [activeHackIdx, setActiveHackIdx] = React.useState(0);
  const [hoveredStat, setHoveredStat] = React.useState(null);

  React.useEffect(() => {
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
    <section ref={containerRef} id="about">
      <div className="about-header">
        <div className="about-eyebrow">WHO AM I?</div>
        <motion.h2 
          className="section-title"
          style={{ display: 'flex', gap: '1rem', overflow: 'hidden' }}
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span style={{ x: textXLeft, opacity }}>About</motion.span>
          <motion.span style={{ x: textXRight, opacity }}>Me</motion.span>
        </motion.h2>
      </div>

      <div className="about-grid">
        {/* Column 1: Image Wrapper */}
        <motion.div 
          className="about-image-wrapper"
          initial={{ opacity: 0, x: -50, filter: 'blur(15px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about-image-container">
            <InteractiveImage />
          </div>
        </motion.div>

        {/* Column 2: Bio Text & Stats (Aligned stacked layout) */}
        <div className="about-content-column">
          <motion.div 
            className="about-bio-wrapper"
            initial={{ opacity: 0, x: 50, filter: 'blur(15px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="about-desc">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  style={{ display: 'inline-block', marginRight: '8px', color: 'var(--text-secondary)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0, color: 'var(--text-primary)' }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.02 }}
                >
                  {word}
                </motion.span>
              ))}
            </p>
            <motion.p 
              className="about-highlight-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Beyond code, I am committed to building meaningful digital experiences that leave a lasting impact on users and the web ecosystem.
            </motion.p>
          </motion.div>

          {/* Stats Card */}
          <motion.div 
            className="about-stats"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Projects Stat */}
            <div 
              className={`stat-item ${hoveredStat === 'projects' ? 'stat-active' : ''}`}
              onMouseEnter={() => setHoveredStat('projects')}
              onMouseLeave={() => { setHoveredStat(null); setActiveProjectIdx(0); }}
            >
              <div className="stat-content-wrapper">
                <AnimatePresence mode="wait">
                  {hoveredStat === 'projects' ? (
                    <motion.div
                      key={projectList[activeProjectIdx]}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="stat-dynamic-text"
                    >
                      {projectList[activeProjectIdx]}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="static-projects"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="stat-static"
                    >
                      <span className="stat-num">10+</span>
                      <span className="stat-label">Projects</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Hackathons Stat */}
            <div 
              className={`stat-item ${hoveredStat === 'hackathons' ? 'stat-active' : ''}`}
              onMouseEnter={() => setHoveredStat('hackathons')}
              onMouseLeave={() => { setHoveredStat(null); setActiveHackIdx(0); }}
            >
              <div className="stat-content-wrapper">
                <AnimatePresence mode="wait">
                  {hoveredStat === 'hackathons' ? (
                    <motion.div
                      key={hackathonList[activeHackIdx].name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="stat-dynamic-text"
                    >
                      <div className="hack-name">{hackathonList[activeHackIdx].name}</div>
                      <div className="hack-year">{hackathonList[activeHackIdx].year}</div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="static-hacks"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="stat-static"
                    >
                      <span className="stat-num">4+</span>
                      <span className="stat-label">Hackathons</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Certificates Stat */}
            <div 
              className={`stat-item ${hoveredStat === 'certs' ? 'stat-active' : ''}`}
              onMouseEnter={() => setHoveredStat('certs')}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="stat-content-wrapper">
                <AnimatePresence mode="wait">
                  {hoveredStat === 'certs' ? (
                    <motion.button
                      key="cert-button"
                      onClick={() => onExplorePotential && onExplorePotential()}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="cert-collect-btn"
                      style={{ border: 'none', cursor: 'pointer' }}
                    >
                      View Collection
                    </motion.button>
                  ) : (
                    <motion.div
                      key="static-certs"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="stat-static"
                    >
                      <span className="stat-num">30+</span>
                      <span className="stat-label">Certificates</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
