import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, ArrowRight } from 'lucide-react';

const experienceData = [
  {
    type: 'internship',
    title: "Google Developers",
    subtitle: "Contributor",
    date: "2023",
    color: "#4285F4",
    color_rgb: "66, 133, 244",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
    techStack: ["Open Source", "Lighthouse", "Web Performance", "Technical Writing", "Git / GitHub"],
    accomplishments: [
      "Contributed code to critical open-source initiatives under the Google Developers Group.",
      "Optimized Core Web Vitals, improving page load speeds by 25% across community platforms.",
      "Authored comprehensive technical guides to streamline developer onboarding."
    ]
  },
  {
    type: 'internship',
    title: "TechNova Solutions",
    subtitle: "Full Stack Intern",
    date: "2023",
    color: "#FF3366",
    color_rgb: "255, 51, 102",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    techStack: ["React", "Node.js", "Express", "REST APIs", "MongoDB"],
    accomplishments: [
      "Architected and built scalable RESTful APIs handling high-throughput web traffic.",
      "Developed interactive data dashboards that elevated operations and business metrics by 40%.",
      "Coordinated with frontend engineers to write modular, reusable component patterns."
    ]
  },
  {
    type: 'internship',
    title: "Creative Labs",
    subtitle: "Frontend Intern",
    date: "2022",
    color: "#00F5FF",
    color_rgb: "0, 245, 255",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    techStack: ["React", "Figma", "Framer Motion", "CSS Grid", "Responsive Design"],
    accomplishments: [
      "Translated complex designer wireframes from Figma into pixel-perfect frontend pages.",
      "Crafted responsive, hardware-accelerated animations using Framer Motion.",
      "Audited semantic markup and tab structures for WCAG accessibility compliance."
    ]
  },
  {
    type: 'education',
    title: "B.E. Computer Science & Engineering",
    subtitle: "Education Milestone",
    date: "2023 - 2027",
    color: "#10B981",
    color_rgb: "16, 185, 129",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
    techStack: ["Data Structures", "Algorithms", "C++", "Database Systems", "Software Engineering"],
    accomplishments: [
      "Maintaining an exceptional academic record in core computing disciplines.",
      "Engaged in hands-on practical courses covering complex computational theories.",
      "Developed algorithmic pipelines for machine learning and data processing tasks."
    ]
  }
];

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeItem = experienceData[activeTab];

  return (
    <section id="experience" className="journey-section-v3">
      <div className="journey-content-wrapper">
        <div className="journey-v3-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            My Journey
          </motion.h2>
          <motion.p 
            className="journey-v2-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            A narrative of academic foundation and professional milestones.
          </motion.p>
        </div>

        {/* Console Container */}
        <div className="experience-console">
          {/* Left Panel: Tabs Navigator */}
          <motion.div 
            className="console-tabs-sidebar"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="sidebar-track-line" />
            {experienceData.map((item, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  className={`console-tab-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(idx)}
                >
                  {/* Liquid Glowing Slider Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeConsoleTab"
                      className="active-tab-glow-bg"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      style={{
                        background: `linear-gradient(90deg, rgba(${item.color_rgb}, 0.08) 0%, rgba(${item.color_rgb}, 0.02) 100%)`,
                        borderLeft: `3px solid ${item.color}`
                      }}
                    />
                  )}

                  {/* Bullet Node */}
                  <div className="tab-node-connector">
                    <div 
                      className={`tab-node-circle ${isActive ? 'active-node' : ''}`} 
                      style={{ 
                        borderColor: item.color,
                        boxShadow: isActive ? `0 0 15px ${item.color}` : 'none',
                        backgroundColor: isActive ? item.color : 'transparent'
                      }}
                    />
                  </div>

                  {/* Tab Meta Details */}
                  <div className="tab-meta">
                    <span className="tab-date" style={{ color: isActive ? item.color : 'var(--text-secondary)' }}>{item.date}</span>
                    <h4 className="tab-company">{item.title}</h4>
                    <span className="tab-role">{item.subtitle}</span>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Right Panel: Holographic Glass Showcase */}
          <motion.div 
            className="console-showcase-pane"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="showcase-card-panel"
                initial={{ opacity: 0, x: 20, scale: 0.98, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, scale: 0.98, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                style={{ '--active-color': activeItem.color }}
              >
                <div className="showcase-card-inner">
                  {/* Card Glowing Line Top */}
                  <div className="card-top-lightbar" style={{ background: `linear-gradient(90deg, transparent, ${activeItem.color}, transparent)` }} />

                  {/* Header Details */}
                  <div className="showcase-header">
                    <div className="showcase-ring-container">
                      <div className="rotating-outer-ring" style={{ border: `2px dashed ${activeItem.color}` }} />
                      <div 
                        className="showcase-icon-badge" 
                        style={{ 
                          color: activeItem.color,
                          backgroundColor: `rgba(${activeItem.color_rgb}, 0.15)`
                        }}
                      >
                        {activeItem.type === 'education' ? <GraduationCap size={28} /> : <Briefcase size={28} />}
                      </div>
                    </div>

                    <div className="showcase-title-meta">
                      <div className="showcase-badge-row">
                        <span 
                          className="showcase-pill-date" 
                          style={{ 
                            backgroundColor: `rgba(${activeItem.color_rgb}, 0.1)`, 
                            color: activeItem.color,
                            border: `1px solid rgba(${activeItem.color_rgb}, 0.2)`
                          }}
                        >
                          {activeItem.date}
                        </span>
                        <span className="showcase-pill-type">
                          {activeItem.type.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="showcase-role-title">
                        {activeItem.type === 'education' ? "Bachelor of Engineering" : activeItem.subtitle}
                      </h3>
                      <h4 className="showcase-org-name" style={{ color: activeItem.color }}>
                        {activeItem.title}
                      </h4>
                    </div>
                  </div>

                  <div className="showcase-divider" />

                  {/* Core Tech Stack Section */}
                  <div className="showcase-tech-section">
                    <span className="tech-section-label">Core Tech Stack:</span>
                    <div className="tech-tags-grid">
                      {activeItem.techStack.map((tech, i) => (
                        <span 
                          key={i} 
                          className="console-tech-pill"
                          style={{
                            border: `1px solid rgba(${activeItem.color_rgb}, 0.15)`,
                            background: `rgba(${activeItem.color_rgb}, 0.03)`
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Accomplishments Bullet List */}
                  <div className="showcase-accomplishments-section">
                    <span className="accomplishments-label">Key Milestones & Deliverables:</span>
                    <ul className="accomplishments-list">
                      {activeItem.accomplishments.map((acc, i) => (
                        <li key={i} className="accomplishment-item">
                          <span className="accomplishment-bullet" style={{ color: activeItem.color }}>
                            <ArrowRight size={16} />
                          </span>
                          <p className="accomplishment-text">{acc}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
