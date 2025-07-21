import React, { useEffect } from "react";
import { X } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import SellerGuidelines from "./SellerGuidelines";
import SellerDetails from "./SellerDetails";
import { useNavigate } from "react-router-dom";

function BecomeSellerModal({ onClose }) {
  const navigate = useNavigate();
  const [isGuidelinesAccepted, setIsGuidelinesAccepted] = React.useState(false);

  return (
    <div className="cursor-auto fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 text-black">
      <div className="bg-white rounded-xl shadow-xl px-6 py-4 w-[70vw] h-[90vh] overflow-hidden max-w-[80vw] flex flex-col relative">
        <div
          className={`w-full flex ${
            isGuidelinesAccepted ? "justify-between" : "justify-end"
          }`}
        >
          {isGuidelinesAccepted && (
            <span
              onClick={() => setIsGuidelinesAccepted(false)}
              className="flex items-center gap-0 cursor-pointer"
            >
              <ChevronLeft /> Back
            </span>
          )}
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        <div className="flex w-full h-full gap-4">
          {/* Guidelines panel */}
          <div
            className={`h-full overflow-hidden transition-all duration-500 ease-in-out flex flex-col ${
              isGuidelinesAccepted
                ? "flex-[0] w-0 opacity-0"
                : "flex-[1] w-full opacity-100"
            }`}
          >
            <SellerGuidelines
              setGuidelinesAccepted={() => setIsGuidelinesAccepted(true)}
            />
          </div>

          {/* Details panel */}
          <div
            className={`h-full overflow-hidden transition-all duration-500 ease-in-out flex flex-col ${
              isGuidelinesAccepted
                ? "flex-[1] w-full opacity-100"
                : "flex-[0] w-0 opacity-0"
            }`}
          >
            <SellerDetails />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BecomeSellerModal;
