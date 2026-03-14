import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'

const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-screen">

      <div className="flex w-full h-full md:h-[550px] md:max-w-6xl rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">

        <Sidebar />
        <MessageContainer />

      </div>

    </div>
  );
};

export default HomePage;