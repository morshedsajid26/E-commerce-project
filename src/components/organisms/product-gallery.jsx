"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Maximize2 } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, videoUrl }) {
  const [activeMedia, setActiveMedia] = React.useState({ type: "image", src: images[0] });
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 50, y: 50 });
  const videoRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!isZoomed || activeMedia.type === "video") return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible py-2 md:py-0 w-full md:w-24 shrink-0">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveMedia({ type: "image", src: img })}
            className={cn(
              "relative aspect-square w-20 md:w-full rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-muted/20",
              activeMedia.src === img ? "border-primary" : "border-transparent hover:border-primary/50"
            )}
          >
            <img src={img} alt={`Thumbnail ${i + 1}`} className="object-contain w-full h-full mix-blend-multiply dark:mix-blend-normal p-2" />
          </button>
        ))}
        {videoUrl && (
          <button
            onClick={() => setActiveMedia({ type: "video", src: videoUrl })}
            className={cn(
              "relative aspect-square w-20 md:w-full rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-muted/20 flex items-center justify-center group",
              activeMedia.type === "video" ? "border-primary" : "border-transparent hover:border-primary/50"
            )}
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <Play className="h-6 w-6 text-foreground/70" />
          </button>
        )}
      </div>

      {/* Main Display */}
      <div className="flex-1 relative aspect-square md:aspect-auto md:h-[600px] bg-muted/10 rounded-2xl overflow-hidden border">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMedia.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center p-8"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            {activeMedia.type === "image" ? (
              <>
                <img
                  src={activeMedia.src}
                  alt="Product view"
                  className={cn(
                    "w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-300",
                    isZoomed && "scale-150 cursor-zoom-in"
                  )}
                  style={isZoomed ? { transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`, transform: 'scale(2)' } : {}}
                />
                <Button size="icon" variant="secondary" className="absolute top-4 right-4 rounded-full opacity-50 hover:opacity-100 hidden md:flex pointer-events-none">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <div className="w-full h-full relative flex items-center justify-center bg-black/5 rounded-xl overflow-hidden cursor-pointer" onClick={toggleVideo}>
                <video
                  ref={videoRef}
                  src={activeMedia.src}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                />
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="h-16 w-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
