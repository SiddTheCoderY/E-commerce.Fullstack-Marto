import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../features/product/productThunks";
import { useSelector, useDispatch } from "react-redux";
import UserDetails from "./UserDetails";
import ProductReviews from "./ProductReviews";

export default function ProductShowcase({ isModal = false, product = null }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { cartProducts } = useSelector((state) => state.cart);

  const isProductInCart = cartProducts.some(
    (cartProduct) => cartProduct.product._id === productId
  );

  const { currentProduct } = useSelector((state) => state.product);
  const selectedProduct = product || currentProduct;

  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product && productId) {
      dispatch(getProductById(productId));
    }
  }, [product, productId, dispatch]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setSelectedImage(selectedProduct.images[0]);
    }
  }, [selectedProduct]);

  const handleClose = () => navigate(-1);

  if (!selectedProduct) return <div>Loading...</div>;

  const {
    title,
    images,
    price,
    discount,
    description,
    category,
    brand,
    features = [],
    ratings = {},
    stock = 0,
  } = selectedProduct;

  const discountedPrice = Math.round(price - (price * discount) / 100);

  return (
    <div
      className={`${
        isModal
          ? "fixed inset-0 z-[9999] bg-black/40 flex flex-col items-center justify-center"
          : "relative"
      }`}
    >
      <div className="bg-white px-4 pt-0 pb-4 rounded-xl shadow-xl w-[90%] h-[90%] overflow-y-auto">
        {/* Sticky Top Bar */}
        <div className="sticky top-0 z-50 h-12 w-full bg-white/90 backdrop:backdrop-blur-2xl border-b border-gray-400 flex items-center justify-end pr-4">
          {isModal && (
            <button className="text-gray-700" onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer hover:scale-110"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Product Details */}
        <div className="w-full flex flex-col md:flex-row lg:h-[90%] h-auto items-center">
          <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Images */}
            <div>
              <img
                src={selectedImage}
                alt="Product"
                className="w-full h-96 object-cover rounded-lg border"
              />
              <div className="flex mt-4 space-x-2 overflow-x-auto">
                {images?.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="thumb"
                    className={`w-20 h-20 object-cover rounded border cursor-pointer ${
                      selectedImage === img ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="text-gray-600">{description}</p>

              <div className="text-sm text-gray-700">
                {features.map((feat, i) => (
                  <span
                    key={i}
                    className="inline-block bg-gray-100 px-2 py-1 rounded mr-2"
                  >
                    {feat}
                  </span>
                ))}
              </div>

              <div className="text-xl font-bold">
                Rs. {discountedPrice}{" "}
                <span className="text-sm line-through text-gray-400">
                  Rs. {price}
                </span>{" "}
                <span className="text-sm text-green-600">-{discount}%</span>
              </div>

              <div className="flex items-center gap-1 text-yellow-500">
                {ratings?.average
                  ? "★".repeat(Math.floor(ratings.average))
                  : "No ratings yet"}
                <span className="text-gray-500 text-sm ml-2">
                  ({ratings?.count || 0})
                </span>
              </div>

              <div className="text-sm text-gray-600">In Stock: {stock}</div>

              {/* Quantity */}
              <div className="flex items-center mt-2">
                <button
                  className="px-3 py-1 border"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  className="px-3 py-1 border"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-4">
                <button
                  className={`${
                    !(user.address || user.phone || user.shippingAddress)
                      ? "cursor-not-allowed bg-blue-600/50"
                      : "cursor-pointer bg-blue-600 hover:bg-blue-700"
                  }  text-white px-5 py-2 rounded `}
                >
                  Buy Now
                </button>
                {isProductInCart ? (
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-5 py-2 rounded"
                    // onClick={handleRemoveFromCart}
                  >
                    Added to Cart
                  </button>
                ) : (
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                    // onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right side */}

          <div className="w-full md:w-[40%] lg:w-[30%] bg-amber-800">
            <UserDetails product={selectedProduct} />
          </div>
        </div>

        {/* Bottom Bar */}

        <div className="w-full bg-blue-200/10 p-4">
          <ProductReviews />
        </div>
        
        <div className="w-full bg-blue-200/10 p-4">
          <ProductReviews />
        </div>
      </div>
    </div>
  );
}
