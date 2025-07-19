import React from 'react';
import Lottie from 'lottie-react';
import CompanyLogo from '../assets/animated-logo-cart.json'

function LoaderModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[25%] sm:w-[10%] max-w-md flex flex-col items-center gap-4">

      <Lottie animationData={CompanyLogo} loop={true} className='w-18 h-18'/>        

      </div>
    </div>
  )
}

export default LoaderModal
