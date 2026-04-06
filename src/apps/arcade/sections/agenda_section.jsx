
const Agenda = () => {
const schedule = [
  {
    time: "08:00 - 09:00 AM",
    task: "Lorem ipsum dolor sit"
  },
  {
    time: "08:00 - 09:00 AM",
    task: "Lorem ipsum dolor sit"
  },
  {
    time: "08:00 - 09:00 AM",
    task: "Lorem ipsum dolor sit"
  },
  {
    time: "08:00 - 09:00 AM",
    task: "Lorem ipsum dolor sit"
  },
  {
    time: "08:00 - 09:00 AM",
    task: "Lorem ipsum dolor sit"
  },
  {
    time: "08:00 - 09:00 AM",
    task: "Lorem ipsum dolor sit"
  }
];
  const scheduleDiv=schedule.map((item,index)=>{return (
    <div className="flex gap-[1rem] justify-evenly w-full  md:justify-center " key={index}>
        <p>{item.time}</p>
        <p>{item.task}</p>
    </div>
  )})
    return (
        <section className="relative w-full px-[2rem] md:px-[5%] lg:px-[10%] flex flex-col justify-center items-center overflow-hidden py-20 " id="agenda">
            <img src="images\arcade\agenda.png" alt="" className="w-[80%] sm:w-[70%] md:w-[60%]  lg:w-[40%] " />
            <div className="w-full flex justify-between mt-[3rem]">
                <img src="images\arcade\agenda_zombie.png" className=" hidden md:block  md:w-[12rem] lg:w-[16rem] 2xl:w-[20rem]"/>
                <div  class=" w-full  md:w-[60%] lg:w-[50%] 2xl:w-[40%]  py-[2rem] px-[1.5rem]  flex flex-col justify-between
                    bg-[#FF0000]/[0.05] 
                    backdrop-blur-[30px] 
                    border border-[#8C1414] 
                    shadow-[inset_0_0_20px_0_rgba(255,114,114,0.4)]
                    rounded-[50px]
                ">
                    
                    {scheduleDiv}
                    <img src="images\arcade\top_right_sm_mobile.png" className="absolute top-[-13px] right-[-15px] "/>
                    <img src="images\arcade\bottom_left_sm_mobile.png" alt="" className=" absolute bottom-[-13px] left-[-15px]"/>

                </div>
                
            </div>


        </section>
    )
}

export default Agenda