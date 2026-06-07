import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingPhrases = [
  "DESIGN.",
  "CODE.",
  "IMPACT.",
  "WELCOME TO MY PORTFOLIO!"
];

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const duration = 4000; // 4 seconds total
    const interval = 40; // update every 40ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress < 16) setPhraseIndex(0);
      else if (nextProgress < 33) setPhraseIndex(1);
      else if (nextProgress < 50) setPhraseIndex(2);
      else setPhraseIndex(3);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 1200); // give time for the cinematic transition
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="loader-container-v2"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      {/* Split screen panels */}
      <motion.div 
        className="loader-split-top"
        exit={{ y: "-100%" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      />
      <motion.div 
        className="loader-split-bottom"
        exit={{ y: "100%" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      />

      <motion.div 
        className="loader-content-wrapper"
        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="loader-orbit-wrapper">
          {/* Orbital Rings */}
          <div className="loader-ring loader-ring-1"></div>
          <div className="loader-ring loader-ring-2"></div>
          <div className="loader-ring loader-ring-3"></div>

          {/* Glowing Orb Center */}
          <div className="loader-glow-orb"></div>

          {/* Progress Number */}
          <div className="loader-number-v2">
            {progress}
            <span className="percent-sign">%</span>
          </div>
        </div>

        {/* Dynamic Text */}
        <div className="loader-text-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={phraseIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              className="loader-status-text"
            >
              {loadingPhrases[phraseIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Loading Bar (Sleek line) */}
        <div className="loader-line-wrapper">
          <motion.div
            className="loader-line-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
