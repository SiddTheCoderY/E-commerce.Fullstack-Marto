import React, { useEffect, useState } from "react";
import PageBacker from "../components/PageBacker";
import { useDispatch, useSelector } from "react-redux";
import { getAllStores, getStoreById } from "../features/store/storeThunks";
import { setCurrentStore } from "../features/store/storeSlice";
import { Listbox } from "@headlessui/react";
import {
  ChevronDown,
  Container,
  Building2,
  Landmark,
  Store as StoreIcon,
  Plus,
  Box,
  ThumbsUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CreateStoreModal from "../components/CreateStoreModal";
import Lottie from "lottie-react";
import CreateNewAnimated from "../assets/create-new-animated-logo.json";
import CreateProductModal from "../components/CreateProductModal";
import { setProducts } from "../features/product/productSlice";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Store from "./Store";

export default function PublicStore() {
  const storeId = window.location.pathname.split("/")[2];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentStore } = useSelector((state) => state.store);
  const { products, loading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);
  console.log("User", user);
  useEffect(() => {
    dispatch(getStoreById(storeId));
  }, [dispatch, storeId]);

  return (
    <div className="h-full w-full flex flex-col bg-slate-100/10">
      {/* Header */}
      <header className="bg-slate-100/10 shadow-md pl-4 flex justify-between items-center h-14 w-full pr-5 py-4 sticky top-0 z-50">
        <PageBacker />
      </header>

      {/* Body */}

      <div className="flex-1 overflow-y-auto px-5 py-3 z-10 relative">
        {/* Banner */}
        <div className="h-58 w-full rounded-md bg-slate-400/50 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={currentStore?.banner}
            alt="Store Banner"
          />
        </div>

        {/* Store Info */}
        <div className="h-32 w-full flex justify-between items-center pr-0">
          <div className="flex gap-3 items-center h-full justify-center">
            <div className="h-26 w-26 rounded-full bg-blue-700 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={currentStore?.logo}
                alt="Store Logo"
              />
            </div>
            <div className="flex flex-col">
              <span>{currentStore?.storeName}</span>
              <span>{currentStore?.likes?.length || 0} Likes</span>
            </div>
          </div>
          <div className="p-2 rounded-md text-[13px] text-back cursor-pointer highlight-tilt text-white  transition-all duration-100 ease-in md:mr-10">
            {currentStore?.owner === user._id ? (
              "Customize"
            ) : (
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                <span>Like</span>
              </span>
            )}
          </div>
        </div>

        <div className="w-full flex justify-center border-b-2 border-slate-300/30"></div>

        {/* Products */}
        <div className="px-1 w-full flex flex-col gap-3 mt-2">
          <div className="w-full px-2">
            <span className="p-1 text-white highlight-tilt">Products</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
            {products &&
              products.length > 0 &&
              [...products]
                .reverse()
                .map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    loading={loading}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
