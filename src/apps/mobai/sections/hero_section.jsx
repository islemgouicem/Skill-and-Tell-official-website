import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import pic1 from "../../../assets/images/mobai/pic1.png";
import background from "../../../assets/images/mobai/background.svg";
import smallBackground from "../../../assets/images/mobai/small_background.png";
import mobaiLogo from "../../../assets/images/mobai/mobai_logo.png";
import { Calendar, MapPin } from "lucide-react";

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
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const yCharacters = useTransform(scrollY, [0, 1000], [0, -100]);

  const eventDate = new Date("2026-02-12T09:00:00");

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
    <section id="home" className="relative w-full pt-[80px] overflow-hidden flex">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${background})`, height: "calc(100% - 100px)", top: 0 }}
      />

      <div className="flex flex-col justify-between items-center w-full min-h-[calc(100vh-80px)] relative z-20 px-4 md:px-8 lg:pl-16 lg:pr-0">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-[1400px] mx-auto gap-8 flex-1 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col justify-center items-center w-full lg:w-1/2 -mt-32"
          >
            <motion.div
              className="w-full max-w-[600px]"
              animate={{
                filter: [
                  "drop-shadow(0px 0px 5px rgba(229,41,40,0))",
                  "drop-shadow(0px 0px 20px rgba(229,41,40,0.6))",
                  "drop-shadow(0px 0px 5px rgba(229,41,40,0))",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <img
                src={mobaiLogo}
                alt="MOBAI Logo"
                className="w-full h-auto"
                style={{ filter: "drop-shadow(5px 5px 12px rgba(0,0,0,1))" }}
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-2xl md:text-3xl lg:text-4xl text-white uppercase mb-4 -mt-40 text-center"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Build the next generation of AI mobile apps!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-lg text-white/90 max-w-[550px] mb-6 text-center"
            >
              Mobai is a hackathon organized by Skill&Tell where innovators build AI-powered mobile apps.
            </motion.p>

            <motion.button
              onClick={() => {
                navigate("/mobai/register");
                window.scrollTo(0, 0);
              }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(255,0,6,0)",
                  "0 0 25px rgba(255,0,6,0.6)",
                  "0 0 0px rgba(255,0,6,0)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="bg-[#FF0006] text-white px-12 py-4 rounded-lg uppercase mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Register Now!
            </motion.button>

            <div className="flex gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />12 February
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />ENSIA School
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: yCharacters }} className="w-full lg:w-1/2 flex justify-end">
            <motion.img
              src={pic1}
              alt="Mobai Heroes"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="w-full max-w-[800px]"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full max-w-[1200px] mx-auto mb-12 px-4"
        >
          <motion.div
            className="relative rounded-2xl p-8 bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: `url(${smallBackground})` }}
            animate={{
              boxShadow: [
                "0 0 10px rgba(138,43,226,0.3)",
                "0 0 30px rgba(138,43,226,0.7)",
                "0 0 10px rgba(138,43,226,0.3)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <motion.div
              initial={{ x: "-100%" }}
              whileInView={{ x: "100%" }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
            />

            <div className="text-center mb-6 flex justify-center gap-1">
              {"COMING SOON".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: -40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  className="text-4xl lg:text-5xl text-[#E52928] uppercase tracking-widest"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <div
              className="flex justify-center items-center gap-4 md:gap-8 text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <div className="flex flex-col items-center">
                <div className="text-5xl">
                  <RollingNumber value={timeLeft.days} />
                </div>
                <div className="uppercase text-white/80">Days</div>
              </div>

              <div className="text-4xl text-white/40">:</div>

              <div className="flex flex-col items-center">
                <div className="text-5xl">
                  <RollingNumber value={timeLeft.hours} />
                </div>
                <div className="uppercase text-white/80">Hours</div>
              </div>

              <div className="text-4xl text-white/40">:</div>

              <div className="flex flex-col items-center">
                <div className="text-5xl">
                  <RollingNumber value={timeLeft.minutes} />
                </div>
                <div className="uppercase text-white/80">Mins</div>
              </div>

              <div className="text-4xl text-white/40">:</div>

              <div className="flex flex-col items-center">
                <div className="text-5xl">
                  <RollingNumber value={timeLeft.seconds} />
                </div>
                <div className="uppercase text-white/80">Secs</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
