import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="flex flex-col justify-center items-center text-center py-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
        className="mb-8"
      >
        <img
          src="/UI UX/Logo/Agil-30Th.png"
          alt="Agil Entertaintment"
          className="w-32 h-32 mx-auto pixelated drop-shadow-[0_0_15px_rgba(32,156,238,0.8)] animate-pulse"
        />
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-8xl font-black mb-4 glitch-wrapper">
          <span className="glitch nes-text is-primary !text-[currentColor]" data-text="M GILBRAN EP">
            M GILBRAN EP
          </span>
        </h1>
        <h2 className="text-sm sm:text-lg md:text-xl text-green-400 mb-6 uppercase tracking-widest border-b-4 border-double border-green-500 pb-2 inline-block">
          Unity Game Developer | Tasikmalaya, ID
        </h2>
        <p className="nes-text text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Membuat Pengalaman Game yang Immersive.
          Bringing 3D environments, Augmented Reality, and interactive gaming experiences to life.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center mt-4 w-full"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <a href="#projects" className="nes-btn is-error w-full sm:w-auto text-xs sm:text-sm hover:scale-110 transform transition-transform">
          START GAME
        </a>
        <a href="https://sketchfab.com/onelanceman/models" target="_blank" rel="noreferrer" className="nes-btn is-primary w-full sm:w-auto text-xs sm:text-sm hover:scale-110 transform transition-transform">
          VIEW 3D Assets
        </a>
        <a href="https://linktr.ee/PlaykaraSTD" target="_blank" rel="noreferrer" className="nes-btn is-warning w-full sm:w-auto text-xs sm:text-sm hover:scale-110 transform transition-transform">
          PLAY GAMES
        </a>
        <a href="/PrivacyPolicy.html" target="_blank" rel="noreferrer" className="nes-btn is-success w-full sm:w-auto text-xs sm:text-sm hover:scale-110 transform transition-transform">
          Privacy Policy
        </a>
      </motion.div>
    </section>
  );
}
