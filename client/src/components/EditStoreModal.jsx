import React,{useState,useRef} from 'react'
import { X,Store,Boxes,Camera } from 'lucide-react'
import { StoreCategoryoptions } from '../constants'

function EditStoreModal({ action, onClose }) {

  const [selectedCategory, setSelectedCategory] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const selectRef = useRef(null);

  const handleInputFocus = () => {
    setShowOptions(true);
    setTimeout(() => {
      selectRef.current?.focus();
    }, 100); // delay to ensure the input is no longer focused
  };

  const handleOptionChange = (e) => {
    setSelectedCategory(e.target.value);
    setShowOptions(false);
  };

  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
    <div className="bg-white rounded-xl shadow-xl px-6 py-4 w-[80vw] h-[90vh] max-w-[80vw] flex flex-col items-center gap-2">

        <div className='w-full justify-end flex'><X onClick={onClose} /></div>
        
        <div className='h-full w-full'>
          <form
            // method="post"
            enctype="multipart/form-data"
            className='h-full w-full flex flex-col gap-2 sm:gap-4 rounded-md'
          >
            {/* Name - category */}
            <div className='flex flex-wrap justify-between gap-2 sm:gap-5'>
              <label className='flex items-center relative' htmlFor="storeName">
              <Store size={20} className='absolute left-1' />
                <input
                  placeholder='Store Name'
                  type="text"
                  name="storeName"
                  id="storeName"
                  className='input'
                />
              </label>

              <label className="flex items-center relative w-full max-w-md">
                <Boxes size={20} className="absolute left-2 z-10 text-gray-500" />
                <input
                  type="text"
                  placeholder="Category"
                  name="storeCategory"
                  id="storeCategory"
                  value={selectedCategory}
                  onFocus={handleInputFocus}
                  readOnly
                  className="input pl-8 w-full cursor-pointer"
                />
               {showOptions && (
                  <select
                    ref={selectRef}
                    value={selectedCategory} // <-- controlled by React
                    onChange={handleOptionChange}
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

            {/* Files - banner */}
            <div className='w-full flex flex-wrap sm:flex-nowrap gap-4'>
              <label className='sm:w-56 w-26 cursor-pointer relative h-20 sm:h-44 rounded- overflow-hidden' htmlFor="logo">
                <Camera className='h-18 w-18 p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
                <span className='text-[12px] absolute bottom-1/7 left-1/2 transform -translate-x-1/2 -translate-y-1/3'>Logo</span>
                
                <input
                  type="file"
                  name="logo"
                  id="logo"
                  className='hidden'
                />
                
                <img
                  src=""
                  alt=""
                  className='border rounded-md h-44 w-full bg-blue-300/10 object-cover'
                />
              </label>

              <label className='sm:w-full w-56 cursor-pointer relative h-24 sm:h-44 rounded-md overflow-hidden' htmlFor="banner">
                <Camera className='border rounded-full h-18 w-18 p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
                <span className='text-[12px] absolute bottom-1/7 left-1/2 transform -translate-x-1/2 -translate-y-1/3'>Banner</span>
                
                <input
                  type="file"
                  name="banner"
                  id="banner"
                  className='hidden'
                />
                
                <img
                  src=""
                  alt=""
                  className='border rounded-md h-44 w-full bg-blue-300/10 object-cover'
                />
              </label>

            </div>

            <div className='border-b-2 border-blue-300/30'></div>

            {/*  - details */}
            <div className='w-full flex gap-2 sm:gap-4 flex-wrap justify-between'>
            <label className='flex items-center relative' htmlFor="storeName">
              <Store size={20} className='absolute left-1' />
                <input
                  placeholder='Contact Email'
                  type="email"
                  name="contactEmail"
                  id="contactEmail"
                  className='input'
                />
              </label>

              <label htmlFor="contactNumber" className='flex items-center relative'>
              <Store size={20} className='absolute left-1' />
              <input
                  placeholder='Contact Number'
                  type="number"
                  name="contactNumber"
                  id="contactNumber"
                  className='input'
                />
              </label>

              <label htmlFor="address" className='flex items-center relative'>
              <Store size={20} className='absolute left-1' />
              <input
                  placeholder='Addressl'
                  type="text"
                  name="address"
                  id="address"
                  className='input'
                />
              </label>

              <label  htmlFor="description" className='flex  relative'>
              <Store size={20} className='absolute left-1 top-2' />
              <textarea
                  placeholder='Description'
                  name="description"
                  id="description"
                  className='input max-h-44 overflow-y-scroll w-full'
              />
              </label>

            </div>

          </form>
        </div>

    </div>
  </div>
  )
}

export default EditStoreModal;
