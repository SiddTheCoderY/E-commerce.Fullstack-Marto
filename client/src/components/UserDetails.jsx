import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserCredentials } from "../features/user/userThunks";
import { Link } from "react-router-dom";

import {
  Truck,
  Wallet,
  Undo2,
  ShieldOff,
  Store,
  ThumbsUp,
  Timer,
  ExternalLink,
  MapPin,
  Phone,
  Landmark,
  Pencil,
} from "lucide-react";

export default function UserDetails({ product }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [isExpanded, setIsExpanded] = useState(false);
  const [address, setAddress] = useState(user.address || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [shippingAddress, setShippingAddress] = useState(
    user.shippingAddress || ""
  );

  const handleAddAddress = (e) => {
    e.preventDefault();
    if ([address, phoneNumber, shippingAddress].some((field) => field === ""))
      return;
    dispatch(updateUserCredentials({ address, phoneNumber, shippingAddress }));
    setIsExpanded(false); // close the form after submit
  };

  return (
    <div className="space-y-6 mt-8 p-4 border border-black/20 rounded-lg bg-white w-full text-sm flex flex-col">
      {/* Delivery Info */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Delivery Options</h3>

        {isExpanded ? (
          <form className="space-y-2" onSubmit={handleAddAddress}>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Address"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="number"
              placeholder="Phone Number"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <input
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              type="text"
              placeholder="Shipping Address"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddAddress}
                type="submit"
                className={`px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition ${
                  !address || !phoneNumber || !shippingAddress
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Save
              </button>
              <button
                type="button"
                className="text-gray-500 hover:underline"
                onClick={() => setIsExpanded(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : user.address || user.phoneNumber || user.shippingAddress ? (
          <div className="text-gray-700 space-y-2">
            <div className="flex justify-between items-start gap-2">
              <div className="space-y-1">
                <p className="flex items-center gap-2">
                  <MapPin size={18} /> {user.shippingAddress}
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={16} /> {user.phoneNumber}
                </p>
                <p className="flex items-center gap-2">
                  <Landmark size={16} /> {user.address}
                </p>
              </div>
              <button
                className="flex items-center text-blue-500 hover:underline text-xs gap-1"
                onClick={() => setIsExpanded(true)}
              >
                <Pencil size={14} /> Change
              </button>
            </div>
          </div>
        ) : (
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            + Add Delivery Info
          </span>
        )}

        <div className="mt-3 space-y-1 text-gray-800">
          <p className="flex items-center gap-2">
            <Truck size={16} /> Standard Delivery (23-27 Jul)
          </p>
          <p className="flex items-center gap-2">
            <Wallet size={16} /> Cash on Delivery Available
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300"></div>

      {/* Return & Warranty */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Return & Warranty</h3>
        <p className="flex items-center gap-2 text-gray-800">
          <Undo2 size={16} /> 14 Days Free Returns
        </p>
        <p className="flex items-center gap-2 text-gray-800">
          <ShieldOff size={16} />
          {product.warranty ? "Warranty Available" : "No Warranty"}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300"></div>

      {/* Seller Info */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Sold by</h3>
        <p className="flex items-center gap-2 text-gray-700">
          <Store size={16} /> {product?.store?.storeName || "Unknown Seller"}
        </p>
        <p className="flex items-center gap-2 text-gray-800">
          <ThumbsUp size={16} /> 81% Positive Seller Rating
        </p>
        <p className="flex items-center gap-2 text-gray-800">
          <Timer size={16} /> {product?.store?.shippingTimeScore || "100"}% Ship
          on Time
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300"></div>

      {/* Store Link */}
      <div className="text-center w-full flex justify-center">
        <Link
          to={`/store/${product?.store?._id}`}
          className="flex items-center gap-1 mx-auto text-blue-600 hover:underline hover:text-blue-700 transition"
        >
          Go to Store <ExternalLink size={14} />
        </Link>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300"></div>
    </div>
  );
}
