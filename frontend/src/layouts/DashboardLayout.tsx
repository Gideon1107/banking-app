import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className={`
        flex-1 
        transition-all duration-300 
        lg:ml-56
        p-4 lg:p-8
      `}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
