import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartProducts } from "../features/cart/cartThunks";
import PageBacker from "../components/PageBacker";
import CartItem from "../components/CartItem";
import { AnimatePresence, motion } from "framer-motion";
import { Omega } from "lucide-react"; // Assuming Omega is an icon you want to use

function Cart() {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch]);

  return (
    <div className="h-full w-full flex flex-col bg-slate-100/10">
      {/* Sticky Header */}
      <header className="bg-slate-100/10 shadow-md pl-4 flex justify-between items-center h-14 w-full pr-5 py-4 sticky top-0 z-50">
        <PageBacker />

        <div className="flex justify-center items-center gap-4">
          <span>
            Total : Rs{" "}
            <span className="font-bold">
              {cartProducts?.reduce((acc, item) => acc + item.product.price, 0)}
            </span>
          </span>

          {/* Divider */}
          <div className="h-5 w-0.5 bg-blue-400 rounded-full"></div>

          <span className="bg-blue-400 hover:bg-blue-500 transition-all duration-150 ease-in py-2 px-4 rounded-md cursor-pointer text-sm flex items-center gap-1 hover:gap-3 text-white">
            <Omega className="w-4 h-4" /> Buy Now
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-5 py-3 z-10 relative">
        {" "}
        {/* pt-20 to give space below fixed header */}
        <h1 className="text-2xl font-bold mb-6 text-blue-900">
          Your Cart Products
        </h1>
        <AnimatePresence>
          {cartProducts?.length > 0 ? (
            [...cartProducts]
              .reverse()
              .map((item) => <CartItem key={item._id} item={item} />)
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 mt-10"
            >
              Your cart is empty.
            </motion.p>
          )}
        </AnimatePresence>
        <div className="h-14 w-full text-white flex items-center justify-end py-2 px-10">
          <span className="bg-blue-400 hover:bg-blue-500 transition-all duration-150 ease-in py-2 px-4 rounded-md cursor-pointer text-sm flex items-center gap-1 hover:gap-3 text-white">
            <Omega className="w-4 h-4" /> Buy Now
          </span>
        </div>
      </main>
    </div>
  );
}

export default Cart;
