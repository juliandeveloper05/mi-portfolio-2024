import React from "react";
import { motion } from "framer-motion";

// Variantes para la animación de la transición
const TransitionVariants = {
  initial: {
    y: "100%",
    height: "100%",
  },
  animate: {
    y: "0%",
    height: "0%",
  },
  exit: {
    y: ["0%", "100%"],
    height: ["0%", "100%"],
  },
};

const Transition = () => {
  return (
    <div>
      {/* Capas de fondo para la transición */}
      <motion.div
        className="fixed right-0 h-screen w-screen bottom-full z-[40] bg-[#ffffff]"
        variants={TransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed right-0 h-screen w-screen bottom-full z-[30] bg-[#a3a3a3]"
        variants={TransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed right-0 h-screen w-screen bottom-full z-[20] bg-[#3f3f3f]"
        variants={TransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.6, duration: 0.6, ease: "easeInOut" }}
      />
      <motion.div
        /* Ultimo contenedor de la transicion */
        className="fixed right-0 h-screen w-screen bottom-full z-[15] bg-[#26262a]"
        variants={TransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.8, duration: 0.6, ease: "easeInOut" }}
      />

      <motion.div
        /* Ultimo contenedor de la transicion */
        className="fixed right-0 h-screen w-screen bottom-full z-[11] bg-[#000000]"
        variants={TransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
      />
    </div>
  );
};

export default React.memo(Transition);
