import React, { useState } from 'react';
import {ChevronDown, ArrowRight,ShoppingCart } from 'lucide-react'
import Button from './Button';
import Lottie from "lottie-react";
import CartAnimatedLogo from '../assets/cart-logo-animated.json'
import LanguageAnimatedLogo from '../assets/language-animated-logo.json'

import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authThunks';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/'); // redirect to home after logout
  };

  return (
    <header className="bg-slate-100/10 shadow-md pl-4 pr-1 gap-4 flex justify-end items-center h-14 w-full">

        {isAuthenticated ? (
          <>

          <div className='flex items-cente justify-center gap-1 hover:gap-2 transition-all duration-150 ease-in cursor-pointer hover:bg-slate-100/30 p-2 rounded-md'>
            <span className='relative hover:scale-110 transition-all duration-150 ease'>
            <Lottie className='w-9' animationData={CartAnimatedLogo} loop={true}  />
            <span className='w-2 h-2 text-[10px] bg-red-500 p-2 text-white rounded-full flex items-center justify-center absolute left-7 top-0 '>0</span>
            </span>
          </div>

          {/* Divider */}
          <div className='w-2 h-full flex items-center justify-center'>
            <div className='border-l-2 h-[50%] rounded-full border-blue-800/80'></div>
          </div>

          <div className='flex items-cente justify-center gap-1 hover:gap-2 transition-all duration-150 ease-in cursor-pointer hover:bg-slate-100/30 p-2 rounded-md'>
            <span className='relative hover:scale-110 transition-all duration-150 ease flex flex-row items-center'>
            <Lottie className='w-6' animationData={LanguageAnimatedLogo} loop={true}  />
            <span className='text-[12.5px]'>
              <select name="lang" id="lang">
              <option value="eng">Eng</option>
              <option value="nep">Nep</option>
              </select>
            </span>
            </span>
          </div>

          {/* Divider */}
          <div className='w-2 h-full flex items-center justify-center'>
            <div className='border-l-2 h-[50%] rounded-full border-blue-800/80'></div>
          </div>

          <div 
            className="flex items-center space-x-3 px-2 bg-blue-900/5 hover:bg-blue-900/10 p-1 rounded-md">
            <div className='text-sm hidden sm:flex flex-col '>
              <span className='font-semibold text-[13.2px]'>{user.fullName}</span>
              <div className='flex text-[10px]'><span className='w-10 truncate'>{user.email?.split('@')[0]}</span><span>@{user.email?.split('@')[1]}</span></div>
            </div>
           <div 
             className='rounded-full overflow-hidden cursor-pointer'>
              <img onClick={handleLogout} src={user.avatar} alt=""  width={35}/>
            </div>
          </div>
          
          </>
        ) 
        :
        (
          <>
          <div className='flex items-cente justify-center gap-1 hover:gap-2 transition-all duration-150 ease cursor-not-allowed hover:bg-slate-100/30 p-2 rounded-md'>
            <span className='relative hover:scale-110 transition-all duration-150 ease'>
            <Lottie className='w-9' animationData={CartAnimatedLogo} loop={true}  />
            <span className='w-2 h-2 text-[10px] bg-red-500 p-2 text-white rounded-full flex items-center justify-center absolute left-7 top-0 '>0</span>
            </span>
          </div>

          {/* Divider */}
          <div className='w-2 h-full flex items-center justify-center'>
            <div className='border-l-2 h-[50%] rounded-full border-blue-800/80'></div>
          </div>

          <div className='flex items-cente justify-center gap-1 hover:gap-2 transition-all duration-150 ease-in cursor-pointer hover:bg-slate-100/30 p-2 rounded-md'>
            <span className='relative hover:scale-110 transition-all duration-150 ease flex flex-row items-center'>
            <Lottie className='w-6' animationData={LanguageAnimatedLogo} loop={true}  />
            <span className='text-[12.5px]'>
              <select name="lang" id="lang">
              <option value="eng">Eng</option>
              <option value="nep">Nep</option>
              </select>
            </span>
            </span>
          </div>

          {/* Divider */}
          <div className='w-2 h-full flex items-center justify-center'>
            <div className='border-l-2 h-[50%] rounded-full border-blue-800/80'></div>
          </div>

          <div className="space-x-4 mr-2">
            <Link
              to="/login"
              className="text-purple-700 hover:underline font-semibold"
            >
             <Button variant="primary" size="sm" icon={ArrowRight} className='cursor-pointer'>
              Signup
            </Button>
            </Link>
          </div>
          </>
        )}
      
    </header>
  );
};

export default Header;
