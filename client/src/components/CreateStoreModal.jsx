import React,{useState,useRef, useEffect} from 'react'
import {
  X, Store, Boxes, Camera, ChevronRight, Check, CircleCheck, CircleSlash2, ChevronLeft, BriefcaseBusiness,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CircleDashed
  } from 'lucide-react'
import { StoreCategoryoptions } from '../constants'
import axiosInstance from '../utils/axiosInstance';

import Lottie from "lottie-react";
import BubbleAnimatedLogo from '../assets/bubble-animated-logo.json'

import { useDispatch, useSelector } from 'react-redux'
import { createStore } from '../features/store/storeThunks'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';

function ModelExit({onClose}) {
  return (
    <div className='justify-end flex mr-5'><X className='cursor-pointer' onClick={onClose} /></div>
  )
}

function CreateStoreModal({ action, onClose }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.store)
  
  // main flag
  const [flag, setFlag] = useState(1)
  const steps = [
    { icon: <Store size={20} />, label: "Store Name" },
    { icon: <BriefcaseBusiness size={20} />, label: "Details" },
    { icon: <Camera size={20} />, label: "Media" },
  ];
  
  const [storeFormData, setStoreFormData] = useState({
    storeName : '',
    description : '',
    category : '',
    contactEmail : '',
    contactNumber : '',
    address : '',
    socialLinks : [],
    logo : null,
    banner : null,
  })

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
  
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const previewURL = URL.createObjectURL(file);
        setStoreFormData((prev) => ({
          ...prev,
          [name]: file,
          [`${name}Preview`]: previewURL, // Store preview URL separately
        }));
      }
    } else {
      // Handle text inputs
      const updatedValue =
        name === 'storeName'
          ? value.charAt(0).toUpperCase() + value.slice(1)
          : value;
  
      setStoreFormData((prev) => ({
        ...prev,
        [name]: updatedValue,
      }));
    }
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(storeFormData.bannerPreview);
      URL.revokeObjectURL(storeFormData.logoPreview);
    };
  }, [storeFormData.bannerPreview, storeFormData.logoPreview]);
  
  
  // scope flag ( 1 )
  const [storeNameDataLoading,setStoreNameDataLoading] = useState(null)
  const [storeNameData, setStoreNameData] = useState(null)
  
  const checkStoreNameAvailablity = async(storeName) => {
    try {
      setStoreNameDataLoading(true)
      const response = await axiosInstance.post('/store/check-store-name-availablity', {storeName})
      setStoreNameData(response.data)
    } catch (error) {
      console.log('Error occured while checking the store name availablity',error)
    } finally {
      setStoreNameDataLoading(false)
    }
  }

  useEffect(() => {
    if (!storeFormData.storeName.trim()) {
      setStoreNameData(null)
      return
    };
    
    const handler = setTimeout(() => {
      checkStoreNameAvailablity(storeFormData.storeName);
    }, 1000);
  
    return () => clearTimeout(handler); 
  }, [storeFormData.storeName]);
  

  // scope flag ( 2 )
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const selectRef = useRef(null);
  const [isSecondFlagReady,setSecondFlagReady] = useState(false)

  const handleCategoryInputFocus = () => {
    setShowOptions(true);
    setTimeout(() => {
      selectRef.current?.focus();
    }, 100); 
  };

  const handleCategoryOptionChange = (e) => {
    setSelectedCategory(e.target.value);
    setStoreFormData((prev) => ({...prev,category:e.target.value}))
    setShowOptions(false);
  };

  useEffect(() => {
    const { contactEmail, contactNumber, address } = storeFormData;
    const category = selectedCategory;
  
    // check if all fields are non-empty (and trimmed)
    const allFilled = [contactEmail, contactNumber, address, category].every(
      (field) => field && field.trim() !== ''
    );
  
    setSecondFlagReady(allFilled)
  }, [
    storeFormData.contactEmail,
    storeFormData.contactNumber,
    storeFormData.address,
    selectedCategory,
  ]);

  
  // flag ( 3  )
  const [isThirdFlagReady,setThirdFlagReady] = useState(false)
  useEffect(() => {
    const { logo, banner, } = storeFormData;
  
    // check if all fields are non-empty (and trimmed)
    const allFilled = [logo, banner].every(
      (field) => field );
  
    setThirdFlagReady(allFilled)
  }, [
    storeFormData.logo,
    storeFormData.banner,
  ]);
  
  const handleStorePayloadSubmit = async () => {
    console.log('All data', storeFormData)
    const formData = new FormData();

    formData.append('storeName', storeFormData.storeName);
    if (storeFormData.description.trim() !== '') {
      formData.append('description', storeFormData?.description);
    }
    formData.append('category', storeFormData.category);
    formData.append('contactEmail', storeFormData.contactEmail);
    formData.append('contactNumber', storeFormData.contactNumber);
    formData.append('address', storeFormData.address);

    // Append files
    formData.append('logo', storeFormData.logo);     // File object
    formData.append('banner', storeFormData.banner); // File object

    // Optional: append JSON strings for array-type fields
    if (storeFormData.socialLinks && storeFormData.socialLinks.length > 0) {
      formData.append('socialLinks', JSON.stringify(storeFormData.socialLinks));
    }

    try {
      const loadingToast = toast.loading("Creating store...");
      await dispatch(createStore(formData)).unwrap();
      toast.success("🎉 Store created!", { id: loadingToast });
      onClose()
    } catch (err) {
      toast.error("Failed to create store");
    }
  }


  //  dom --
  
  // StoreName 
  if (flag === 1) {
    return (
      <div className="cursor-auto fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 text-black">
      <div className="bg-white rounded-xl shadow-xl px-6 py-4 w-[70vw] h-[90vh] max-w-[80vw] flex flex-col items-center gap-2 relative">
  
          <div className='w-full justify-end'><ModelExit onClose={onClose} /></div>

          {/* Tracker */}
          <div className="w-full flex justify-center items-center gap-26 mt-2 mb-4 absolute top-10">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center group">
                <div
                  onClick={() => setFlag(index+1)}
                  className={`cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300
                    ${flag >= index + 1 ? 'border-blue-600 bg-blue-100 text-blue-800 shadow-lg' : 'border-gray-300 bg-white text-gray-400'}
                  `}
                >
                  {step.icon}
                </div>
                <span className={`text-[10px] mt-1 ${flag === index + 1 ? 'text-blue-700 font-medium' : 'text-gray-400'}`}>
                  {step.label}
                </span>

                {/* Progress Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-5 left-full w-24 h-1 bg-gray-300 group-hover:bg-blue-300">
                    <div className={`h-full bg-blue-600 transition-all duration-500 rounded-full ${flag > index + 1 ? 'w-full' : 'w-0'}`} />
                  </div>
                )}
              </div>
            ))}
          </div>                            

          
          <div className='w-full flex flex-col gap-2 p-5 mt-26'>

            <div className='text-2xl flex gap-2 items-center text-blue-950'><Store className='relative top-[2px]' />Name Your <span className='relative inline-block highlight-tilt text-white'>Store</span>
            </div>
            <div className='w-full mt-10'>
              <input
                required
                value={storeFormData.storeName}
                onChange={handleInputChange}
                placeholder='Store Name'
                type="text"
                name="storeName"
                className='border-b-2 w-[70%]  outline-none focus:outline-none text-[15px] px-2 py-1'
              />
            </div>

            <div className='w-full'>
              <span className='relative left-1 -top-1 flex items-center gap-1'>
              <span className='text-red-700'>
                {storeNameData?.data.isNameAvailable === false && (<CircleSlash2 width={12} />)}
                </span>
                <span className='text-green-700'>
                  {storeNameData?.data.isNameAvailable && (<CircleCheck width={12} />)}
                </span>
                {storeNameData?.message}
              </span>
            </div>

          </div>

          <div className='w-full absolute bottom-10 right-4 flex justify-end p-5'>
            <button
              onClick={() => setFlag((flag) => flag+1)}
              disabled={storeNameData?.data?.isNameAvailable !== true}
              className={`px-5 py-2 text-[14px] rounded-md transition-all duration-75 ease-in w-23 flex gap-1 items-center 
                ${storeNameData?.data?.isNameAvailable
                  ? 'bg-blue-500/30 hover:text-white hover:bg-blue-500 cursor-pointer hover:gap-3'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              <span>Next</span>
              <ChevronRight />
            </button>
          </div>
          
  
      </div>
    </div>
    )
  }


  // Details
  if (flag === 2) {
    return (
      <div className="cursor-auto fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 text-black">
      <div className="bg-white rounded-xl shadow-xl px-6 py-4 w-[70vw] h-[90vh] max-w-[80vw] flex flex-col items-center gap-2 relative">
  
          <div className='w-full justify-between items-center flex'>
            <button onClick={() => setFlag(flag => flag - 1)} className="flex cursor-pointer items-center text-gray-500 hover:text-indigo-600">
                 <ChevronLeft className="w-5 h-5 mr-1" />Back
            </button>
            <span><ModelExit onClose={onClose} /></span>
          </div>

          {/* Tracker */}
          <div className="w-full flex justify-center items-center gap-26 mt-2 mb-4 absolute top-10">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center group">
                <div
                  onClick={() => setFlag(index+1)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300
                    ${flag >= index + 1 ? 'border-blue-600 bg-blue-100 text-blue-800 shadow-lg' : 'border-gray-300 bg-white text-gray-400'}
                  `}
                >
                  {step.icon}
                </div>
                <span className={`text-[10px] mt-1 ${flag === index + 1 ? 'text-blue-700 font-medium' : 'text-gray-400'}`}>
                  {step.label}
                </span>

                {/* Progress Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-5 left-full w-24 h-1 bg-gray-300 group-hover:bg-blue-300">
                    <div className={`h-full bg-blue-600 transition-all duration-500 rounded-full ${flag > index + 1 ? 'w-full' : 'w-0'}`} />
                  </div>
                )}
              </div>
            ))}
          </div>



          <div className='w-full flex flex-col gap-2 sm:gap-4 p-5 mt-26'>

            <div className='text-2xl flex gap-2 items-center text-blue-950'><BriefcaseBusiness className='relative top-[2px]' />Basic Details of 
            <span className="relative inline-block highlight-tilt text-white">
              {storeFormData.storeName}
            </span>

            </div>
            
            
           <div className='w-full flex gap-2 sm:gap-4 flex-wrap justify-between mt-10'>
            
              <div>
                <span className='ml-1'>Contact Email</span>
              <label className='flex items-center relative' htmlFor="contactEmail">
              <Mail  size={20} className='absolute left-1' />
                <input
                  placeholder='Contact Email'
                  type="email"
                  name="contactEmail"
                  id="contactEmail"
                    className='input'
                    value={storeFormData.contactEmail}
                    onChange={handleInputChange}
                />
              </label>
              </div>

              <div>
                <span className='ml-1'>Contact Number</span>
              <label htmlFor="contactNumber" className='flex items-center relative'>
              <Phone  size={20} className='absolute left-1' />
                  <input
                    value={storeFormData.contactNumber}
                    onChange={handleInputChange}
                  placeholder='Contact Number'
                  type="number"
                  name="contactNumber"
                  id="contactNumber"
                  className='input'
                />
              </label>

              </div>

              <div>
                <span className='ml-1'>Address</span>
              <label htmlFor="address" className='flex items-center relative'>
              <MapPin  size={20} className='absolute left-1' />
                  <input
                    value={storeFormData.address}
                    onChange={handleInputChange}
                  placeholder='Addressl'
                  type="text"
                  name="address"
                  id="address"
                  className='input'
                />
              </label>
              </div>

              <div>
              <span className='ml-1'>Category</span>
              <label className="flex items-center relative w-full max-w-md">
                 <Boxes size={20} className="absolute left-2 z-10 text-gray-500" />
                  <input
                   type="text"
                   placeholder="Category"
                   name="storeCategory"
                   id="storeCategory"
                   value={selectedCategory}
                   onFocus={handleCategoryInputFocus}
                   readOnly
                   className="input pl-8 w-full cursor-pointer"
                 />
                {showOptions && (
                   <select
                     ref={selectRef}
                     value={selectedCategory} // <-- controlled by React
                     onChange={handleCategoryOptionChange}
                     onBlur={() => setShowOptions(false)}
                     className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                   >
                     <option value="" disabled hidden>Select category</option>
                     {StoreCategoryoptions.map((option) => (
                       <option key={option} value={option}>
                         {option}
                       </option>
                     ))}
                   </select>
                 )}
               </label>

             
              </div>

            </div>

          </div>
          
     
          
          <div className='w-full absolute bottom-10 right-4 flex justify-end p-5'>
            <button
              disabled={!isSecondFlagReady}
              onClick={() => setFlag((flag) => flag+1)} 
               className={`px-5 py-2 text-[14px] rounded-md transition-all duration-75 ease-in w-23 flex gap-1 items-center 
                ${isSecondFlagReady 
                  ? 'bg-blue-500/30 hover:text-white hover:bg-blue-500 cursor-pointer hover:gap-3'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              <span>Next</span>
              <ChevronRight/>
            </button>
          </div>
          
  
      </div>
    </div>
    )
  }


  if (flag === 3) {
    return (
      <div className="cursor-auto fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 text-black">
      <div className="bg-white rounded-xl shadow-xl px-6 py-4 w-[70vw] h-[90vh] max-w-[80vw] flex flex-col items-center gap-2 relative">
  
          <div className='w-full justify-between items-center flex'>
            <button onClick={() => setFlag(flag => flag - 1)} className="flex cursor-pointer items-center text-gray-500 hover:text-indigo-600">
                 <ChevronLeft className="w-5 h-5 mr-1" />Back
            </button>
            <span><ModelExit onClose={onClose} /></span>
          </div>

          {/* Tracker */}
          <div className="w-full flex justify-center items-center gap-26 mt-2 mb-4 absolute top-10">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center group">
                <div
                  onClick={() => setFlag(index+1)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300
                    ${flag >= index + 1 ? 'border-blue-600 bg-blue-100 text-blue-800 shadow-lg' : 'border-gray-300 bg-white text-gray-400'}
                  `}
                >
                  {step.icon}
                </div>
                <span className={`text-[10px] mt-1 ${flag === index + 1 ? 'text-blue-700 font-medium' : 'text-gray-400'}`}>
                  {step.label}
                </span>

                {/* Progress Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-5 left-full w-24 h-1 bg-gray-300 group-hover:bg-blue-300">
                    <div className={`h-full bg-blue-600 transition-all duration-500 ${flag > index + 1 ? 'w-full' : 'w-0'}`} />
                  </div>
                )}
              </div>
            ))}
          </div>



          <div className='w-full flex flex-col gap-2 sm:gap-4 p-5 mt-16'>

            <div className='text-2xl flex gap-2 items-center text-blue-950'> <Lottie animationData={BubbleAnimatedLogo} loop className="w-8 h-8 relative top-[3px]" />Banner | Logo
            <span className="relative inline-block highlight-tilt text-white">
              {storeFormData.storeName}
            </span>
            </div>
      
          </div>

          <div className='w-full flex flex-wrap  gap-4'>
            
            <label className='sm:w-full w-56 cursor-pointer relative h-24 sm:h-44 rounded-md overflow-hidden' htmlFor="banner">
              <Camera className='border rounded-full h-18 w-18 p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
              <span className='text-[12px] absolute bottom-1/7 left-1/2 transform -translate-x-1/2 -translate-y-1/3'>Banner</span>
              
              <input
                required
                type="file"
                name="banner"
                id="banner"
                className='hidden'
                onChange={handleInputChange}
              />
              
              <img
                src={storeFormData?.bannerPreview}
                alt="Banner"
                className='border rounded-md h-44 w-full bg-blue-300/10 object-cover'
              />
            </label>

            <label className='sm:w-96 w-26 cursor-pointer relative h-20 sm:h-44 rounded- overflow-hidden' htmlFor="logo">
              <Camera className='h-18 w-18 p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
              <span className='text-[12px] absolute bottom-1/7 left-1/2 transform -translate-x-1/2 -translate-y-1/3'>Logo</span>
              
              <input
                required
                type="file"
                name="logo"
                id="logo"
                className='hidden'
                onChange={handleInputChange}
              />
              
              <img
                src={storeFormData?.logoPreview}
                alt="logo"
                className='border rounded-md h-44 w-full bg-blue-300/10 object-cover'
              />
            </label>
          
          </div>
          
     
          
          <div className='w-full absolute bottom-10 right-4 flex justify-end p-5'>
            <button
              disabled={!isThirdFlagReady}
              onClick={handleStorePayloadSubmit}
               className={`px-5 py-2 text-[14px] rounded-md transition-all duration-75 ease-in w-23 flex gap-1 items-center 
                ${isThirdFlagReady 
                  ? 'bg-blue-500/30 hover:text-white hover:bg-blue-500 cursor-pointer hover:gap-3'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              
              {loading ? (<>Creating<CircleDashed size={40} strokeWidth={1.25} absoluteStrokeWidth /></>) : (
                <>
                <ChevronRight />
                <span>Next</span>
                </>
              )}
            </button>
          </div>
          
  
      </div>
    </div>
    )
  }


}

export default CreateStoreModal
