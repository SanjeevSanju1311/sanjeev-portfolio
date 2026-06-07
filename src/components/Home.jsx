import { useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaArrowRight } from 'react-icons/fa';
import resumeFile from '../assets/SANJEEV_RESUME.pdf';

const StarField = () => {
  const [stars] = useState(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: (Math.random() * 100).toFixed(2) + '%',
      y: (Math.random() * 100).toFixed(2) + '%',
      opacityInitial: (Math.random() * 0.5).toFixed(2),
      opacityAnimate: (Math.random() * 0.5).toFixed(2),
      duration: (Math.random() * 5 + 3).toFixed(2),
      delay: (Math.random() * 5).toFixed(2)
    }));
  });

  return (
    <div className="star-field">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          initial={{
            x: star.x,
            y: star.y,
            opacity: parseFloat(star.opacityInitial)
          }}
          animate={{
            opacity: [null, 0.8, parseFloat(star.opacityAnimate)]
          }}
          transition={{
            duration: parseFloat(star.duration),
            repeat: Infinity,
            ease: "easeInOut",
            delay: parseFloat(star.delay)
          }}
        />
      ))}
    </div>
  );
};

const Home = () => {

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const { scrollY } = useScroll();
  
  // Dampen the scroll value for ultra-lazy, smooth scroll-outs
  const smoothScrollY = useSpring(scrollY, { damping: 40, stiffness: 40, mass: 2 });

  // Outbound Scroll Transforms
  const leftX = useTransform(smoothScrollY, [0, 800], [0, -1000]);
  const rightX = useTransform(smoothScrollY, [0, 800], [0, 1000]);
  const fadeOut = useTransform(smoothScrollY, [0, 600], [1, 0]);
  const badgeY = useTransform(smoothScrollY, [0, 800], [0, -200]);
  const buttonsY = useTransform(smoothScrollY, [0, 800], [0, 300]);

  const socialItems = [
    { Icon: FaGithub, link: 'https://github.com/SanjeevSanju1311', color: '#ffffff', hoverColor: '#6e5494' },
    { Icon: FaLinkedin, link: 'https://linkedin.com/in/sanjeevk1311', color: '#ffffff', hoverColor: '#0077B5' },
    { Icon: FaInstagram, link: 'https://www.instagram.com/kongu_sanju_?igsh=dzJ6Ym0xb29rb2Zs', color: '#ffffff', hoverColor: '#E1306C' }
  ];

  return (
    <section id="home" className="home-section" data-theme="dark">
      <StarField />


      {/* MAIN HERO CONTENT */}
      <div className="hero-centered-layout">
        <motion.div
          className="hero-massive-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-badge-wrapper" style={{ opacity: fadeOut, y: badgeY }}>
            <motion.div
              className="hud-status-badge"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1 }}
            >
              <span className="pulse-dot"></span>
              AVAILABLE FOR INTERN / FULL TIME JOB
            </motion.div>

            <motion.div 
              className="hero-eyebrow-center" 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
            >
              CREATIVE DEVELOPER & DESIGNER
            </motion.div>
          </motion.div>

          <div className="hero-massive-title-v2" style={{ display: 'flex', gap: '2vw', justifyContent: 'center' }}>
            <motion.div style={{ x: leftX, opacity: fadeOut }}>
              <motion.div
                className="word-solid"
                initial={{ x: '-50vw', opacity: 0, filter: 'blur(30px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                SANJEEV
              </motion.div>
            </motion.div>

            <motion.div style={{ x: rightX, opacity: fadeOut }}>
              <motion.div
                className="word-outline"
                initial={{ x: '50vw', opacity: 0, filter: 'blur(30px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                PORTFOLIO
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            className="hero-action-buttons" 
            style={{ opacity: fadeOut, y: buttonsY }}
          >
            <motion.a 
              href={resumeFile}
              target="_blank"
              rel="noreferrer"
              className="hero-btn-primary"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
            >
              <span>VIEW RESUME</span>
              <FaArrowRight className="btn-arrow" />
            </motion.a>
            <motion.a 
              href="#projects" 
              className="hero-btn-secondary"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.7 }}
            >
              <span>VIEW WORK</span>
              <FaArrowRight className="btn-arrow" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* VERTICAL SOCIAL ICONS */}
        <motion.div 
          className="hero-social-vertical"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {socialItems.map((item, idx) => (
            <motion.a 
              key={idx} 
              href={item.link} 
              target="_blank" 
              rel="noreferrer"
              variants={itemVariants}
            >
              <item.Icon />
            </motion.a>
          ))}
        </motion.div>

      </div>

      {/* PREMIUM SCROLL INDICATOR */}
      <motion.div
        className="premium-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="scroll-line-container">
          <motion.div
            className="scroll-line-fill"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Home;
