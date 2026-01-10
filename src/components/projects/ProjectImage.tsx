import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProjectImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({ src, alt, priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70" />
      <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
    </div>
  );
};
