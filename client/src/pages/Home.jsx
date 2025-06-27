import React from 'react'
import Header from '../components/Header'
import { useSelector } from 'react-redux'

function Home() {
  const {loading,user} = useSelector((state) => state.user)
  if(loading) return (
    <>
    <h1>At home screen</h1>
    </>
  )
  return (
    <>
    <Header />
    <h1>Home</h1>
    </>
  )
}

export default Home
