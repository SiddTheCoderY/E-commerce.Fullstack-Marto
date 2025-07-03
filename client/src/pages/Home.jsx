import React,{useEffect} from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import LoaderModal from '../components/LoaderModal'
import ProductCard from '../components/ProductCard'

import {useDispatch,useSelector } from 'react-redux'
import { getAllProducts } from '../features/product/productThunks'

function Home() {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.user)
  const { products } = useSelector((state) => state.product)
  

  if (loading) <LoaderModal />
  
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])
  return (
    <>
      <div className='w-full h-full flex flex-col'>
        {/* Header */}
        <header className='w-full'><Header /></header>

        {/* Banner - Advertisement */}
        

        {/* Product */}
        <div className='w-full overflow-y-scroll p-5'>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products && (
              products?.map((product) => (<ProductCard key={product._id} product={product} loading={loading} />))
            )}
          </div>
        </div>


     </div>
    </>
  )
}

export default Home
