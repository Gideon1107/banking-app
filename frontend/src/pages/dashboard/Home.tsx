import Service from '../../components/Dashboard/Service';
import Balance from '../../components/Dashboard/Balance';
import React from 'react';

const Home = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div>
      <h1 className="text-2xl text-text2 font-plus font-bold">
        {getGreeting()} ,IFearAids!
      </h1>
      <Balance/>
      <Service/>
    </div>
  );
};

export default Home;
