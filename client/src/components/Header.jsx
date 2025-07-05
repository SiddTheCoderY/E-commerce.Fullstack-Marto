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

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { isSideBarCollapsed } = useSelector((state) => state.localState)
  const { cartProductsLength } = useSelector((state) => state.cart)
  const [searchedProduct, setSearchedProduct] = useState('');

  const handleProductSearch = (searchTerm) => {
    if (!isAuthenticated) {
      toast.error('Please login to search products');
      return;
    }
    if (searchTerm.trim() !== '') {
      // Navigate to the search results page with the search term
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      // Clear the search input after navigating
      setSearchedProduct('');
    } else {
      toast.error('Please enter a search term');  
    }
  };
 
  useEffect(() => {
    dispatch(getCartProducts())
  }, [dispatch])

  return (
    <header className="bg-slate-100/10 shadow-md pl-4 flex justify-between items-center h-14 w-full">

  {/* === LEFT: Logo Section === */}
      <div className="flex items-center gap-2">
        {isAuthenticated && isSideBarCollapsed && (
          <>
            <Lottie animationData={CompanyLogo} loop className="w-8 h-8" />
            <h1 className="text-lg font-bold text-blue-600">Anbari</h1>
          </>
        )}
      </div>

      {/* Middle Control Search */}
      <div className="flex items-center relative w-96 max-w-xl mx-4">
        <input
          value={searchedProduct}
          onChange={(e) => setSearchedProduct(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleProductSearch(searchedProduct);
              e.preventDefault(); // Prevent form submission
            }
          }}
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-md px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-10 pl-4 pr-18 text-sm"
        />
        {/* filter item */}
        <SlidersHorizontal width={20} className="cursor-pointer hover:scale-110 text-gray-500 mr-2 absolute right-10 top-1/2 transform -translate-y-1/2" />
        <Search width={20} onClick={() => handleProductSearch(searchedProduct)} className="cursor-pointer text-gray-500 mr-2 absolute right-0 hover:scale-110" />
      </div>

  {/* === RIGHT: Control Items === */}
      <div className="flex items-center gap-4 pr-2 h-14">
    {/* Cart Icon */}
    <div className='flex items-center justify-center gap-1 hover:gap-2 transition-all duration-150 ease-in cursor-pointer hover:bg-slate-100/30 p-2 rounded-md'>
      <span onClick={(e) => navigate('/cart')} className='relative hover:scale-110 transition-all duration-150 ease'>
        <Lottie className='w-8' animationData={CartAnimatedLogo} loop={true} />
            <span className='w-2 h-2 text-[10px] bg-red-500 p-2 text-white rounded-full flex items-center justify-center absolute left-6 top-0'>{ cartProductsLength}</span>
      </span>
    </div>

    {/* Divider */}
    <div className='w-2 h-full flex items-center justify-center'>
      <div className='border-l-2 h-[50%] rounded-full border-blue-800/80'></div>
    </div>

    {/* Language Selector */}
    <div className='flex items-center justify-center gap-1 hover:gap-2 transition-all duration-150 ease-in cursor-pointer hover:bg-slate-100/30 p-2 rounded-md'>
      <span className='relative hover:scale-110 transition-all duration-150 ease flex flex-row items-center'>
        <Lottie className='w-4' animationData={LanguageAnimatedLogo} loop={true} />
        <span className='text-[12.5px]'>
          <select name="lang" id="lang">
            <option value="eng">Eng(US)</option>
            <option value="nep">Nep</option>
          </select>
        </span>
      </span>
    </div>

    {/* Divider */}
    <div className='w-2 h-full flex items-center justify-center'>
      <div className='border-l-2 h-[50%] rounded-full border-blue-800/80'></div>
    </div>

    {/* Authenticated User or Signup */}
    {isAuthenticated ? (
      <div className="flex items-center space-x-3 px-2 bg-blue-900/5 hover:bg-blue-900/10 p-1 rounded-md">
        <div className='text-sm hidden sm:flex flex-col'>
          <span className='font-semibold text-[13.2px]'>{user.fullName}</span>
          <div className='flex text-[10px]'>
            <span className='w-10 truncate'>{user.email?.split('@')[0]}</span>
            <span>@{user.email?.split('@')[1]}</span>
          </div>
        </div>
        <div className='rounded-full overflow-hidden cursor-pointer'>
          <img src={user.avatar} alt="" width={35} />
        </div>
      </div>
    ) : (
      <div className="space-x-4">
        <Link to="/login" className="text-purple-700 hover:underline font-semibold">
          <Button variant="primary" size="sm" icon={ArrowRight} className='cursor-pointer'>
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
