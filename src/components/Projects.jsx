import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Projects() {
  const [activeTab, setActiveTab] = useState('3d'); // 3d, portofolio, ar, personal
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mixed3d = [
    ...[
      "https://sketchfab.com/models/cb5b1e660c8e4214b41b924db22ad38f/embed",
      "https://sketchfab.com/models/43fbf0a16b5c46789c0b6b5149781be9/embed",
      "https://sketchfab.com/models/d18470358fef4013b84b357a25377ffb/embed",
      "https://sketchfab.com/models/4e5c35fd500142ceb878aeafb0e69f8c/embed",
      "https://sketchfab.com/models/b8fbff28fee649d69ea3b53b3f2b27b6/embed",
      "https://sketchfab.com/models/80196d785b294333a366f7f6d42cee70/embed",
      "https://sketchfab.com/models/62a1e7499a0c48bd994909705bb6eab9/embed",
      "https://sketchfab.com/models/a44e483c4b2a4d8ab8271dd438363dc2/embed",
    ].map(src => ({ type: 'iframe', src, label: '3D Model' })),
    ...[
      "/UI UX/Gif/KucingPorto.gif",
      "/UI UX/Gif/RayapPorto.gif"
    ].map(src => ({ type: 'img', src, label: '3D Model' }))
  ];

  const portoGifs = [
    "/UI UX/Portofolio/Porto_Potato.gif",
    "/UI UX/Portofolio/Porto_Coin.gif",
    "/UI UX/Portofolio/Porto_MatchGame.gif",
    "/UI UX/Portofolio/Spinning Wheel.gif",
    "/UI UX/Portofolio/Porto_Overdrive.gif",
    "/UI UX/Portofolio/Ribbon Project.gif",
    "/UI UX/Portofolio/AlphabetProject.gif",
    "/UI UX/Portofolio/Tetris.gif"
  ].map(src => ({ type: 'img', src, label: 'Game Dev' }));

  const arGifs = [
    "/UI UX/AR Gif/AR1.gif",
    "/UI UX/AR Gif/AR2.gif",
    "/UI UX/AR Gif/AR3.gif",
    "/UI UX/AR Gif/AR4.gif"
  ].map(src => ({ type: 'img', src, label: 'AR Quest' }));

  const personalVids = [
    "https://www.youtube.com/embed/TnmtKQQ4hkM?si=NsKNvT-zrt1bochz",
    "https://www.youtube.com/embed/0lQP17F4vjw?si=-hBrOJngtAOwU7Ga"
  ].map(src => ({ type: 'iframe', src, label: 'Personal Project' }));

  const tabsData = {
    '3d': mixed3d,
    'portofolio': portoGifs,
    'ar': arGifs,
    'personal': personalVids
  };

  const currentList = tabsData[activeTab];
  const currentItem = currentList[currentIndex];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
    setIsModalOpen(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % currentList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + currentList.length) % currentList.length);
  };

  return (
    <section className="scroll-mt-20" id="projects">
      <div className="nes-container with-title is-dark">
        <p className="title text-blue-400 bg-black px-2">Level Gallery</p>

        {/* Level Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 justify-center border-b-4 border-gray-600 pb-4">
          <button className={`nes-btn text-xs ${activeTab === '3d' ? 'is-primary' : ''}`} onClick={() => handleTabChange('3d')}>WORLD 1: 3D</button>
          <button className={`nes-btn text-xs ${activeTab === 'portofolio' ? 'is-success' : ''}`} onClick={() => handleTabChange('portofolio')}>WORLD 2: Dev</button>
          <button className={`nes-btn text-xs ${activeTab === 'ar' ? 'is-warning' : ''}`} onClick={() => handleTabChange('ar')}>WORLD 3: AR</button>
          <button className={`nes-btn text-xs ${activeTab === 'personal' ? 'is-error' : ''}`} onClick={() => handleTabChange('personal')}>BONUS: Personal</button>
        </div>

        {/* Focused Single View */}
        <div className="flex flex-col items-center mt-4">

          {/* Header */}
          <div className="text-center mb-4">
            <h3 className="nes-text is-warning text-sm md:text-base">
              {currentItem.label} - {currentIndex + 1} / {currentList.length}
            </h3>
          </div>

          {/* Main Display Area */}
          <div className="w-full relative flex justify-center mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${currentIndex}`}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-3xl"
              >
                <div
                  className="nes-container is-rounded bg-black p-2 mx-auto border-4 border-gray-500 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] cursor-pointer group"
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className="w-full aspect-video bg-gray-900 border border-white relative flex items-center justify-center overflow-hidden">
                    {currentItem.type === 'iframe' ? (
                      // Wrapper to allow clicking the container to open modal if we want,
                      // but iframes intercept clicks. We add pointer-events-none if it's not full screen to encourage clicking to focus.
                      <>
                        <iframe
                          title="Preview"
                          src={currentItem.src}
                          className="w-full h-full border-none pointer-events-none group-hover:opacity-75 transition-opacity"
                          allow="autoplay; fullscreen; xr-spatial-tracking"
                          loading="lazy"
                        ></iframe>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 z-10 text-center">
                          <span className="p-2 bg-black border-2 border-white text-xs nes-text is-success blinking mx-auto">CLICK TO FOCUS</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          src={currentItem.src}
                          className="w-full h-full object-cover pixelated group-hover:opacity-75 transition-opacity"
                          alt="Project Preview"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 text-center">
                          <span className="p-2 bg-black border-2 border-white text-xs nes-text is-success blinking mx-auto">CLICK TO FOCUS</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-8 w-full">
            <button className="nes-btn" onClick={handlePrev}>❮ PREV</button>
            <button className="nes-btn is-primary hidden sm:block" onClick={() => setIsModalOpen(true)}>🔍 FOCUS</button>
            <button className="nes-btn" onClick={handleNext}>NEXT ❯</button>
          </div>

        </div>
      </div>

      {/* Focus Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4"
          >
            <div className="w-full max-w-6xl flex justify-end mb-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="nes-btn is-error text-xs"
              >
                X CLOSE
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              className="w-full max-w-6xl aspect-video nes-container is-dark p-2 border-8 border-green-500"
            >
              {currentItem.type === 'iframe' ? (
                <iframe
                  title="Focused View"
                  src={currentItem.src}
                  className="w-full h-full border-none"
                  allow="autoplay; fullscreen; xr-spatial-tracking; clipboard-write; encrypted-media; gyroscope;"
                ></iframe>
              ) : (
                <img
                  src={currentItem.src}
                  className="w-full h-full object-contain pixelated"
                  alt="Focused Project"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
