// components/SearchFilter.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  setSearchFilter,
  resetSearchFilter,
} from "../features/localState/localStateSlice";
import { Star } from "lucide-react";

function SearchFilter({ onClose }) {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.localState.searchFilter);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setSearchFilter({ [name]: value }));
  };

  const handleReset = () => {
    dispatch(resetSearchFilter());
    onClose?.();
  };

  const handleApply = () => {
    dispatch(setSearchFilter({ isFilterApplied: true }));
    onClose?.();
  };

  const handleRatingClick = (value) => {
    dispatch(setSearchFilter({ rating: value.toString() }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-xl px-6 py-4 w-full max-w-5xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Filter</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 text-xl"
        >
          ✖
        </button>
      </div>

      {/* Filter Group (Horizontal Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center">
        {/* Search */}
        <input
          type="text"
          name="searchQuery"
          value={filter.searchQuery}
          onChange={handleChange}
          placeholder="🔍 Search..."
          className="bg-gray-100 px-4 py-2 rounded-md w-full outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        {/* Category */}
        <select
          name="category"
          value={filter.category}
          onChange={handleChange}
          className="bg-gray-100 px-4 py-2 rounded-md w-full outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="">All Categories</option>
          <option value="phone">Phone</option>
          <option value="laptop">Laptop</option>
          <option value="fashion">Fashion</option>
        </select>

        {/* Brand */}
        <input
          type="text"
          name="brand"
          value={filter.brand}
          onChange={handleChange}
          placeholder="🏷️ Brand"
          className="bg-gray-100 px-4 py-2 rounded-md w-full outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        {/* Sort By */}
        <select
          name="sortBy"
          value={filter.sortBy}
          onChange={handleChange}
          className="bg-gray-100 px-4 py-2 rounded-md w-full outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="newest">Newest</option>
        </select>

        {/* Price Range */}
        <div className="flex flex-col w-full">
          <label className="text-sm mb-1 text-gray-600">
            💰 Price: ₹{filter.price || 0}
          </label>
          <input
            type="range"
            name="price"
            min="0"
            max="100000"
            step="5000"
            value={filter.price}
            onChange={handleChange}
            className="accent-indigo-500"
          />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={20}
              className={`cursor-pointer transition ${
                Number(filter.rating) >= star
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => handleRatingClick(star)}
            />
          ))}
          {filter.rating && (
            <span className="text-sm text-gray-700 ml-2">{filter.rating}★</span>
          )}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={handleReset}
          className="px-4 py-2 border rounded-md hover:bg-gray-100 transition"
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Apply
        </button>
      </div>
    </motion.div>
  );
}

export default SearchFilter;
