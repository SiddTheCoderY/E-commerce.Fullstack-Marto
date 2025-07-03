import React, { useState } from 'react';
import {
  Star, StarHalf, StarOff, Heart, ShoppingCart, BadgePercent, CheckCircle, PencilLine
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { useSelector,useDispatch } from 'react-redux'
import { toggleProductToWishList } from '../features/wishList/wishListThunk'


const ProductCard = ({ loading, product }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  
  const {
    title, price, discount, features, images = [],
    category, isFeatured, stock, ratings
  } = product;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderStars = () => {
    const stars = [];
    const full = Math.floor(ratings?.average || 0);
    const hasHalf = ratings?.average % 1 >= 0.5;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    for (let i = 0; i < full; i++) stars.push(<Star key={`f-${i}`} size={14} className="text-yellow-400" />);
    if (hasHalf) stars.push(<StarHalf key="half" size={14} className="text-yellow-400" />);
    for (let i = 0; i < empty; i++) stars.push(<StarOff key={`e-${i}`} size={14} className="text-gray-300" />);
    return stars;
  };

  const nextImage = () => setCurrentImageIndex((currentImageIndex + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);

  const [wishlist, setWishlist] = useState(() => {
    const initial = {};
    if (user?.wishListProducts?.length) {
      user.wishListProducts.forEach(id => {
        initial[id] = true;
      });
    }
    return initial;
  });

  const toggleWishlist = async(productId) => {
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
    try {
      await dispatch(toggleProductToWishList({productId})).unwrap()
    } catch (error) {
      
    }
  };

  const [cartStatus, setCartStatus] = useState({});

  const toggleCart = (productId) => {
    setCartStatus((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
    // You can store it in Redux or localStorage here too
  };
  
  
  if (loading) {        
        return (
          <div className="bg-white rounded-xl shadow-md border p-3 max-w-xs w-full animate-pulse space-y-3">
            <div className="w-full h-40 bg-gray-200 rounded-lg" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="flex gap-2 mt-2">
              <div className="h-5 w-12 bg-gray-200 rounded-full" />
              <div className="h-5 w-12 bg-gray-200 rounded-full" />
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="h-3 w-16 bg-gray-200 rounded" />
              <div className="flex gap-2">
                <div className="h-7 w-7 rounded-full bg-gray-200" />
                <div className="h-7 w-7 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        );
  }
  
  return (

    <div key={product._id} className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-blue-300 p-3 max-w-xs w-full">
      {/* Image Carousel */}
      <div className="relative w-full h-40 overflow-hidden rounded-lg mb-3 group">
        <img
          src={images[currentImageIndex]}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Prev/Next hover controls */}
        {images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 p-1 rounded-full text-gray-700 hover:bg-white">
              ‹
            </button>
            <button onClick={nextImage} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 p-1 rounded-full text-gray-700 hover:bg-white">
              ›
            </button>
          </>
        )}

        {/* Wishlist Icon */}
        {(!user || user?._id !== product?.seller) && (
          <button
            onClick={() => {
              if (user) {
                toggleWishlist(product._id)
              } else {
                toast.error('Please Login First')
                navigate('/')
              }
            }}
            className={`absolute top-2 right-2 p-1 rounded-full shadow-md transition-all duration-300
              ${wishlist[product._id] ? 'bg-red-100 text-red-600 scale-110' : 'bg-white text-blue-600 hover:bg-blue-100'}`}
          >
            <Heart
              size={18}
              className={`transition-transform duration-300 ${
                wishlist[product._id] ? 'fill-red-600 text-red-600 heart-bounce' : ''
              }`}
            />
          </button>
        )}

        {/* Stock badge */}
        <span className={`absolute bottom-2 left-2 text-[10px] px-2 py-0.5 rounded-full font-semibold
          ${stock > 0 ? 'bg-green-300 text-green-950' : 'bg-red-100 text-red-600'}`}>
          {stock > 0 ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">{title}</h2>
          {isFeatured && (
            <span className="text-[10px] text-blue-600 font-semibold flex items-center gap-0.5">
              <CheckCircle size={12} /> Featured
            </span>
          )}
        </div>

        <div className="text-[11px] text-gray-400 line-clamp-1">{category}</div>

        <div className="flex items-center gap-1">
          <p className="text-base font-bold text-blue-600">Rs {price}</p>
          {discount > 0 && (
            <div className="flex items-center text-xs text-red-500 line-through">
              <BadgePercent size={12} className="mr-0.5" /> {discount}%
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {renderStars()}
          <span className="text-xs text-gray-500 ml-1">({ratings?.count})</span>
        </div>

        <div className="flex flex-wrap gap-1 mt-1">
          {features?.slice(0, 3).map((f, i) => (
            <span key={i} className="bg-blue-50 text-blue-600 text-[10px] px-2 py-[2px] rounded-full">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3 flex justify-between items-center">
        <span className="text-xs text-gray-400">Stock: {stock}</span>
        <div className="flex gap-1.5">
          {user?._id !== product.seller ? (
            <div className="relative">
              <button
                onClick={() => toggleCart(product._id)}
                className={`
                  text-[12px]
                  group flex items-center gap-2 transition-all duration-300 ease-in-out
                  rounded-full bg-gradient-to-r  text-white
                  overflow-hidden px-3 py-1 h-8
                  ${cartStatus[product._id] ? 'w-34 from-blue-500 to-blue-800' : 'w-10 group-hover:w-34 from-blue-900 to-blue-950'}
                `}
              >
                {/* Icon */}
                <div className="z-10 flex-shrink-0">
                  {cartStatus[product._id] ? (
                    <CheckCircle size={18} />
                  ) : (
                    <ShoppingCart size={18} />
                  )}
                </div>

                {/* Sliding Text */}
                <span
                  className={`
                    text-[12.5px] font-medium whitespace-nowrap transition-all duration-300
                    transform
                    ${cartStatus[product._id]
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}
                  `}
                >
                  {cartStatus[product._id] ? 'Added to Cart' : 'Add to Cart'}
                </span>
              </button>
            </div>
          ) : (
            <button className="cursor-pointer hover:scale-110 p-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition flex flex-col">
              <PencilLine size={16} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
