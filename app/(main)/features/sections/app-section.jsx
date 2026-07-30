"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PopUp from "../../../../components/ui/popup";
import Image from "next/image";
//images
import phone2 from "../../../../assets/images/skillntell/phone2.webp";
import phone1 from "../../../../assets/images/skillntell/phone1.webp";
import card1 from "../../../../assets/images/skillntell/card1.webp";
import card2 from "../../../../assets/images/skillntell/card2.webp";
import qr from "../../../../assets/images/skillntell/qr.png";
import member_card from "../../../../assets/images/skillntell/member_card.webp";
import event_card from "../../../../assets/images/skillntell/event_card.webp";
// motion-wrapped Next Image so framer-motion can animate it directly
const MotionImage = motion.create(Image);
export default function AppSection() {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };
    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    // framer-motion initial/whileInView props for images (replaces the old getImageAnimation)
    const getImageMotion = (delay, initialX, initialY, initialRotate, finalRotate) => ({
        initial: {
            opacity: 0,
            x: `calc(-50% + ${initialX})`,
            y: `calc(-50% + ${initialY})`,
            rotate: initialRotate,
        },
        whileInView: {
            opacity: 1,
            x: "-50%",
            y: "-50%",
            rotate: finalRotate,
        },
        viewport: { once: false, amount: 0.2 },
        transition: { duration: 1, ease: "easeOut", delay: delay / 1000 },
    });
    // Responsive positioning for images
    const getImageStyle = (baseTop, baseLeft, baseWidth, baseRotate, desktopAdjustments = {}, tabletAdjustments = {}, mobileAdjustments = {}) => {
        let top = baseTop;
        let left = baseLeft;
        let width = baseWidth;
        let rotate = baseRotate;
        if (windowWidth >= 1024) {
            // Desktop adjustments
            top = desktopAdjustments.top !== undefined ? desktopAdjustments.top : top;
            left = desktopAdjustments.left !== undefined ? desktopAdjustments.left : left;
            width = desktopAdjustments.width !== undefined ? desktopAdjustments.width : width;
            rotate = desktopAdjustments.rotate !== undefined ? desktopAdjustments.rotate : rotate;
        }
        else if (windowWidth >= 768) {
            // Tablet adjustments
            top = tabletAdjustments.top !== undefined ? tabletAdjustments.top : top;
            left = tabletAdjustments.left !== undefined ? tabletAdjustments.left : left;
            width = tabletAdjustments.width !== undefined ? tabletAdjustments.width : width;
            rotate = tabletAdjustments.rotate !== undefined ? tabletAdjustments.rotate : rotate;
        }
        else {
            // Mobile adjustments
            top = mobileAdjustments.top !== undefined ? mobileAdjustments.top : top;
            left = mobileAdjustments.left !== undefined ? mobileAdjustments.left : left;
            width = mobileAdjustments.width !== undefined ? mobileAdjustments.width : width;
            rotate = mobileAdjustments.rotate !== undefined ? mobileAdjustments.rotate : rotate;
        }
        return {
            rotate,
            style: {
                position: "absolute",
                top: `${top}%`,
                left: `${left}%`,
                width: `${width}%`,
                objectFit: "contain",
                zIndex: 2, // Ensure images are above background
                filter: "drop-shadow(0px 8px 20px rgba(0, 0, 0, 0.15))", // Stronger shadow for depth
            },
        };
    };
    return (<section id="app" style={{
            position: "relative",
            width: "100%",
            minHeight: "100vh", // Ensure enough height for scroll animation
            backgroundColor: "#FFFFFF", // Explicitly white background
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
      {/* Wavy orange line as a separate image overlay */}

      <picture>
        {/* Mobile background */}
        <source media="(max-width: 768px)" srcSet="/images/app_mob_bg.svg"/>
        {/* Default (desktop) */}
        <Image src="/images/App_section_bg.svg" alt="Wavy orange line background element" height={400} width={300} className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"/>
      </picture>


      {/* Individual App Images - Meticulously positioned and sized */}
      {/* Image 1: Large phone on left (Member Card screen) */}
      {(() => {
            const { style, rotate } = getImageStyle(48, // baseTop
            25, // baseLeft
            10, // baseWidth
            0, { top: 25, left: 12, width: 15 }, // Desktop
            { top: 10, left: 20, width: 20 }, // Tablet
            { top: 10, left: 20, width: 30 });
            return (<MotionImage src={phone2} loading="lazy" height={400} width={300} alt="Large phone showing member card screen" style={style} {...getImageMotion(0, "-150px", "0", -10, rotate)} // Animate from left
            />);
        })()}

      {/* Image 2: Top middle purple card (Skill&Tell) */}
      {(() => {
            const { style, rotate } = getImageStyle(18, // baseTop
            48, // baseLeft
            16, // baseWidth
            -10, // baseRotate
            { top: 18, left: 32, width: 16, rotate: -10 }, // Desktop
            { top: 15, left: 65, width: 22, rotate: -10 }, // Tablet
            { top: 5, left: 45, width: 35, rotate: -5 });
            return (<MotionImage height={400} width={300} src={card1} loading="lazy" alt="Skill&Tell card with purple background" style={style} {...getImageMotion(200, "0", "-150px", 20, rotate)} // Animate from top
            />);
        })()}
      {(() => {
            const { style, rotate } = getImageStyle(45, // baseTop
            70, // baseLeft
            20, // baseWidth
            5, // baseRotate
            { top: 30, left: 80, width: 15, rotate: -20 }, // Desktop
            { top: 50, left: 65, width: 28, rotate: 5 }, // Tablet
            { top: 25, left: 70, width: 40, rotate: 5 });
            return (<MotionImage height={400} width={300} src={qr} loading="lazy" alt="Purple QR card" style={style} {...getImageMotion(600, "150px", "0", 10, rotate)} // Animate from right
            />);
        })()}

      {/* Image 3: Top right white member card */}
      {(() => {
            const { style, rotate } = getImageStyle(20, // baseTop
            78, // baseLeft
            20, // baseWidth
            15, // baseRotate
            { top: 20, left: 90, width: 20 }, // Desktop
            { top: 25, left: 85, width: 28 }, // Tablet
            { top: 15, left: 85, width: 50 });
            return (<MotionImage src={member_card} height={400} width={300} loading="lazy" alt="White member card" style={style} {...getImageMotion(400, "150px", "-150px", -20, rotate)} // Animate from top-right
            />);
        })()}

      {/* Image 4: Middle right purple QR card */}


      {/* Image 5: Bottom left small purple card (Event name) */}
      {(() => {
            const { style, rotate } = getImageStyle(75, // baseTop
            28, // baseLeft
            18, // baseWidth
            -10, // baseRotate
            { top: 75, left: 10, width: 14, rotate: -10 }, // Desktop
            { top: 75, left: 10, width: 14, rotate: -10 }, // tab
            { top: 75, left: 25, width: 35, rotate: -10 });
            return (<MotionImage src={card2} loading="lazy" height={400} width={300} alt="Small purple event card" style={style} {...getImageMotion(800, "-150px", "150px", -15, rotate)} // Animate from bottom-left
            />);
        })()}

      {/* Image 6: Bottom middle-left small QR card (Placeholder for the one on the orange line) */}
      {(() => {
            const { style, rotate } = getImageStyle(85, // baseTop
            45, // baseLeft
            15, // baseWidth
            15, // baseRotate
            { top: 85, left: 30, width: 15, rotate: 15 }, // Desktop
            { top: 80, left: 55, width: 20, rotate: 15 }, // Tablet
            { top: 84, left: 34, width: 35, rotate: 15 });
            return (<MotionImage src={event_card} height={400} width={300} loading="lazy" alt="Small QR card on orange line" style={style} {...getImageMotion(1000, "0", "150px", 20, rotate)} // Animate from bottom
            />);
        })()}

      {/* Image 7: Bottom right phone (Login screen) */}
      {(() => {
            const { style, rotate } = getImageStyle(75, // baseTop
            80, // baseLeft
            18, // baseWidth
            0, // baseRotate
            { top: 85, left: 85, width: 18 }, // Desktop
            { top: 70, left: 75, width: 30 }, // Tablet
            { top: 90, left: 80, width: 25 });
            return (<MotionImage src={phone1} height={400} width={300} loading="lazy" alt="Phone showing login screen" style={style} {...getImageMotion(1200, "150px", "150px", -10, rotate)} // Animate from bottom-right
            />);
        })()}

      {/* Centered Download App Button */}
      <div className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center h-full w-full">
        <h2 className="titles mb-6 text-neutral-600 font-extrabold">
          S&T App
        </h2>

        <p className="leading-7 text-center max-w-sm md:max-w-xl mx-auto text-neutral-400 mb-6 text-sm">
          Skill&Tell App lets you stay connected. Explore all events, discover opportunities,
          and interact with members and leaders. Built to keep you updated, involved, and inspired.
          Join us, grow with us.
        </p>

        <button type="button" onClick={handleOpenPopup} className="botao pointer bg-accent-400 rounded-4xl">
          <span className=" flex justify-center gap-2 items-center text-center">
            <span className="">Download</span> <Image src="/icons/download.svg" height={40} width={30} className="" alt="" aria-hidden="true"/>
          </span>
        </button>
      </div>

      <PopUp isOpen={isPopupOpen} onClose={handleClosePopup} title={"The App"} subtitle={"Launching Soon. Stay Ready."} msg={"Something big is on the way. Get ready for a whole new experience!"}/>


    </section>);
}
