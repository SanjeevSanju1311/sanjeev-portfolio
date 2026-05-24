import { motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div 
      className="project-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="project-modal-content"
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        <button className="project-modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="project-modal-image-container">
          <img src={project.image} alt={project.title} className="project-modal-image" />
        </div>
        
        <div className="project-modal-details">
          <h2 className="project-modal-title">{project.title}</h2>
          
          <div className="project-modal-skills">
            {project.skills?.map((skill, index) => (
              <span key={index} className="skill-tag modal-skill-tag">{skill}</span>
            ))}
          </div>
          
          <p className="project-modal-desc">{project.description}</p>
          
          <div className="project-modal-actions">
            <a href={project.url || '#'} className="modal-action-btn primary" target="_blank" rel="noreferrer">
              <ExternalLink size={18} /> Visit Live
            </a>
            <a href={project.url || '#'} className="modal-action-btn secondary" target="_blank" rel="noreferrer">
              <FaGithub size={18} /> View Source
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
