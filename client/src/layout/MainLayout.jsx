import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MainLayout = () => {
    const { loading } = useSelector((state) => state.user);
    const { isSideBarCollapsed } = useSelector((state) => state.localState);
  
    if (loading) return <h1>Loading...</h1>;
  
    // Sidebar width depends on collapse state
    const sidebarWidth = isSideBarCollapsed ? 75 : 250;
  
    return (
      <div className="w-screen h-screen overflow-hidden flex">
        {/* Sidebar fixed on the left */}
        <Sidebar />
  
        {/* Main content shifted to the right of sidebar */}
        <div
          className="h-full overflow-y-auto bg-gray-50 flex-1"
          style={{ marginLeft: sidebarWidth }}
        >
          <Outlet />
        </div>
      </div>
    );
  };
  

export default MainLayout;
