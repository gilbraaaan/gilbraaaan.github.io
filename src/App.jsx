import { useRef } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { motion, useScroll, useTransform } from 'framer-motion';

function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#212529] text-white overflow-hidden pb-20">
      {/* CRT Effects */}
      <div className="crt fixed inset-0 pointer-events-none z-50"></div>
      <div className="scanlines fixed inset-0 pointer-events-none z-40"></div>
      <div className="scanline-moving fixed inset-0 pointer-events-none z-[41]"></div>

      {/* Dynamic scanline background */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          y: yBg
        }}
      />

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8 max-w-6xl">
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Game Over / Footer */}
      <footer className="relative z-10 text-center py-6 mt-8 border-t-4 border-dotted border-gray-600">
        <p className="nes-text is-disabled text-xs sm:text-sm">
          {new Date().getFullYear()} | M GILBRAN EP <br />
          {/* &copy;  */}
        </p>
      </footer>
    </div>
  );
}

export default App;
