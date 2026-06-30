"use client";
import { IoPlay, IoPause } from "react-icons/io5";
import { useState, useRef } from "react";

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const iframeRef = useRef(null);

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Reload iframe with new play/pause state
    const iframe = iframeRef.current;
    if (iframe) {
      const src = iframe.src;
      iframe.src = "";
      iframe.src = src;
    }
  };

  return (
    <section className="relative w-full bg-black">
      {/* Background Video - YouTube Style */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <div className="absolute inset-0 w-full h-full">
          <iframe
            ref={iframeRef}
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/G0ARS5WFuHo?autoplay=${isPlaying ? 1 : 0}&mute=0&loop=1&playlist=G0ARS5WFuHo&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`}
            title="Alfa Beat Bhojpuri - Latest Song"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Overlay Gradient for Better Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>

      {/* Play/Pause Button - Center (Visible on hover or always on mobile) */}
      {/* <button
        onClick={togglePlayPause}
        className="absolute inset-0 z-20 
          flex items-center justify-center
          group cursor-pointer"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        <div className={`
          bg-white/20 backdrop-blur-md 
          text-white p-4 sm:p-6 rounded-full 
          transition-all duration-300
          shadow-2xl
          border border-white/30
          flex items-center justify-center
          opacity-0 group-hover:opacity-100
          hover:bg-white/30 hover:scale-110
          ${!isPlaying ? 'opacity-100' : ''}
          md:opacity-0 md:group-hover:opacity-100
          opacity-100 sm:opacity-0 sm:group-hover:opacity-100
        `}>
          {isPlaying ? (
            <IoPause className="text-3xl sm:text-5xl" />
          ) : (
            <IoPlay className="text-3xl sm:text-5xl ml-1" />
          )}
        </div>
      </button> */}

      {/* Play/Pause Button - Bottom Right (Always Visible on Mobile) */}
      {/* <button
        onClick={togglePlayPause}
        className="absolute bottom-6 right-4 z-30 
          bg-black/50 backdrop-blur-md 
          text-white p-2.5 sm:p-3 rounded-full 
          hover:bg-black/70 transition-all duration-300
          shadow-lg hover:scale-110
          border border-white/20
          flex items-center justify-center
          min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px]
          block sm:hidden"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <IoPause className="text-xl sm:text-2xl" />
        ) : (
          <IoPlay className="text-xl sm:text-2xl ml-0.5" />
        )}
      </button> */}
    </section>
  );
};

export default Hero;
