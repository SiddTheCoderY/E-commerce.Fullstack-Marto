import React,{useState,useRef, useEffect} from 'react'
import { toast } from 'react-hot-toast';
import {
  X, Store, Boxes, Camera, ChevronRight, Check, CircleCheck, CircleSlash2, ChevronLeft, BriefcaseBusiness,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CircleDashed
  } from 'lucide-react'

import axiosInstance from '../utils/axiosInstance';

import Lottie from "lottie-react";
import BubbleAnimatedLogo from '../assets/bubble-animated-logo.json'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast';

function ModelExit({onClose}) {
  return (
    <div className='justify-end flex mr-5'><X className='cursor-pointer' onClick={onClose} /></div>
  )
}

function CreateProductModal({onClose,action}) {
  return (
    <div className="cursor-auto fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 text-black">
    <div className="bg-white rounded-xl shadow-xl px-6 py-4 w-[70vw] h-[90vh] max-w-[80vw] flex flex-col items-center gap-2 relative">

        <div className='w-full justify-end'><ModelExit onClose={onClose} /></div>
        

    </div>
  </div>
  )
}

export default CreateProductModal
