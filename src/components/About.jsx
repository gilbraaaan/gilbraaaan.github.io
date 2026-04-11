import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function About() {
  const [selectedImage, setSelectedImage] = useState(null);

  const oopConcepts = [
    { name: "Inheritance", img: "InheritanceExplained.jpg" },
    { name: "Polymorphism", img: "PolymorphismExplained.jpg" },
    { name: "Abstraction", img: "AbstractionExplained.jpg" },
    { name: "Encapsulation", img: "EncapsulationExplained.jpg" },
  ];

  return (
    <section className="scroll-mt-20" id="about">
      <div className="nes-container with-title is-dark">
        <p className="title text-green-400 bg-black px-2">NPC Dialogue</p>
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar Area */}
          <div className="shrink-0 pt-4 hidden md:block">
            <i className="nes-ash"></i>
          </div>

          <div className="flex-1 nes-balloon from-left is-dark w-full">
            <p className="text-sm">
              Hello traveler! Welcome to my digital portfolio. <br/><br/>
              I am passionate about creating immersive games and augmented reality experiences. 
              Before we battle the final boss, let's learn some ancient magic concepts (OOP) that power the world!
            </p>
            
            <div className="mt-6 flex flex-wrap gap-4">
              {oopConcepts.map((concept) => (
                <button 
                  key={concept.name}
                  onClick={() => setSelectedImage(`/UI UX/Explaination of the OOP/${concept.img}`)}
                  className="nes-btn is-success text-xs"
                >
                  {concept.name}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-gray-500 mt-4">* CLICK the buttons above to view the magic scrolls *</p>
          </div>
        </div>
      </div>

      {/* Image Modal overlay map style */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="nes-container is-dark with-title w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="title bg-red-600 text-white px-2">Magic Scroll Discovered!</p>
              <img 
                src={selectedImage} 
                alt="OOP Concept" 
                className="w-full h-auto pixelated border-4 border-white"
              />
              <div className="mt-4 text-center pb-2">
                <button onClick={() => setSelectedImage(null)} className="nes-btn is-error w-full sm:w-auto">
                  CLOSE INVENTORY
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
