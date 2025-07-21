import React from "react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import FlyingManImg from "../../assets/Man-flying.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function GreetSellerModel({ onClose }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  return (
    <AnimatePresence>
      <motion.div
        className="cursor-auto fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 text-black px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.1, y: 200, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
          className="bg-white rounded-xl shadow-xl px-4 sm:px-6 py-4 w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] h-[85vh] sm:h-[70vh] overflow-hidden flex flex-col relative"
        >
          {/* Close Button */}
          <div className="w-full flex justify-end">
            <X onClick={onClose} className="cursor-pointer" />
          </div>

          {/* Congrats Text */}
          <div className="flex h-auto text-sm sm:text-base md:text-lg w-full text-center rounded-md px-2 py-2 mb-4  text-black">
            <span className="w-full flex items-center justify-center flex-wrap">
              Congratulations
              <span className="highlight-tilt px-2 mx-1 text-white font-semibold">
                {user.fullName}
              </span>
              , you are now a seller on Anbari! 🎉
            </span>
          </div>

          {/* Animation */}
          <div className="flex w-full justify-center">
            <Lottie
              animationData={FlyingManImg}
              loop={true}
              className="w-full max-w-[400px] sm:max-w-[500px]"
            />
          </div>

          {/* Button */}
          <div className="flex w-full justify-center mt-2">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-300 px-4 py-2 rounded-md hover:bg-blue-950 hover:text-white hover:scale-105 transition-all duration-150 ease-in"
            >
              Visit Dashboard
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default GreetSellerModel;
