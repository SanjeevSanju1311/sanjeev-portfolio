import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaArrowRight } from 'react-icons/fa';

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
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scaleHero = useTransform(scrollY, [0, 500], [1, 0.95]);

  const buttonRef = useRef(null);
  const mX = useSpring(0, { stiffness: 150, damping: 15 });
  const mY = useSpring(0, { stiffness: 150, damping: 15 });

  const [particles] = useState(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: (Math.random() * 100).toFixed(2) + '%',
      y: (Math.random() * 100).toFixed(2) + '%',
      opacity: (Math.random() * 0.4).toFixed(2),
      duration: (Math.random() * 8 + 8).toFixed(2),
      size: (Math.random() * 2 + 1).toFixed(2) + 'px'
    }));
  });

  const handleButtonMove = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mX.set(x * 0.35);
    mY.set(y * 0.35);
  };

  const handleButtonLeave = () => {
    mX.set(0);
    mY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
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

  const socialItems = [
    { Icon: FaGithub, link: 'https://github.com/SanjeevSanju1311', color: '#ffffff', hoverColor: '#6e5494' },
    { Icon: FaLinkedin, link: 'https://linkedin.com/in/sanjeevk1311', color: '#ffffff', hoverColor: '#0077B5' },
    { Icon: FaInstagram, link: 'https://www.instagram.com/kongu_sanju_?igsh=dzJ6Ym0xb29rb2Zs', color: '#ffffff', hoverColor: '#E1306C' }
  ];

  return (
    <section id="home" className="home-section" data-theme="dark">
      <StarField />

      <div className="home-bg-image-container">
        <motion.img
          src="/src/assets/image.png"
          className="home-bg-image"
          style={{ y: yBg }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </div>

      {/* BACKGROUND GRAPHICS & BLUR ORBS */}
      <div className="orbit-container">
        <div className="orbit-ring ring-1"></div>
        <div className="orbit-ring ring-2"></div>
        <div className="orbit-ring ring-3"></div>
      </div>

      <div className="cosmic-glow-orb orb-1"></div>
      <div className="cosmic-glow-orb orb-2"></div>
      <div className="home-bg-overlay"></div>

      <div className="home-particles" style={{ pointerEvents: 'none' }}>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="home-particle"
            initial={{
              x: p.x,
              y: p.y,
              opacity: parseFloat(p.opacity)
            }}
            animate={{ y: [null, '-15vh'], opacity: [null, 0] }}
            transition={{ duration: parseFloat(p.duration), repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              backgroundColor: 'var(--accent-color)',
              borderRadius: '50%',
              zIndex: 1
            }}
          />
        ))}
      </div>

      {/* HERO CONTENT */}
      <motion.div
        className="hero-content-grid"
        style={{ opacity, scale: scaleHero }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="hud-status-badge centered"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 2,
            duration: 1,
            type: "spring",
            stiffness: 100
          }}
        >
          <span className="pulse-dot"></span>
          AVAILABLE FOR INTERN / FULL TIME JOB
        </motion.div>

        <div className="hero-left">
          <motion.div className="hero-eyebrow" variants={itemVariants}>
            <span className="eyebrow-line"></span>
            CREATIVE DEVELOPER & DESIGNER
          </motion.div>

          <motion.h1 className="hero-main-title" variants={itemVariants}>
            <div className="title-solid" style={{ color: '#ffffff' }}>SANJEEV</div>
            <div className="title-outline">PORTFOLIO.</div>
          </motion.h1>

          <motion.div className="hero-line-decoration" variants={itemVariants}></motion.div>
        </div>

        <div className="hero-right">
          <motion.p className="hero-right-desc" variants={itemVariants}>
            Final year Full Stack Developer creating immersive web applications using modern technologies, interactive design, and scalable solutions. Passionate about building visually engaging, high-performance digital experiences that blend creativity with innovation.
          </motion.p>

          <motion.div
            variants={itemVariants}
            ref={buttonRef}
            onMouseMove={handleButtonMove}
            onMouseLeave={handleButtonLeave}
            style={{ x: mX, y: mY }}
          >
            <button className="hero-resume-pill premium-glass">
              <span className="btn-glow"></span>
              <span>VIEW RESUME</span>
              <FaArrowRight className="resume-arrow" />
            </button>
          </motion.div>

          <motion.div className="hero-social-links-v2" variants={itemVariants}>
            {socialItems.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                style={{ color: item.color }}
                whileHover={{
                  scale: 1.3,
                  color: item.hoverColor,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                <item.Icon />
              </motion.a>
            ))}
          </motion.div>
        </div>

      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div
        className="hero-explore-v3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <span className="scroll-text">SCROLL TO EXPLORE</span>
        <div className="mouse-indicator">
          <motion.div
            className="mouse-wheel"
            animate={{
              y: [0, 12, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

    </section>
  );
};

export default Home;
