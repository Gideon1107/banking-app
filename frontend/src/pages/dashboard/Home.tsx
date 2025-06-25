import React, { useEffect } from 'react';
import Service from '../../components/Dashboard/Service';
import Balance from '../../components/Dashboard/Balance';


import { useAuthStore } from '../../store/authStore'; // Adjust the import path as necessary

const Home = () => {
   const user = useAuthStore.getState().user;

 useEffect(() => {
    useAuthStore.getState().fetchSession();
 })
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div>
      <h1 className="text-2xl text-text2 font-plus font-bold">
        {getGreeting()} , {user?.firstname || 'User'}!
      </h1>
      <Balance/>
      <Service/>
    </div>
  );
};

export default Home;
