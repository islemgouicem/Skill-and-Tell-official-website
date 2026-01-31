import { motion } from "framer-motion";
import aboutImage from "../../../assets/images/mobai/about.png";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="relative w-full pt-[80px] min-h-screen overflow-hidden flex"
    >
      <div className="flex flex-col justify-center items-center w-full min-h-[calc(100vh-80px)] relative z-20 px-4 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-[1400px] mx-auto gap-8 lg:gap-16 py-8 md:py-12">
          <div className="w-full lg:w-1/2 flex justify-center items-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-[400px] lg:max-w-[500px]"
            >
              <motion.img
                src={aboutImage}
                alt="Mobai AI Robot"
                animate={{
                  y: [0, -25, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-auto object-contain"
                style={{
                  filter: "drop-shadow(0px 0px 40px rgba(138, 43, 226, 0.6))",
                }}
              />
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="flex flex-col justify-center items-center w-full lg:w-1/2 space-y-4 md:space-y-9 order-1 lg:order-2"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <h2
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#E52928] uppercase tracking-wider text-center"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                About Mobai
              </h2>
            </motion.div>

            <motion.h3
              variants={itemVariants}
              className="text-2xl md:text-3xl font-semibold text-white text-center"
            >
              What is mobai?
            </motion.h3>

            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-base md:text-lg text-white/90 leading-relaxed text-center max-w-[600px]">
                Mobai is a hackathon organized by skill&tell, where innovators and
                tech enthusiasts come together to build AI-powered mobile
                applications.
                <br />
                <br />
                Participants will compete to create amazing apps that push the
                boundaries of what's possible with artificial intelligence and
                mobile UX.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
