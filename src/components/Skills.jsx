import { motion } from 'framer-motion';

const skills = [
  "HTML", "CSS", "JavaScript", "BootStrap", "React.js", "Figma(UI&UX)", "TypeScript(learning)",
  "Node.js", "Express.js", "Java", "MongoDB", "MY SQL(basic)",
  "Git & GitHub", "Docker(basic)", "VS code(IDE)", "Antigravity(IDE)", "Canva",
  "Communication", "Leadership", "Collaborative", "Creative thinking", "Problem solving"
];

const Skills = () => {
  return (
    <section id="skills" style={{ padding: '6rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <motion.h2 
          className="section-title" 
          style={{ marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="title-solid">MY</span> <span className="title-outline">SKILLS.</span>
        </motion.h2>
      </div>
      
      <div className="marquee-container" style={{ marginBottom: '2rem' }}>
        <div className="marquee-content">
          {skills.map((skill, index) => (
            <span key={`s1-${index}`}>{skill}</span>
          ))}
          {skills.map((skill, index) => (
            <span key={`s1-dup-${index}`}>{skill}</span>
          ))}
        </div>
      </div>
      
      <div className="marquee-container">
        <div className="marquee-content reverse">
          {[...skills].reverse().map((skill, index) => (
            <span key={`s2-${index}`}>{skill}</span>
          ))}
          {[...skills].reverse().map((skill, index) => (
            <span key={`s2-dup-${index}`}>{skill}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
