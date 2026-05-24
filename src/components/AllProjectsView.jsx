import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ProjectModal from './ProjectModal';

const AllProjectsView = ({ projects, onClose }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <motion.div 
      className="all-projects-overlay"
      data-lenis-prevent
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="all-projects-header">
        <motion.h2
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          ALL PROJECTS
        </motion.h2>
        <button onClick={onClose} className="all-projects-close-btn">
          <span>CLOSE</span>
          <X size={24} />
        </button>
      </div>

      <div className="all-projects-list-full">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id} 
            className="project-row-item"
            onClick={() => setSelectedProject(project)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + (index * 0.05) }}
          >
            <div className="row-number">
              {String(index + 1).padStart(2, '0')}
            </div>

            <div className="row-image-container">
              <img src={project.image} alt={project.title} />
            </div>

            <div className="row-content">
              <h3 className="row-title">{project.title}</h3>
              <p className="row-subtitle">
                {project.subtitle || `${project.skills?.[0]} Project Template`}
              </p>
              
              <div className="row-actions">
                <a href={project.github || '#'} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="row-action-btn icon-btn">
                  <FaGithub size={18} />
                </a>
                <a href={project.live || '#'} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="row-action-btn icon-btn">
                  <ExternalLink size={18} />
                </a>
                <button onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }} className="row-action-btn text-btn">
                  More Details
                </button>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AllProjectsView;
