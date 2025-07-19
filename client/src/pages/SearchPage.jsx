import React, { useEffect,useState } from "react";
import PageBacker from "../components/PageBacker";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { AnimatePresence, motion } from "framer-motion";
import { getFilteredProducts } from "../features/product/productThunks";
import { SlidersHorizontal, Search } from "lucide-react";
import SearchFilter from "../components/SearchFilter";
import { setSearchFilter } from "../features/localState/localStateSlice";
import { useNavigate } from "react-router-dom";
function SearchPage() {
  const navigate = useNavigate();
  const { filteredProducts, loading } = useSelector((state) => state.product);
  const { isAuthenticated } = useSelector((state) => state.user);
  const filter = useSelector((state) => state.localState.searchFilter);
  const { searchFilter } = useSelector((state) => state.localState)
  const [searchedProduct, setSearchedProduct] = useState(searchFilter.searchQuery || '');


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFilteredProducts(filter));
  }, [dispatch,filter]);

    // Handle click outside to close search filter
    const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);
    const handleSearchFilterToggle = () => {
      setIsSearchFilterOpen(!isSearchFilterOpen);
  };
  
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
    
  
  return (
    <div className="h-full w-full flex flex-col bg-slate-100/10">
      {/* Header */}
      <header className="bg-slate-100/10 shadow-md pl-4 flex justify-between items-center h-14 w-full pr-5 py-4 sticky top-0 z-50">
        <PageBacker />

        {/* Middle Control Search */}
        <div className="flex items-center relative w-96 max-w-xl mx-4 mr-60">
          <input
            value={searchFilter.searchQuery}
            onChange={(e) =>
              dispatch(setSearchFilter({ searchQuery: e.target.value }))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleProductSearch(e.target.value);
                e.preventDefault(); // Prevent form submission
              }
            }}
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-10 pl-4 pr-18 text-sm relative"
          />
          {/* filter item */}
          <SlidersHorizontal
            onClick={handleSearchFilterToggle}
            width={20}
            className="cursor-pointer hover:scale-110 text-gray-500 mr-2 absolute right-10 top-1/2 transform -translate-y-1/2"
          />
          <Search
            width={20}
            onClick={() => handleProductSearch(searchedProduct)}
            className="cursor-pointer text-gray-500 mr-2 absolute right-0 hover:scale-110"
          />
          <AnimatePresence>
            {isSearchFilterOpen && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black/30 z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSearchFilterOpen(false)}
                />
                <div className="absolute top-12 left-0 w-[150%] z-50 min-h-[200px]">
                  <SearchFilter onClose={() => setIsSearchFilterOpen(false)} />
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Products */}
      <div className="px-1 w-full flex flex-col gap-3 mt-2">
        <div className="w-full px-2">
          <span className="p-1 text-white highlight-tilt">
            Searched Products
          </span>
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-5"
          >
            {loading ? (
              // Show 8 skeletons
              Array.from({ length: 8 }).map((_, index) => (
                <ProductCard key={index} product={null} loading={true} />
              ))
            ) : filteredProducts?.length > 0 ? (
              [...filteredProducts]
                .reverse()
                .map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    loading={false}
                  />
                ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-500 mt-10 w-[50vw] text-end"
              >
                Currently, No products found for your search.
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SearchPage;
