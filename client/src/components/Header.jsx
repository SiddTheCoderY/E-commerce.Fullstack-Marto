import React, { useEffect, useState } from 'react';
import {
  ChevronDown,
  ArrowRight,
  ShoppingCart,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Button from './Button';
import Lottie from "lottie-react";
import CartAnimatedLogo from '../assets/cart-logo-animated.json'
import LanguageAnimatedLogo from '../assets/language-animated-logo.json'
import CompanyLogo from '../assets/animated-logo-cart.json';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCartProducts } from '../features/cart/cartThunks';
import { toast } from 'react-hot-toast';
import SearchFilter from './SearchFilter';
import { AnimatePresence, motion } from 'framer-motion';
import { setSearchFilter } from '../features/localState/localStateSlice';

import SearchBar from './SearchBar';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { isSideBarCollapsed } = useSelector((state) => state.localState)
  const { searchFilter } = useSelector((state) => state.localState)
  const { cartProductsLength } = useSelector((state) => state.cart)
  const { screenView } = useSelector((state) => state.localState)
  const [searchedProduct, setSearchedProduct] = useState(searchFilter.searchQuery || '');

  const handleProductSearch = (searchTerm) => {
    if (!isAuthenticated) {
      toast.error("Please login to search products");
      return;
    }

    if (searchTerm.trim() !== "") {
      const queryParams = new URLSearchParams({
        searchQuery: searchTerm,
        category: searchFilter.category,
        price: searchFilter.price,
        rating: searchFilter.rating,
        brand: searchFilter.brand,
        sortBy: searchFilter.sortBy,
        page: searchFilter.page,
        itemsPerPage: searchFilter.itemsPerPage,
      }).toString();

      navigate(`/search?${queryParams}`);
      setSearchedProduct("");
    } else {
      toast.error("Please enter a search term");
    }
  };
  
  // Fetch cart products when the component mounts
  useEffect(() => {
    dispatch(getCartProducts());
    dispatch(setSearchFilter({ searchQuery: "" })); // Reset search filter in the state
  }, [dispatch])

  // Handle click outside to close search filter
  const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);
  const handleSearchFilterToggle = () => {
    setIsSearchFilterOpen(!isSearchFilterOpen);
  };

  return (
    <header className="bg-slate-100/10 shadow-md sm:pl-4 flex justify-between items-center h-14 w-full relative">
      {/* === LEFT: Logo Section === */}
      <div className="flex items-center gap-2">
        {isSideBarCollapsed && (
          <>
            <Lottie animationData={CompanyLogo} loop className="w-8 h-8" />
            <h1 className="text-lg font-bold text-blue-600">Anbari</h1>
          </>
        )}
      </div>

      <div className="flex items-center gap-0 sm:hidden absolute left-2">
        <Lottie animationData={CompanyLogo} loop className="w-8 h-8" />
        <h1 className="text-lg font-bold text-blue-600">Anbari</h1>
      </div>

      {/* Middle Control Search */}
      {screenView === "desktop" && <SearchBar />}

      {/* === RIGHT: Control Items === */}
      <div className="flex items-center gap-2 sm:gap-4 pr-2 h-14">
        {/* Divider */}
        <div className="w-2 h-full flex items-center justify-center sm:hidden ">
          <div className="border-l-2 h-[50%] rounded-full border-blue-800/80"></div>
        </div>

        {/* Cart Icon */}
        <div className="flex items-center justify-center gap-1 hover:gap-2 transition-all duration-150 ease-in cursor-pointer hover:bg-slate-100/30 p-2 rounded-md">
          <span
            onClick={(e) => navigate("/cart")}
            className="relative hover:scale-110 transition-all duration-150 ease"
          >
            <Lottie
              className="sm:w-8 w-6"
              animationData={CartAnimatedLogo}
              loop={true}
            />
            <span className="sm:w-2 w-1 sm:h-2 h-1 sm:text-[10px] text-[8px] bg-red-500 sm:p-2 p-[7px] text-white rounded-full flex items-center justify-center absolute left-6 top-0">
              {cartProductsLength}
            </span>
          </span>
        </div>

        {/* Divider */}
        <div className="w-2 h-full hidden sm:flex items-center justify-center">
          <div className="border-l-2 h-[50%] rounded-full border-blue-800/80"></div>
        </div>

        {/* Language Selector */}
        <div className="sm:flex hidden items-center justify-center gap-1 hover:gap-2 transition-all duration-150 ease-in cursor-pointer hover:bg-slate-100/30 p-2 rounded-md">
          <span className="relative hover:scale-110 transition-all duration-150 ease flex flex-row items-center">
            <Lottie
              className="w-4"
              animationData={LanguageAnimatedLogo}
              loop={true}
            />
            <span className="text-[12.5px]">
              <select name="lang" id="lang">
                <option value="eng">Eng(US)</option>
                <option value="nep">Nep</option>
              </select>
            </span>
          </span>
        </div>

        {/* Divider */}
        <div className="w-2 h-full flex items-center justify-center ml-1">
          <div className="border-l-2 h-[50%] rounded-full border-blue-800/80"></div>
        </div>

        {/* Authenticated User or Signup */}
        {isAuthenticated ? (
          <div className="flex items-center space-x-3 px-2 bg-blue-900/5 hover:bg-blue-900/10 p-1 rounded-md">
            <div className="text-sm hidden sm:flex flex-col">
              <span className="font-semibold text-[13.2px]">
                {user.fullName}
              </span>
              <div className="flex text-[10px]">
                <span className="w-10 truncate">
                  {user.email?.split("@")[0]}
                </span>
                <span>@{user.email?.split("@")[1]}</span>
              </div>
            </div>
            <div className="rounded-full overflow-hidden cursor-pointer">
              <img src={user.avatar} alt="" className="w-6 sm:w-8 h-6 sm:h-8" />
            </div>
          </div>
        ) : (
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-purple-700 hover:underline font-semibold"
            >
              <Button
                variant="primary"
                size="sm"
                icon={ArrowRight}
                className="cursor-pointer w-20 sm:w-32"
              >
                Signup
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
