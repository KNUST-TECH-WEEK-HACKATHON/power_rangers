import React from 'react'

const About = () => {
  const teams = [
    {
      name: "Grace Aliko",
      title: "AI Engineer",
      image: "/images/red_ranger.png",
      real_image: "/images/red_ranger.png",
      color: "bg-white dark:bg-[#333] border-red-500",
    },
    {
      name: "Moses Winbood",
      title: "AI Engineer",
      image: "/images/blue_ranger.png",
      real_image: "/images/blue_ranger.png",
      color: "bg-white dark:bg-[#333] border-blue-500",

    },
    {
      name: "Klenam Klenam",
      title: "AI Engineer",
      image: "/images/green_ranger.png",
      real_image: "/images/green_ranger.png",
      color: "bg-white dark:bg-[#333] border-green-500",
    },
    {
      name: "New P",
      title: "AI Engineer",
      image: "/images/yellow_ranger.png",
      real_image: "/images/yellow_ranger.png",
      color: "bg-white dark:bg-[#333] border-yellow-500",
    },
    {
      name: "David Shalom",
      title: "Full Stack Developer",
      image: "/images/black_ranger.png",
      real_image: "/images/real_black.png",
      color: "bg-white dark:bg-[#333] border-black",
    },
  ];

  return (
    <div className='mt-20 spacing-x py-9'>
        <div className="top">
            <h1 className='text-3xl font-semibold max-w-[500px]'>Rangers Assembled To Build The Ultimate Doc Module</h1>
            <p className='my-3'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur animi praesentium harum, suscipit id accusamus ab repudiandae ipsa eum reprehenderit architecto ea voluptatum expedita. Odit maiores, dolor adipisci ipsa suscipit cum voluptas, vitae quos provident, doloribus soluta et exercitationem? Earum fugiat exercitationem eum tenetur maxime eligendi, autem expedita iure.
            </p>
        </div>

        <div className='mt-12'>
          <h2 className="text-2xl font-medium"><span className='title-one'>M</span>eet The Rangers</h2>

          <div className="grid-box gap-3 mt-6">
            {teams.map((item, index) => 
              <div key={index} className="member w-[200px] max-[500px]:w-full">
                <div className="image h-[200px] mx-auto rounded dark:bg-opacity-30 overflow-hidden relative">
                  <img src={item.real_image} alt="" className="object-contain h-full w-full scale-90" />
                  <div className={`absolute bottom-0 right-0 h-[50px] w-[50px] rounded-full border-2 p-0.5 ${item.color}`}>
                    <img src={item.image} alt="" className="object-contain h-full w-full " />
                  </div>
                </div>
                <div className="content text-center mt-2">
                  <div className="name font-semibold text-base">{item.name}</div>
                  <div className="font-medium text-xs">{item.title}</div>
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default About