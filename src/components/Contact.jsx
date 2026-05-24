import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Mail, Phone, ArrowUpRight, MessageCircle } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const contactChannels = [
  {
    id: 0,
    label: "EMAIL",
    value: "k.sanjeevsanju2005@gmail.com",
    link: "mailto:k.sanjeevsanju2005@gmail.com",
    icon: <Mail size={28} />,
    color: "#ff4b4b",
    color_rgb: "255, 75, 75",
    desc: "Send me an email for collaboration inquiries, project proposals, or just to say hello. I'll get back to you within 24 hours."
  },
  {
    id: 1,
    label: "WHATSAPP",
    value: "+91 9944597940",
    link: "https://wa.me/919944597940",
    icon: <MessageCircle size={28} />,
    color: "#25D366",
    color_rgb: "37, 211, 102",
    desc: "Let's chat directly on WhatsApp. Best for quick discussions, brief updates, and real-time messaging."
  },
  {
    id: 2,
    label: "PHONE CALL",
    value: "+91 9944597940",
    link: "tel:+919944597940",
    icon: <Phone size={28} />,
    color: "#00f0ff",
    color_rgb: "0, 240, 255",
    desc: "Prefer a direct phone conversation? Schedule a call or ring me directly. Available weekdays from 9 AM to 6 PM."
  },
  {
    id: 3,
    label: "LINKEDIN",
    value: "linkedin.com/in/sanjeevk1311",
    link: "https://linkedin.com/in/sanjeevk1311",
    icon: <FaLinkedin size={28} />,
    color: "#0077b5",
    color_rgb: "0, 119, 181",
    desc: "Connect with me professionally on LinkedIn. View my endorsement records, network, and corporate career milestones."
  }
];

const Contact = ({ onExplorePotential }) => {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [rotation, setRotation] = useState(0);
  const isClicking = useRef(false);

  // Scroll tracking to rotate the wheel on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Map scroll progress (0 to 1) to wheel rotation (0 to -270 degrees)
  const scrollAngle = useTransform(scrollYProgress, [0.1, 0.9], [0, -270]);

  useMotionValueEvent(scrollAngle, "change", (latest) => {
    if (isClicking.current) return;
    setRotation(latest);
    // Determine active index based on scroll position
    const progress = scrollYProgress.get();
    const idx = progress < 0.25 ? 0 : progress < 0.5 ? 1 : progress < 0.75 ? 2 : 3;
    setActiveIdx(idx);
  });

  const handleNodeClick = (idx) => {
    isClicking.current = true;
    setActiveIdx(idx);
    // Target rotation to center the selected node at the top/right active zone (0 degrees)
    const targetAngle = -idx * 90;
    setRotation(targetAngle);

    // Release lock after animation finishes
    setTimeout(() => {
      isClicking.current = false;
    }, 800);
  };

  const activeChannel = contactChannels[activeIdx];

  return (
    <section ref={containerRef} id="contact" className="contact-section-v3">
      <div className="contact-v3-header">
        <div className="contact-eyebrow">GET IN TOUCH</div>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="title-solid">Contact</span>{' '}
          <span className="title-outline">Me.</span>
        </motion.h2>
        <motion.p 
          className="contact-v3-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Rotate the spin wheel or scroll down to explore my communication channels and connect directly.
        </motion.p>
      </div>

      <div className="contact-grid-v3">
        {/* Left Column: Spin Wheel */}
        <div className="wheel-viewport">
          <div className="wheel-outer-ring">
            {/* Spinning core */}
            <motion.div 
              className="wheel-inner-core"
              animate={{ rotate: rotation }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
            >
              {/* Central track line */}
              <div className="wheel-track-line" />

              {/* Orbital Nodes */}
              {contactChannels.map((channel, idx) => {
                const nodeAngleRad = (idx * 90 * Math.PI) / 180;
                const radius = 135; // px radius
                const x = radius * Math.cos(nodeAngleRad);
                const y = radius * Math.sin(nodeAngleRad);
                const isActive = activeIdx === idx;

                return (
                  <motion.button
                    key={channel.id}
                    className={`wheel-node ${isActive ? 'active' : ''}`}
                    onClick={() => handleNodeClick(idx)}
                    style={{
                      x: `calc(-50% + ${x}px)`,
                      y: `calc(-50% + ${y}px)`,
                      border: `2px solid ${isActive ? channel.color : 'rgba(255,255,255,0.1)'}`,
                      boxShadow: isActive ? `0 0 20px rgba(${channel.color_rgb}, 0.4)` : 'none'
                    }}
                    animate={{ rotate: -rotation }}
                    transition={{ type: "spring", stiffness: 90, damping: 18 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div 
                      className="node-icon-wrapper"
                      style={{ color: isActive ? '#fff' : 'var(--text-secondary)' }}
                    >
                      {channel.icon}
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Holographic Active Icon Display Core */}
            <div 
              className="hologram-display-core"
              style={{
                borderColor: activeChannel.color,
                boxShadow: `0 0 35px rgba(${activeChannel.color_rgb}, 0.25), inset 0 0 20px rgba(${activeChannel.color_rgb}, 0.15)`
              }}
            >
              <div className="hologram-grid-overlay" />
              <motion.div
                key={activeIdx}
                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ color: activeChannel.color }}
                className="hologram-active-icon"
              >
                {activeChannel.icon}
              </motion.div>
              <div 
                className="hologram-glow-dot"
                style={{ backgroundColor: activeChannel.color }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: HUD Channel detail panel */}
        <div className="hud-panel-container">
          <motion.div 
            className="hud-details-card"
            key={activeIdx}
            initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              borderColor: `rgba(${activeChannel.color_rgb}, 0.25)`,
              boxShadow: `0 15px 45px rgba(0, 0, 0, 0.3), inset 0 0 15px rgba(${activeChannel.color_rgb}, 0.05)`
            }}
          >
            <div className="hud-header">
              <span className="hud-channel-num" style={{ color: activeChannel.color }}>0{activeIdx + 1} //</span>
              <span className="hud-channel-label" style={{ color: activeChannel.color }}>{activeChannel.label}</span>
            </div>

            <div className="hud-body">
              <h3 className="hud-value">{activeChannel.value}</h3>
              <p className="hud-desc">{activeChannel.desc}</p>
            </div>

            <div className="hud-actions">
              <a 
                href={activeChannel.link} 
                target="_blank" 
                rel="noreferrer"
                className="hud-action-btn"
                style={{
                  background: `rgba(${activeChannel.color_rgb}, 0.1)`,
                  border: `1px solid ${activeChannel.color}`,
                  color: '#fff',
                  boxShadow: `0 0 15px rgba(${activeChannel.color_rgb}, 0.2)`
                }}
              >
                <span>INITIATE CHANNEL</span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Social Links Row */}
      <motion.div 
        className="social-dock"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
      >
        <span className="dock-label">Connect Elsewhere</span>
        <div className="dock-icons">
          {[
            { icon: FaGithub, link: 'https://github.com/SanjeevSanju1311', brandClass: 'social-github' },
            { icon: FaLinkedin, link: 'https://linkedin.com/in/sanjeevk1311', brandClass: 'social-linkedin' },
            { icon: FaInstagram, link: 'https://www.instagram.com/kongu_sanju_?igsh=dzJ6Ym0xb29rb2Zs', brandClass: 'social-instagram' }
          ].map((social, index) => (
            <motion.a 
              key={index}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              className={`social-dock-icon ${social.brandClass}`}
              whileHover={{ scale: 1.2, y: -10 }}
              whileTap={{ scale: 0.9 }}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Explore Potential CTA */}
      <motion.div
        className="potential-cta-wrapper"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <button 
          onClick={onExplorePotential}
          className="potential-cta-btn premium-glass"
          style={{ width: 'auto', outline: 'none' }}
        >
          <span className="btn-glow"></span>
          <span>IF YOU HAVE MORE TIME, LOOK ON MY POTENTIAL</span>
          <ArrowUpRight className="cta-arrow" size={18} />
        </button>
      </motion.div>
    </section>
  );
};

export default Contact;
