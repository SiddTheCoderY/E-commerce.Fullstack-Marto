import React from 'react'
import { X } from 'lucide-react'


function CreateStoreModal({action,onClose}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
    <div className="bg-white rounded-xl shadow-xl px-6 py-4 w-[80vw] h-[90vh] max-w-[80vw] flex flex-col items-center">

        <div className='w-full justify-end flex'><X onClick={onClose} /></div>
        
        <div className='h-full w-full bg-amber-100'>

        </div>

    </div>
  </div>
  )
}

export default CreateStoreModal
