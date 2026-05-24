import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Target, FileCheck, ArrowLeft, ExternalLink, GraduationCap, Briefcase, X } from 'lucide-react';

const education = [
  {
    title: "B.E Computer Science and Engineering",
    role: "P.A College of Engineering and Technology",
    desc: "Pursuing Bachelor of Engineering in Computer Science and Engineering.",
    metric: "Pollachi, TamilNadu",
    date: "2023-present",
    img: "https://picsum.photos/seed/edu1/800/600"
  }
];

const internships = [
  {
    title: "Full Stack Development Intern (30 days)",
    role: "PUMO Technovation india private limited",
    desc: "Assisted in developing full stack web applications by building responsive frontend interfaces, integrating APIs, fixing bugs, and supporting feature implementation to improve application performance. Collaborated with developers during project development, gaining hands-on experience in React.js, backend integration, debugging, database connectivity, and real-world software development workflows.",
    metric: "Coimbatore",
    date: "Dec '25 - Jan '26",
    img: "https://picsum.photos/seed/int1/800/600"
  },
  {
    title: "Web Development Intern (15 days)",
    role: "CodeBind Technologies",
    desc: "Worked as part of a team to build an Online Book Store Management System, contributing to both development and problem-solving during the project. Collaborated with senior developers to learn core web technologies including HTML, CSS, JavaScript, PHP, and MySQL, gained real-world development experience. During this internship, I have improved my teamwork, communication, and problem-solving skills by actively participating in discussions and sharing ideas with team.",
    metric: "Coimbatore",
    date: "Dec 2024",
    img: "https://picsum.photos/seed/int2/800/600"
  },
  {
    title: "UI/UX Design Masterclass",
    role: "NoviTech R&D Private Limited",
    desc: "I successfully completed a 30-day UI/UX Design Masterclass, where I learned the essentials of creating intuitive and user-focused digital experiences. The program covered wireframing, prototyping, design systems, typography, color theory, responsive layouts, and usability principles using modern design tools such as Figma. Throughout this masterclass, I engaged in hands-on projects, case studies, and practical exercises, which enhanced my ability to approach problems creatively and design interfaces that balance both aesthetics and usability. This training strengthened my design thinking, user research, and prototyping skills, while also giving me real-world exposure to professional UI/UX workflows.",
    metric: "Masterclass",
    date: "24 June 2025 - 28 July 2025",
    img: "https://picsum.photos/seed/int3/800/600"
  }
];

const achievements = [
  {
    title: "Top 4 finalist of Ideathon '26",
    role: "SNSCT",
    desc: "Achieved Top 4 finalist position in Ideathon '26 at SNSCT, Coimbatore.",
    metric: "Coimbatore",
    date: "Feb 2026",
    img: "https://picsum.photos/seed/ach1/800/600"
  },
  {
    title: "top 20 finalist of Hack IT on'25",
    role: "KPRIET",
    desc: "Achieved top 20 finalist position in Hack IT on'25 at KPRIET, Coimbatore.",
    metric: "Coimbatore",
    date: "Oct 2025",
    img: "https://picsum.photos/seed/ach2/800/600"
  },
  {
    title: "2nd place in Paper Presentation",
    role: "NIT",
    desc: "Secured 2nd place in Paper Presentation at NIT, Coimbatore.",
    metric: "Coimbatore",
    date: "Mar 2025",
    img: "https://picsum.photos/seed/ach3/800/600"
  },
  {
    title: "Top 6 finalist of Project Expo-24",
    role: "PACET",
    desc: "Achieved Top 6 finalist position in Project Expo-24 at PACET, Pollachi.",
    metric: "Pollachi",
    date: "Feb 2024",
    img: "https://picsum.photos/seed/ach4/800/600"
  }
];

const participations = [
  {
    title: "Google Summer of Code (Pre-selection)",
    role: "Open Source Contributor",
    desc: "Contributed code to Chromium's web accessibility inspector tool and improved tab indexing navigation.",
    metric: "Open Source",
    date: "2023",
    img: "https://picsum.photos/seed/part1/800/600"
  },
  {
    title: "Developer Student Clubs (GDSC)",
    role: "Technical Core Lead",
    desc: "Organized web development bootcamps, mentored 200+ students, and hosted hackathons at university level.",
    metric: "Leadership",
    date: "2023 - Present",
    img: "https://picsum.photos/seed/part2/800/600"
  },
  {
    title: "DevScript Hackathon 2.0",
    role: "Participant / Finalist",
    desc: "Designed and engineered an automated multi-channel marketing scheduler with analytical insights.",
    metric: "Hackathon",
    date: "2023",
    img: "https://picsum.photos/seed/part3/800/600"
  },
  {
    title: "Global Tech Summit Hackathon",
    role: "Innovator",
    desc: "Collaborated in a team of 4 to design a blockchain-based document verification pipeline.",
    metric: "Hackathon",
    date: "2024",
    img: "https://picsum.photos/seed/part4/800/600"
  }
];

// Generate 20 placeholder certifications for the infinite grid
const certifications = Array.from({ length: 20 }).map((_, i) => ({
  id: `CERT-${1000 + i}`,
  name: `Professional Certificate ${i + 1}`,
  date: `202${Math.floor(Math.random() * 4)}`,
  img: `https://picsum.photos/seed/cert${i}/800/500` // Horizontal aspect ratio
}));

const col1 = certifications.slice(0, 10);
const col2 = certifications.slice(10, 20);

const ModalPopup = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <motion.div 
      className="potential-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="potential-modal-content"
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        <div className="modal-img-container">
          <img src={data.img} alt={data.title || data.name} />
        </div>
        <div className="modal-body">
          <div className="modal-header-info">
            <span className="modal-date">{data.date}</span>
            <span className="modal-badge">{data.metric || data.id}</span>
          </div>
          <h2 className="modal-title">{data.title || data.name}</h2>
          {data.role && <h3 className="modal-role">{data.role}</h3>}
          {data.desc && <p className="modal-desc">{data.desc}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Potential = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('education');
  const [selectedItem, setSelectedItem] = useState(null);

  const [stars] = useState(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: (Math.random() * 100).toFixed(2) + '%',
      top: (Math.random() * 100).toFixed(2) + '%',
      opacity: (Math.random() * 0.6).toFixed(2),
      animationDuration: (Math.random() * 4 + 2).toFixed(2) + 's'
    }));
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedItem]);

  const tabVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  const renderGrid = (items) => (
    <motion.div
      key={activeTab}
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="potential-grid"
    >
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          variants={cardVariants}
          className="potential-card achievement-card"
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          onClick={() => setSelectedItem(item)}
          style={{ cursor: 'pointer' }}
        >
          <div className="card-glow" />
          <div className="card-top-header">
            <span className="card-date">{item.date}</span>
            <span className="card-badge">{item.metric}</span>
          </div>
          <h3 className="card-title">{item.title}</h3>
          <h4 className="card-role" style={{ color: 'var(--accent-color)' }}>{item.role}</h4>
          <p className="card-description">
            {activeTab === 'internship' ? (item.desc.length > 120 ? item.desc.substring(0, 120) + "..." : item.desc) : item.desc}
          </p>
          {activeTab === 'internship' && (
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-color)', marginTop: '0.5rem', display: 'block' }}>Click to show full details</span>
          )}
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <div className="potential-page" data-theme="dark">
      <div className="star-field">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              opacity: parseFloat(star.opacity),
              animationDuration: star.animationDuration
            }}
          />
        ))}
      </div>

      <div className="potential-container">
        <header className="potential-nav-header">
          <button className="potential-back-btn premium-glass" onClick={onClose}>
            <ArrowLeft size={18} />
            <span>BACK TO HOME</span>
          </button>
          <div className="potential-logo">POTENTIAL //</div>
        </header>

        <div className="potential-title-block">
          <div className="potential-eyebrow">BEYOND THE RESUME</div>
          <h1 className="potential-title">
            <span className="title-solid">MY</span>{' '}
            <span className="title-outline">POTENTIAL.</span>
          </h1>
          <p className="potential-subtitle">
            A comprehensive look at my competitive records, community engagement, accredited expertise, education, and internships.
          </p>
        </div>

        <div className="potential-tabs-container">
          <div className="potential-tabs">
            {[
              { id: 'education', label: 'EDUCATION', icon: <GraduationCap size={18} /> },
              { id: 'internship', label: 'INTERNSHIPS', icon: <Briefcase size={18} /> },
              { id: 'achievements', label: 'ACHIEVEMENTS', icon: <Award size={18} /> },
              { id: 'participations', label: 'PARTICIPATIONS', icon: <Target size={18} /> },
              { id: 'certifications', label: 'CERTIFICATIONS', icon: <FileCheck size={18} /> }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  className={`potential-tab-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePotentialTab"
                      className="active-potential-tab-bg"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="tab-item-content">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="potential-content-pane">
          <AnimatePresence mode="wait">
            {activeTab === 'education' && renderGrid(education)}
            {activeTab === 'internship' && renderGrid(internships)}
            {activeTab === 'achievements' && renderGrid(achievements)}
            {activeTab === 'participations' && renderGrid(participations)}

            {activeTab === 'certifications' && (
              <motion.div
                key="certifications"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="cert-masonry-wrapper"
              >
                <div className="cert-infinite-wrapper">
                  <div className="cert-scroll-column column-up">
                    <div className="cert-scroll-track">
                      {[...col1, ...col1].map((item, idx) => (
                        <div
                          key={`col1-${idx}`}
                          className="cert-scroll-item"
                          onClick={() => setSelectedItem(item)}
                        >
                          <img src={item.img} alt={item.name} loading="lazy" />
                          <div className="cert-scroll-overlay">
                            <span className="cert-hover-date">{item.date}</span>
                            <h4 className="cert-hover-title">{item.name}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="cert-scroll-column column-down">
                    <div className="cert-scroll-track">
                      {[...col2, ...col2].map((item, idx) => (
                        <div
                          key={`col2-${idx}`}
                          className="cert-scroll-item"
                          onClick={() => setSelectedItem(item)}
                        >
                          <img src={item.img} alt={item.name} loading="lazy" />
                          <div className="cert-scroll-overlay">
                            <span className="cert-hover-date">{item.date}</span>
                            <h4 className="cert-hover-title">{item.name}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="drive-link-container">
                  <a href="https://drive.google.com/drive/folders/1pwWmYvAp3TTDddw8DAWp6XjEp_jzYAS0" target="_blank" rel="noreferrer" className="drive-btn premium-glass">
                    <span>Show All Certificate Collection</span>
                    <ExternalLink size={18} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ModalPopup data={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Potential;
