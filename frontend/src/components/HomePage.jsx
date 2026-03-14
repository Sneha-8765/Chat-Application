import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'

const HomePage = () => {
  return (
    <div
     className="flex flex-col md:flex-row h-screen"
      
    >
      <div className="w-[900px] h-[550px] flex rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
        
        <Sidebar />
        <MessageContainer />

      </div>
    </div>
  )
}

export default HomePage
