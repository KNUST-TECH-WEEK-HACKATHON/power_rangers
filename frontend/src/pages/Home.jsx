
const Home = () => {

  return (
    <div className="">
      <header className="px-6 relative bg-gray-000 pt-18">
        
        <div className="absolute top-0 left-0 h-full w-full overflow-hidden z-0">
          <img src="/images/assembly_line.png" alt="" className="object-cover h-full w-full transition-all duration-700 opacity-0 dark:opacity-100 absolute top-0 left-0 z-0" />
          <img src="/images/assembly_line_wh.png" alt="" className="object-cover h-full w-full transition-all duration-700 opacity-100 dark:opacity-0 absolute top-0 left-0 z-0" />
          <div className="absolute top-0 left-0 h-full w-full bg-white dark:bg-black dark:bg-opacity-20 bg-opacity-20 backdrop-blur z-10"></div>
        </div>

        <div className="relative h-full w-full z-10 grid grid-cols-1 gap-3">

          <div className="flex flex-col justify-center items-center text-center z-10 relative min-h-[100vh]">
            <div className="h-[200px] min-[861px]:h-[200px] z-0 max-[860px]:-top-1-2 top--12 relative">
              <img src="/images/robot__.png" alt="" className="object-contain h-full w-full" />
            </div>
            <div className="flex flex-col justify-center items-center max-[860px]:mt-0">
              <div className="text-5xl max-[800px]:text-3xl max-[430px]:text-2xl max-[350px]:text-lg font-semibold max-w-[700px] ">Document Understanding Model Project Beyond</div>
              <p className="max-w-[400px] max-[430px]:text-sm my-3 mt-5 max-[380px]:mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, vero?</p>
              <button className="border-2 border-blue-500 bg-blue-500 text-white text-sm font-semibold rounded-3xl px-6 py-3 mt-1.5 w-max max-[430px]:w-full max-[430px]:py-1.5">Get Started</button>
            </div>
          </div>


        </div>

      </header>
    </div>
  )
}

export default Home