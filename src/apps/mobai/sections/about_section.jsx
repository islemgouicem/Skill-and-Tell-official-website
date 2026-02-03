import { motion } from "framer-motion";
import aboutImage from "/images/mobai/about.png";

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
      className="relative w-full pt-10 lg:max-h-screen overflow-hidden flex"
    >
      <div className="flex flex-col justify-center items-center w-full relative z-20 px-4 md:px-8 lg:px-16">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-[1400px] mx-auto gap-8 lg:gap-16 py-8 md:py-12">
          <div className="w-full lg:w-[50%] flex justify-center lg:justify-start items-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative w-[60%]"
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
            className="flex flex-col justify-center items-center w-full lg:w-1/2 space-y-4 md:space-y-4 order-1 lg:order-2"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <h2
                className="title text-center mb-0"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                About Mobai
              </h2>
            </motion.div>

            <motion.h3
              variants={itemVariants}
              className="text-2xl md:text-3xl font-semibold text-white text-center tracking-widest mb-6"
            >
              What is mobai?
            </motion.h3>

            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-base md:text-lg text-subtitle leading-relaxed text-center max-w-[600px] font-futura_md_bt">
                Mobai is a hackathon organized by skill&tell, where ennovators and tech enthousiasts come together to build ai powered mobile applications. Participants will compete to create amazing apps Mobai is a hackathon organized by skill&tell, where ennovators and tech enthousiasts come together to build ai powered mobile applications. Participants will compete to create amazing apps
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
