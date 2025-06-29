import React, { useEffect,useState } from 'react';
import PageBacker from '../components/PageBacker';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStores } from '../features/store/storeThunks';
import { setCurrentStore } from '../features/store/storeSlice';
import { Listbox } from '@headlessui/react';
import { ChevronDown, Container, Building2, Landmark, Store as StoreIcon, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CreateStoreModal from '../components/CreateStoreModal';


export default function Store() {
  const dispatch = useDispatch();
  const [storeCreatemodalOpen, setStoreCreateModalOpen] = useState(false);
  const { stores, currentStore } = useSelector((state) => state.store);

  useEffect(() => {
    dispatch(getAllStores());
  }, [dispatch]);

  const handleStoreChange = (selectedStore) => {
    if (selectedStore._id === 'new-store') {
      console.log('Redirect to create new store');
    } else {
      localStorage.setItem('selectedStoreId', selectedStore._id);
      dispatch(setCurrentStore(selectedStore));
    }
  };

  // Get icon by store index or type (mock logic for uniqueness)
  const getStoreIcon = (index, type = 'default') => {
    const icons = [StoreIcon, Building2, Landmark];
    return icons[index % icons.length] || StoreIcon;
  };

  return (
    <div className="h-full w-full flex flex-col bg-slate-100">
      {/* Header */}
      <header className="bg-slate-100/10 shadow-md pl-4 flex justify-between items-center h-14 w-full pr-5 py-4 sticky top-0 z-50">
        <PageBacker />

        <div className="flex text-[12px] items-center gap-2 bg-blue-200/30 hover:bg-blue-200/50 hover:text-blue-900 p-2 cursor-pointer rounded-md transition-all">
          <Container size={20} />

          {stores.length <= 1 ? (
            <span>{stores.length === 0 ? 'New Store' : stores[0].storeName}</span>
          ) : (
            <Listbox value={currentStore} onChange={handleStoreChange}>
              <div className="relative w-44">
                <Listbox.Button className="relative w-full cursor-pointer rounded-md py-1.5 pl-3 pr-10 text-left text-blue-800 shadow-sm text-sm">
                  <span className="block truncate">{currentStore?.storeName || 'Select Store'}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center pr-2">
                    <ChevronDown size={16} />
                  </span>
                </Listbox.Button>

                <AnimatePresence>
                  <Listbox.Options as={motion.ul}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg"
                  >
                    {stores.map((store, index) => {
                      const Icon = getStoreIcon(index);
                      return (
                        <Listbox.Option
                          key={store._id}
                          value={store}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-4 pr-4 flex items-center gap-2 ${
                              active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                            }`
                          }
                        >
                          <Icon size={16} />
                          {store.storeName}
                        </Listbox.Option>
                      );
                    })}
                      <Listbox.Option
                      onClick={() => setStoreCreateModalOpen(true)}
                      value={{ _id: 'new-store', storeName: 'New Store' }}
                      className="cursor-pointer py-2 pl-4 pr-4 text-blue-700 hover:bg-blue-100 flex items-center gap-2"
                    >
                      <Plus size={16} />
                       Create New Store
                    </Listbox.Option>
                  </Listbox.Options>
                </AnimatePresence>
              </div>
            </Listbox>
          )}
          {/* Create Store Model */}
          {storeCreatemodalOpen && (<CreateStoreModal onClose={() => setStoreCreateModalOpen(false)} />)}
        </div>
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
        <div className="h-32 w-full flex justify-between items-center pr-20">
          <div className="flex gap-3 items-center h-full justify-center">
            <div className="h-26 w-26 rounded-full bg-blue-700 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={currentStore?.logo}
                alt="Store Logo"
              />
            </div>
            <div className="flex flex-col">
              <span>{currentStore?.storeName || 'No Store Selected'}</span>
              <span>{currentStore?.likes?.length || 0} Likes</span>
            </div>
          </div>
          <div>Like</div>
        </div>

        <div className="w-full flex justify-center border-b-2 border-slate-300/30"></div>

        {/* Products */}
        <div>Products</div>
      </div>
    </div>
  );
}
