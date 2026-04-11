import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section className="scroll-mt-20 w-full grid place-items-center py-10 min-h-[40vh]" id="contact">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="nes-container is-dark with-title text-center w-[90vw] max-w-2xl"
      >
        <p className="title text-red-500 bg-black px-2">GAME OVER?</p>

        <h2 className="text-2xl sm:text-4xl text-green-400 mb-6 mt-4 glitch-wrapper">
          <span className="glitch" data-text="CONTINUE?">CONTINUE?</span>
        </h2>

        <p className="nes-text text-gray-300 text-xs sm:text-sm mb-10 leading-relaxed">
          Ready to start a new quest? Need an ally for your next game project?
          Send a message via the neural link below.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 mt-8">
          <a href="mailto:PlaykaraSTD@gmail.com" className="nes-btn is-success relative group overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-3">
              <i className="nes-icon gmail is-small"></i>
              CONTACT ME
            </span>
          </a>

          <div className="text-gray-400 text-[10px] sm:text-xs tracking-widest flex flex-col items-center gap-3">
            <span>PlaykaraSTD@gmail.com</span>
            {/* <span className="animate-pulse text-yellow-500">9 8 7 6 5 4 3 2 1</span> */}
          </div>
        </div>

      </motion.div>
    </section>
  );
}
