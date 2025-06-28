import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useSelector } from 'react-redux'

function Home() {
  const {loading} = useSelector((state) => state.user)
  if(loading) return (
    <>
    <h1>At home screen</h1>
    </>
  )
  return (
    <>
     <div className='w-full h-full'>
      <Header />
     </div>
    </>
  )
}

export default Home
