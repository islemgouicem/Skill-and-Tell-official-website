"use client"
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CyberCard from "../components/cyberCard"
import CyberButton from "../components/CyberButton"
import PopUp from "@/components/ui/popup"
import Image from "next/image";

const RollingNumber = ({ value }) => {
  return (
    <motion.span
      key={value}
      initial={{ rotateX: -90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="inline-block"
    >
      {String(value).padStart(2, "0")}
    </motion.span>
  );
};

export default function HeroSection() {
  const { scrollY } = useScroll();
  const yCharacters = useTransform(scrollY, [0, 1000], [0, -100]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const eventDate = new Date("2026-02-12T15:00:00");

  const getTimeRemaining = () => {
    const total = eventDate - new Date();
    const seconds = Math.max(0, Math.floor((total / 1000) % 60));
    const minutes = Math.max(0, Math.floor((total / 1000 / 60) % 60));
    const hours = Math.max(0, Math.floor((total / (1000 * 60 * 60)) % 24));
    const days = Math.max(0, Math.floor(total / (1000 * 60 * 60 * 24)));
    return { total, days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full pt-[64px] overflow-hidden flex"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/images/mobai/background.svg)`, height: "calc(100% - 100px)", top: 0 }}
      />
      <div className="w-full relative px-4 md:px-8">
        <div className="flex flex-col px-8 lg-px-2 lg:flex-row items-center lg:items-start justify-between w-full max-w-[1400px] mx-auto gap-8 flex-1 py-4">
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col justify-center items-center lg:items-start w-full lg:w-1/2"
          >
            <div
              className="w-[60%] lg:w-[70%] max-w-[600px] my-4"
            >
              <Image width={400} height={300}
                src="/images/mobai/mobai_logo_1.png"
                alt="MOBAI Logo"
                className="w-full h-auto"
                style={{ filter: 'drop-shadow(13px 10px 4px rgba(0, 0, 0, 0.6))' }}
              />
            </div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-xl md:text-2xl lg:text-3xl text-center lg:text-left text-mwhite uppercase mb-4 bebas "
            >
              Build the next generation of AI mobile apps!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-sm md:text-base lg:text-lg text-center lg:text-left text-subtitle max-w-[550px] mb-4 font-futura_lt_bt"
            >
              Mobai is a hackathon organized by skill&tell, where ennovators and tech enthousiasts come together to build ai powered mobile applications. Participants will compete to create amazing apps.
            </motion.p>

            <CyberButton
              variant="primary"
              onClick={handleOpenPopup}//() => navigate("/mobai/register")
              className="uppercase px-6 md:px-10 py-2 text-lg md:text-xl my-4 bebas tracking-widest"
            >
              REGISTER NOW!
            </CyberButton>

            <div className="flex gap-4 md:gap-10 text-sm md:text-base text-white/90">
              <div className="flex items-center gap-2 bebas">
                <Image width={400} height={300} src="/images/mobai/calendar.svg"  className="w-4 h-4 md:w-5 md:h-5" /> 12 feb
              </div>
              <div className="flex items-center gap-2 bebas">
                <Image width={400} height={300} src="/images/mobai/map.svg" className="w-4 h-4 md:w-5 md:h-5" />ENSIA School
              </div>
            </div>
          </motion.div>


          <div style={{ y: yCharacters }} className="hidden lg:flex w-[40%] -mr-8">
            <motion.img
              src="/images/mobai/pic3.png"
              alt="Mobai Heroes"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </div>
        </div>

        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full flex justify-center md:-mt-10"
        >
          <CyberCard className="w-full lg:w-[96%]">
            <motion.div
              initial={{ x: "-100%" }}
              whileInView={{ x: "100%" }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
            />

            <div className="text-center mb-4 md:mb-6 flex justify-center gap-0.5 md:gap-1">
              {"COMING  SOON".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: -40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  className="text-2xl md:text-4xl lg:text-5xl text-red-main-500 uppercase bebas"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <div
              className="flex justify-center items-center gap-2 md:gap-4 lg:gap-8 text-white"
            >
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl lg:text-5xl">
                  <RollingNumber value={timeLeft.days} />
                </div>
                <div className="uppercase text-white font-bold text-xs md:text-sm lg:text-base">Days</div>
              </div>

              <div className="text-2xl md:text-3xl lg:text-4xl text-white font-bold">:</div>

              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl lg:text-5xl">
                  <RollingNumber value={timeLeft.hours} />
                </div>
                <div className="uppercase text-white font-bold text-xs md:text-sm lg:text-base">Hours</div>
              </div>

              <div className="text-2xl md:text-3xl lg:text-4xl text-white font-bold">:</div>

              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl lg:text-5xl">
                  <RollingNumber value={timeLeft.minutes} />
                </div>
                <div className="uppercase text-white font-bold text-xs md:text-sm lg:text-base">Mins</div>
              </div>

              <div className="text-2xl md:text-3xl lg:text-4xl text-white font-bold">:</div>

              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl lg:text-5xl">
                  <RollingNumber value={timeLeft.seconds} />
                </div>
                <div className="uppercase text-white font-bold text-xs md:text-sm lg:text-base">Secs</div>
              </div>
            </div>
          </CyberCard>
        </motion.div>
      </div>
      <PopUp isOpen={isPopupOpen}
        onClose={handleClosePopup}
        color={"bg-red-main-500"}
        title={"Registration"}
        subtitle={"Closed for This Season"}
        msg={"Registration for this season has closed, but great things are ahead! Keep an eye out — we’ll be opening again with fresh opportunities next season."} />
    </section>
  );
}