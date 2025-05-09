import Service from '../../components/Dashboard/Service';
import Balance from '../../components/Dashboard/Balance';
import React from 'react';

const Home = () => {
  return (
    <div>
      <h1 className="text-2xl text-text2 font-plus font-bold">Good Morning ,Mike!</h1>
      <Balance/>
      <Service/>
    </div>
  );
};

export default Home;
