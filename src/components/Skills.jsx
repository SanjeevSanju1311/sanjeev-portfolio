import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaNodeJs, FaJava, 
  FaGitAlt, FaDocker, FaFigma, FaDatabase, FaGithub
} from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiMongodb, SiMysql, SiCanva, SiTypescript } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

const skillCategories = [
  {
    id: 0,
    title: "Frontend",
    description: "Building responsive and interactive user interfaces.",
    icon: <FaReact className="card-main-icon" style={{ color: '#61DAFB' }} />,
    skills: [
      { name: "HTML", icon: <FaHtml5 color="#E34F26" /> },
      { name: "CSS", icon: <FaCss3Alt color="#1572B6" /> },
      { name: "JavaScript", icon: <FaJs color="#F7DF1E" /> },
      { name: "React.js", icon: <FaReact color="#61DAFB" /> },
      { name: "Tailwind", icon: <SiTailwindcss color="#06B6D4" /> },
      { name: "Bootstrap", icon: <FaBootstrap color="#7952B3" /> }
    ]
  },
  {
    id: 1,
    title: "Backend",
    description: "Developing robust APIs and server-side applications.",
    icon: <FaNodeJs className="card-main-icon" style={{ color: '#339933' }} />,
    skills: [
      { name: "Node.js", icon: <FaNodeJs color="#339933" /> },
      { name: "Express.js", icon: <SiExpress color="#ffffff" /> },
      { name: "Java", icon: <FaJava color="#007396" /> },
      { name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
      { name: "MySQL", icon: <SiMysql color="#4479A1" /> }
    ]
  },
  {
    id: 2,
    title: "Tools & Platforms",
    description: "Tools and utilities that boost my productivity.",
    icon: <FaGitAlt className="card-main-icon" style={{ color: '#F05032' }} />,
    skills: [
      { name: "Git", icon: <FaGitAlt color="#F05032" /> },
      { name: "GitHub", icon: <FaGithub color="#ffffff" /> },
      { name: "VS Code", icon: <VscVscode color="#007ACC" /> },
      { name: "Docker", icon: <FaDocker color="#2496ED" /> },
      { name: "Figma", icon: <FaFigma color="#F24E1E" /> },
      { name: "Canva", icon: <SiCanva color="#00C4CC" /> },
      { name: "Antigravity", icon: <div style={{fontWeight: 'bold', color: '#fff'}}>AG</div> }
    ]
  },
  {
    id: 3,
    title: "Soft Skills",
    description: "Interpersonal skills for effective teamwork.",
    icon: <div className="card-main-icon" style={{ fontSize: '4rem' }}>🤝</div>,
    skills: [
      { name: "Communication", icon: "🗣️" },
      { name: "Leadership", icon: "👑" },
      { name: "Collaboration", icon: "👥" },
      { name: "Problem Solving", icon: "🧩" },
      { name: "Creative Thinking", icon: "💡" }
    ]
  },
  {
    id: 4,
    title: "AI Assistants",
    description: "Leveraging AI for rapid development and architecture.",
    icon: <div className="card-main-icon" style={{ fontSize: '4rem' }}>🤖</div>,
    skills: [
      { name: "ChatGPT", icon: "💬" },
      { name: "Claude", icon: "🧠" },
      { name: "Google Gemini", icon: "✨" },
      { name: "GitHub Copilot", icon: "✈️" }
    ]
  }
];

const Skills = () => {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // The container will be 500vh tall to allow scrolling through 5 cards.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollXProgress } = useScroll({
    container: carouselRef
  });

  const progress = isMobile ? scrollXProgress : scrollYProgress;

  // Map scroll progress (0 to 1) directly to a float index (0 to 4)
  const activeIndexFloat = useTransform(progress, [0, 1], [0, skillCategories.length - 1]);
  
  // Use a spring to make the transitions ultra-smooth when scrubbing
  const smoothIndex = useSpring(activeIndexFloat, { damping: 25, stiffness: 100, mass: 1 });

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(smoothIndex, "change", (latest) => {
    setActiveIndex(Math.round(latest));
  });

  return (
    <section ref={containerRef} id="skills" className="skills-scroll-container">
      <div className="skills-sticky-wrapper">
        
        {/* Header */}
        <div className="skills-header-3d">
          <motion.div className="eyebrow-badge">
            <span className="dot"></span> WHAT I DO BEST
          </motion.div>
          <h2 className="section-title">
            <span className="title-solid" style={{ color: '#fff' }}>MY</span> <span style={{ color: 'var(--accent-color)' }}>SKILLS</span>
          </h2>
        </div>

        {/* 3D Coverflow Deck */}
        <div className="coverflow-container" ref={carouselRef}>
          {skillCategories.map((category, index) => {
            return (
              <SkillCard 
                key={category.id} 
                category={category} 
                index={index} 
                currentIndex={smoothIndex} 
              />
            );
          })}
        </div>

        {/* Bottom Tech Dock */}
        <div className="tech-dock-container">
          <div className="tech-dock-label">
            <span className="line"></span>
            TECH I WORK WITH
            <span className="line"></span>
          </div>
          <div className="tech-dock">
            <AnimatePresence mode="popLayout">
              {skillCategories[activeIndex].skills.map((skill) => (
                <motion.div 
                  key={skill.name}
                  className="tech-icon-item"
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="dock-icon-wrapper" style={{ fontSize: '1.5rem', display: 'flex' }}>
                    {skill.icon}
                  </div>
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="tech-dock-footer">
            <div className="star-icon">★</div> Always learning. Always building. <span style={{color: 'var(--accent-color)'}}>Always improving.</span>
          </div>
        </div>

      </div>
    </section>
  );
};

const SkillCard = ({ category, index, currentIndex }) => {
  // Distance from current active index. Negative means card is to the left, positive means to the right.
  const distance = useTransform(currentIndex, (val) => index - val);

  // X Position: Tighter overlap matching reference image
  const xOffset = useTransform(distance, [-2, -1, 0, 1, 2], [-500, -250, 0, 250, 500]);
  
  // Z Position (Depth): Distinct depth sorting
  const zOffset = useTransform(distance, [-2, -1, 0, 1, 2], [-200, -100, 0, -100, -200]);

  // Scale: Center is 1, sides are smaller.
  const scale = useTransform(distance, [-2, -1, 0, 1, 2], [0.8, 0.9, 1, 0.9, 0.8]);

  // Opacity MUST be 1 to prevent bleeding. We use brightness to darken inactive cards.
  const brightness = useTransform(distance, [-2, -1, 0, 1, 2], [0.3, 0.5, 1, 0.5, 0.3]);

  // Border & Glow for active card
  const isCenter = useTransform(distance, (val) => Math.abs(val) < 0.5);
  const borderColor = useTransform(isCenter, (center) => center ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)');
  const boxShadow = useTransform(isCenter, (center) => center ? '0 0 40px rgba(var(--accent-color-rgb), 0.3)' : '0 0 0px transparent');

  return (
    <motion.div 
      className="coverflow-card"
      style={{
        x: xOffset,
        z: zOffset,
        scale,
        opacity: 1, // Fixed to 1
        filter: useTransform(brightness, b => `brightness(${b})`),
        borderColor,
        boxShadow,
        zIndex: useTransform(distance, (val) => 10 - Math.abs(Math.round(val)))
      }}
    >
      <div className="card-content-top">
        {category.icon}
        <h3>{category.title}</h3>
        <p>{category.description}</p>
      </div>

      <div className="card-skills-grid">
        {category.skills.map((skill, idx) => (
          <div key={idx} className="skill-pill">
            <span className="skill-icon">{skill.icon}</span>
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
