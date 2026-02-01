import CyberCard from "../components/cyberCard"

export default function Mentors() {

  // Array of mentor names (same name repeated for now)
  const mentorsNames = [
    "TBD",
    "TBD",
    "TBD",
  ]

  // Array of mentor image paths , I have created an extra image to use it here 
  const mentorImgs = [
    "/images/anon.png",
    "/images/anon.png",
    "/images/anon.png",
  ]

  // Array of mentor description texts
  const mentorsText = [
    "Mobai is a hackathon organized by skill&tell, where ennovators and tech enthousiasts come together to build ai",
    "Mobai is a hackathon organized by skill&tell, where ennovators and tech enthousiasts come together to build ai",
    "Mobai is a hackathon organized by skill&tell, where ennovators and tech enthousiasts come together to build ai"
  ]

  // Create mentor cards by mapping over images
  const mentorCards = mentorImgs.map((img, index) => (
        
    // Each mentor is wrapped inside a CyberCard component
    <CyberCard key={index}>

      {/* Container for image and name */}
      <div className="relative mb-[1rem]">

        {/* Mentor image */}
        <img
          src={img}
          alt={`Mentor ${index + 1}`}
          className="w-full object-cover rounded-md"
        />

        {/* Mentor name with cyber-style glow effect */}
        <h3
          className="font-[100] text-[#F7F0FF] text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase -mt-[1.75rem]"
          style={{
            textShadow:
              "0px 10px 30px #9045d5ff,0px -10px 30px #9045d5ff",
          }}
        >
          {mentorsNames[index]}
        </h3>

      </div>

      {/* Mentor description */}
      <p className="text-center font-[100]">
        {mentorsText[index]}
      </p>

    </CyberCard>
  ))

  return (
    // Main mentors section
    <section
      id="mentors"
      className="relative w-full py-4 min-h-screen overflow-hidden flex flex-col items-center"
    >

      {/* Section title */}
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-red-title tracking-wider mb-12 text-[#FF0006]">
        OUR MENTORS
      </h2>

      {/* Cards container (column on mobile, row on medium screens+) */}
      <div className="md:flex-row mx-[10%] md:gap-[5%] flex flex-col gap-[3rem] pb-20">
        {mentorCards}
      </div>

    </section>
  )
}
