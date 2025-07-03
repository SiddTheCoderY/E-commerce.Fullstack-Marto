import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartProducts } from "../features/cart/cartThunks";
import PageBacker from "../components/PageBacker";
import CartItem from "../components/CartItem";
import { AnimatePresence, motion } from "framer-motion";

function Cart() {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch]);

  return (
    <div className="w-full h-full bg-white">
      {/* Sticky Header */}
      <header className="bg-slate-100/10 shadow-md pl-4 flex items-center h-14 w-full fixed top-0 z-50 backdrop-blur-md">
        <PageBacker />
      </header>

      {/* Main Content */}
      <main className="pt-20 px-4 pb-10">
        {" "}
        {/* pt-20 to give space below fixed header */}
        <h1 className="text-2xl font-bold mb-6 text-blue-900">Your Cart Products</h1>
        <AnimatePresence>
          {cartProducts?.length > 0 ? (
            cartProducts.map((item) => <CartItem key={item._id} item={item} />)
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
      </main>
    </div>
  );
}

export default Cart;
