import React,{useState,useRef, useEffect} from 'react'
import { X,Store,Boxes,Camera,ChevronRight,Check,CircleCheck,CircleSlash2,ChevronLeft  } from 'lucide-react'
import { StoreCategoryoptions } from '../constants'
import axiosInstance from '../utils/axiosInstance';


function ModelExit({onClose}) {
  return (
    <div className='justify-end flex mr-5'><X className='cursor-pointer' onClick={onClose} /></div>
  )
}

function CreateStoreModal({ action, onClose }) {

  // scope flag ( 1 ) ===>>>>>>>>> Global FLag
  const [flag,setFlag] = useState(2)
  
  
  
  // scope flag ( 1 )
  const [storeName, setStoreName] = useState('')
  const [storeNameDataLoading,setStoreNameDataLoading] = useState(null)
  const [storeNameData,setStoreNameData] = useState(null)
  const checkStoreNameAvailablity = async(storeName) => {
    try {
      setStoreNameDataLoading(true)
      const response = await axiosInstance.post('/store/check-store-name-availablity', {storeName})
      console.log('Store Name valdity', response.data)
      setStoreNameData(response.data)
    } catch (error) {
      console.log('Error occured while checking the store name availablity',error)
    } finally {
      setStoreNameDataLoading(false)
    }
  }


  useEffect(() => {
    if (!storeName.trim()) {
      setStoreNameData(null)
      return
    };
    
    const handler = setTimeout(() => {
      checkStoreNameAvailablity(storeName);
    }, 1000);
  
    return () => clearTimeout(handler); 
  }, [storeName]);
  

  
  if (flag === 1) {
    return (
      <div className="cursor-auto fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 text-black">
      <div className="bg-white rounded-xl shadow-xl px-6 py-4 w-[70vw] h-[90vh] max-w-[80vw] flex flex-col items-center gap-2 relative">
  
          <div className='w-full justify-end'><ModelExit onClose={onClose} /></div>
          
          <div className='w-full flex flex-col gap-2 p-5 mt-10'>

            <div className='text-2xl flex gap-2 items-center text-blue-950'><Store className='relative top-[2px]' />Name Your Store
            </div>
            <div className='w-full mt-10'>
              <input
                required
                value={storeName}
                onChange={(e) => {
                  const value = e.target.value
                  const capitalized = value.charAt(0).toUpperCase() + value.slice(1)
                  setStoreName(capitalized)
                }}
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
          
     

          <div className='w-full absolute bottom-10 right-4 flex justify-end p-5'>
            <button
              className={`px-5 py-2 text-[14px] rounded-md transition-all duration-75 ease-in w-23 flex gap-1 items-center bg-blue-500 `}
            >
              <span>Next</span>
              <ChevronRight />
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
          
     

          <div className='w-full absolute bottom-10 right-4 flex justify-end p-5'>
            <button
              className={`px-5 py-2 text-[14px] rounded-md transition-all duration-75 ease-in w-23 flex gap-1 items-center bg-blue-500 `}
            >
              <span>Next</span>
              <ChevronRight />
            </button>
          </div>
          
  
      </div>
    </div>
    )
  }


}

export default CreateStoreModal
