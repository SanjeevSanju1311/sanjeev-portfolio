import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  "https://picsum.photos/seed/tech1/800/800",
  "https://picsum.photos/seed/tech2/800/800",
  "https://picsum.photos/seed/tech3/800/800",
  "https://picsum.photos/seed/tech4/800/800",
  "https://picsum.photos/seed/tech5/800/800"
];

const InteractiveImage = ({ className, style }) => {
  const [index, setIndex] = useState(0);
  const [bursts, setBursts] = useState([]);

  const handleClick = (e) => {
    // Cycle image
    setIndex((prev) => (prev + 1) % images.length);

    // Create a burst particle at click location
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newBurst = { id: Date.now(), x, y };
    setBursts((prev) => [...prev, newBurst]);

    // Clean up burst
    setTimeout(() => {
      setBursts((prev) => prev.filter(b => b.id !== newBurst.id));
    }, 1000);
  };

  return (
    <motion.div 
      className={`interactive-img-wrapper ${className || ''}`}
      style={style}
      onClick={handleClick}
      whileHover={{ boxShadow: "0px 0px 30px var(--accent-color)" }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`Interactive ${index}`}
          className="interactive-img"
          style={{ borderRadius: style?.borderRadius || 0 }}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>

      {/* Burst Particles */}
      {bursts.map(burst => (
        <motion.div
          key={burst.id}
          className="burst-particle"
          style={{ left: burst.x, top: burst.y, x: '-50%', y: '-50%' }}
          initial={{ width: 0, height: 0, opacity: 1, borderWidth: '10px', borderStyle: 'solid', borderColor: 'var(--accent-color)', backgroundColor: 'transparent' }}
          animate={{ width: 300, height: 300, opacity: 0, borderWidth: '0px' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}
    </motion.div>
  );
};

export default InteractiveImage;
