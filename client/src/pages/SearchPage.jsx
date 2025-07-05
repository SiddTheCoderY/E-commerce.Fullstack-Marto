import React, { useEffect } from "react";
import PageBacker from "../components/PageBacker";
import { useDispatch, useSelector } from "react-redux";
import { getWishListProducts } from "../features/wishList/wishListThunk";
import ProductCard from "../components/ProductCard";
import { AnimatePresence, motion } from "framer-motion";

function SearchPage() {
  const dispatch = useDispatch();
  const { wishListProducts, loading } = useSelector(
    (state) => state.wishListProduct
  );

  useEffect(() => {
    dispatch(getWishListProducts());
  }, [dispatch]);

  return (
    <div className="h-full w-full flex flex-col bg-slate-100/10">
      {/* Header */}
      <header className="bg-slate-100/10 shadow-md pl-4 flex justify-between items-center h-14 w-full pr-5 py-4 sticky top-0 z-50">
        <PageBacker />
      </header>

      {/* Products */}
      <div className="px-1 w-full flex flex-col gap-3 mt-2">
        <div className="w-full px-2">
          <span className="p-1 text-white highlight-tilt">Products</span>
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-5"
          >
            {wishListProducts?.length > 0 ? (
              [...wishListProducts]
                .reverse()
                .map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    loading={false}
                  />
                ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className=" text-gray-500 mt-10 w-[50vw] text-end"
              >
                Your cart is empty.
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SearchPage;
