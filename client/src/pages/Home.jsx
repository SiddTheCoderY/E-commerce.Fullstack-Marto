import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useSelector } from 'react-redux'
import LoaderModal from '../components/LoaderModal'

function Home() {
  const {loading} = useSelector((state) => state.user)
  if(loading) <LoaderModal />
  return (
    <>
     <div className='w-full h-full'>
      <Header />
     </div>
    </>
  )
}

export default Home
