import React, { useEffect } from 'react'
import PageBacker from '../components/PageBacker'
import { useDispatch, useSelector } from 'react-redux'
import { getWishListProducts } from '../features/wishList/wishListThunk'
import ProductCard from '../components/ProductCard'

function WishList() {
  const dispatch = useDispatch()
  const { wishListProducts, loading } = useSelector((state) => state.wishListProduct)
  

  useEffect(() => {
    dispatch(getWishListProducts())
  }, [dispatch])
  
  return (
    <div className='h-full w-full flex flex-col bg-slate-100/10'>
         {/* Header */}
         <header className="bg-slate-100/10 shadow-md pl-4 flex justify-between items-center h-14 w-full pr-5 py-4 sticky top-0 z-50">
        <PageBacker />
      </header>

           {/* Products */}
           <div className='px-1 w-full flex flex-col gap-3 mt-2'>
            <div className='w-full px-2'>
              <span className='p-1 text-white highlight-tilt'>Products</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishListProducts && (
              [...wishListProducts]
                .reverse()
                .map((product) => (
                  <ProductCard key={product._id} product={product} loading={false} />
                ))
            )}
            </div>
          </div>
      


    </div>
  )
}

export default WishList
