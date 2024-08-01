import React from 'react'

const Load = ({ load=false }) => {
  if(load)
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center flex-col bg-black bg-opacity-30 backdrop-blur-xs">
        <div className="h-[50px] w-[50px] rounded-full  overflow-hidden flex items-center justify-center relative">
            <img src="/images/loading.gif" alt="" className="object-cover h-full w-full opacity-50" />
        </div>
    </div>
  )
  else return (<></>)
}

export default Load