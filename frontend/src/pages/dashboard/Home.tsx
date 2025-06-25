import React, { useEffect } from 'react';
import Service from '../../components/Dashboard/Service';
import Balance from '../../components/Dashboard/Balance';


import { authStore } from '../../store/authStore'; // Adjust the import path as necessary

const Home = () => {
  const user = authStore((state) => state.user);
  const loading = authStore((state) => state.loading);
  const error = authStore((state) => state.error);
  const fetchSession = authStore((state) => state.fetchSession);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

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
