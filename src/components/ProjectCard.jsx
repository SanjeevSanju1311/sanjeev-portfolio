import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);

  // Mouse position for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;

  return (
    <motion.div
      ref={cardRef}
      className="project-card-new"
      onMouseMove={isMobile ? null : handleMouseMove}
      onMouseLeave={isMobile ? null : handleMouseLeave}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: isMobile ? "flat" : "preserve-3d",
      }}
    >
      {/* Background Image */}
      <div className="project-card-image-box">
        <img 
          src={project.image} 
          alt={project.title} 
          className="project-card-image"
        />
        <div className="project-card-overlay" />
      </div>

      {/* Content */}
      <div className="project-card-overlay">
        <div className="project-card-header" style={{ transform: isMobile ? "none" : "translateZ(50px)" }}>
          <h3 className="project-card-title">{project.title}</h3>
        </div>

        <div className="project-card-footer" style={{ transform: isMobile ? "none" : "translateZ(70px)" }}>
          <div className="project-card-tags">
            {project.skills?.map((skill, i) => (
              <span key={i} className="project-tag-new">{skill}</span>
            ))}
          </div>
          
          <div className="project-card-arrow">
            <ArrowUpRight size={32} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
