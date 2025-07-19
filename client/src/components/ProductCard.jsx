import React, { useState, useEffect } from "react";
import {
  Star,
  StarHalf,
  StarOff,
  Heart,
  ShoppingCart,
  BadgePercent,
  CheckCircle,
  PencilLine,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { toggleProductToWishList } from "../features/wishList/wishListThunk";
import { toggleProductToCart } from "../features/cart/cartThunks";

const ProductCard = ({ loading, product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const { screenView } = useSelector((state) => state.localState);
  const { cartProducts } = useSelector((state) => state.cart);

  if (loading || !product) {
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

  // Destructure product properties
  const {
    title,
    price,
    discount,
    features,
    images = [],
    category,
    isFeatured,
    stock,
    ratings,
  } = product;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderStars = () => {
    const stars = [];
    const full = Math.floor(ratings?.average || 0);
    const hasHalf = ratings?.average % 1 >= 0.5;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    for (let i = 0; i < full; i++)
      stars.push(<Star key={`f-${i}`} size={14} className="text-yellow-400 fill-yellow-400" />);
    if (hasHalf)
      stars.push(<StarHalf key="half" size={14} className="text-yellow-400 fill-yellow-600" />);
    for (let i = 0; i < empty; i++)
      stars.push(
        <StarOff key={`e-${i}`} size={14} className="text-gray-300" />
      );
    return stars;
  };

  const nextImage = () =>
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  const prevImage = () =>
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );

  const [wishlist, setWishlist] = useState(() => {
    const initial = {};
    if (user?.wishListProducts?.length) {
      user.wishListProducts.forEach((id) => {
        initial[id] = true;
      });
    }
    return initial;
  });

  const toggleWishlist = async (productId) => {
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
    try {
      await dispatch(toggleProductToWishList({ productId })).unwrap();
    } catch (error) {}
  };

  const [cartStatus, setCartStatus] = useState(() => {
    const initial = {};
    if (cartProducts?.length) {
      cartProducts?.forEach((item) => {
        initial[item.product?._id?.toString()] = true;
      });
    }
    return initial;
  });

  const toggleCart = async (productId) => {
    console.log("toggling product", productId);
    setCartStatus((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));

    try {
      await dispatch(toggleProductToCart({ productId })).unwrap();
    } catch (error) {
      toast.error("Unable to toggle");
    }
  };

  const handleOpenProductShowCase = () => {
    navigate(`/product/${product._id}`, {
      state: {
        backgroundLocation: location,
      },
    });
  };

 return (
  <div
    key={product._id}
    className={`relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-black/40 p-2 max-w-xs ${
      screenView === "mobile" ? "mb-3 w-[42vw]" : "mb-0 w-full"
    }`}
  >
    {/* Smaller Image */}
    <div
      className={`relative w-full ${
        screenView === "mobile" ? "h-28" : "h-40"
      } overflow-hidden rounded-md mb-2 group`}
    >
      <img
        src={images[currentImageIndex]}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Minimal Wishlist Icon */}
      {(!user || user?._id !== product?.seller) && (
        <button
          onClick={() => {
            if (user) {
              toggleWishlist(product._id);
            } else {
              toast.error("Please Login First");
              navigate("/");
            }
          }}
          className={`absolute top-1 right-1 p-0.5 rounded-full shadow transition cursor-pointer
            ${
              wishlist[product._id]
                ? "bg-red-100 text-red-600"
                : "bg-white text-blue-600 hover:bg-blue-100"
            }`}
        >
          <Heart size={18} className={wishlist[product._id] ? "fill-red-600" : ""} />
        </button>
      )}
    </div>

    {/* Minimal Info */}
    <div onClick={handleOpenProductShowCase} className={`space-y-1 cursor-pointer`}>
      <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">{title}</h2>

        <p className="text-[15px] font-bold text-blue-600">Rs {price - (price * discount / 100)}</p>
      <div className="flex items-center gap-1">
        <p className={`text-[13.5px] font-bold text-blue-600/50 line-through ${discount > 0 ? "" : "hidden"}`}>Rs {price}</p>
        {discount > 0 && (
          <div className="flex items-center text-[16px] text-red-500 ">
            <div><BadgePercent size={11} className="mr-0.5 mt-0.5" /></div>
            <div> {discount}%</div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-0.5">
        {renderStars()} {/* Already using size={14} */}
        <span className="text-[10px] text-gray-400 ml-1">({ratings?.count})</span>
      </div>
    </div>

    {/* Minimal Actions */}
    <div className="mt-2 flex justify-end items-center">
      <div className="flex gap-1">
        {user?._id !== product.seller ? (
          <button
            type="button"
            onClick={() => {
              if (user) {
                toggleCart(product._id);
              } else {
                toast.error("Please login first !");
              }
            }}
            className={`
              group flex items-center gap-1 rounded-full px-2 py-1 h-7 text-white text-[11px]
              transition-all duration-300 cursor-pointer
              ${
                cartStatus[product._id?.toString()]
                  ? "bg-blue-600"
                  : "bg-blue-900 hover:bg-blue-800"
              }
            `}
          >
            {cartStatus[product._id?.toString()] ? (
              <CheckCircle size={14} />
            ) : (
              <ShoppingCart size={14} />
            )}
            <span className="hidden sm:inline">
              {cartStatus[product._id?.toString()]
                ? "Added"
                : "Add"}
            </span>
          </button>
        ) : (
          <button className="p-1 cursor-pointer rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
            <PencilLine size={16} />
          </button>
        )}
      </div>
    </div>
  </div>
);
};

export default ProductCard;
