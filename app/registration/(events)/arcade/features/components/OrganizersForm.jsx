import React from "react";
const OrganizersForm = () => {
    return (<div className="w-full flex justify-center mt-16 px-4">
      <div className="relative flex flex-col p-10 sm:p-14" style={{
            width: "1203px",
            minHeight: "540.81px",
            borderRadius: "50px",
            background: "#FF00000D",
            border: "1px solid #8C1414",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            boxShadow: "0px 0px 20px 0px rgba(255, 114, 114, 0.4) inset",
        }}>
        <svg className="absolute -top-[6px] -right-[6px] pointer-events-none" width="300" height="200" viewBox="0 0 300 200" fill="none" style={{
            filter: "drop-shadow(0 0 6px rgba(255, 0, 0, 0.9)) blur(0.5px)",
        }}>
          <path d="M 160,6 L 244,6 A 50,50 0 0 1 294,56 L 294,96" stroke="#FF1010" strokeWidth="10" strokeLinecap="round"/>
        </svg>

        <svg className="absolute -bottom-[6px] -left-[6px] pointer-events-none" width="300" height="200" viewBox="0 0 300 200" fill="none" style={{
            filter: "drop-shadow(0 0 6px rgba(255, 0, 0, 0.9)) blur(0.5px)",
        }}>
          <path d="M 6,104 L 6,144 A 50,50 0 0 0 56,194 L 140,194" stroke="#FF1010" strokeWidth="10" strokeLinecap="round"/>
        </svg>

        <div className="flex flex-col mb-12">
          <div className="flex items-end gap-5 mb-1">
            <img src="/images/arcade/personal_information.svg" alt="Personal Information" className="w-12 h-12"/>
            <h2 className="text-white m-0 tracking-wider" style={{
            fontFamily: "compacta, sans-serif",
            fontSize: "40px",
            fontWeight: 400,
            fontStyle: "normal",
            lineHeight: "100%",
            letterSpacing: "0.05em",
            leadingTrim: "none",
        }}>
              Personal Information
            </h2>
          </div>

          <div className="w-full" style={{
            height: "3px",
            background: "linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)",
            clipPath: "polygon(0 0, 100% 40%, 100% 60%, 0 100%)",
            marginTop: "8px",
        }}/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 w-full flex-grow">
          <div className="flex flex-col gap-3">
            <label className="text-white text-xl" style={{ fontFamily: "futura, sans-serif" }}>
              Your Name
            </label>
            <input type="text" placeholder="Enter your full Name" className="w-full bg-transparent border border-white/30 text-white placeholder-white/50 px-6 py-4 outline-none focus:border-white/70 transition-colors" style={{
            borderRadius: "9999px",
            fontFamily: "futura, sans-serif",
            fontSize: "16px",
        }}/>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-white text-xl" style={{ fontFamily: "futura, sans-serif" }}>
              Your school
            </label>
            <input type="text" placeholder="Enter your school name" className="w-full bg-transparent border border-white/30 text-white placeholder-white/50 px-6 py-4 outline-none focus:border-white/70 transition-colors" style={{
            borderRadius: "9999px",
            fontFamily: "futura, sans-serif",
            fontSize: "16px",
        }}/>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-white text-xl" style={{ fontFamily: "futura, sans-serif" }}>
              Your email
            </label>
            <input type="email" placeholder="example@gmail.com" className="w-full bg-transparent border border-white/30 text-white placeholder-white/50 px-6 py-4 outline-none focus:border-white/70 transition-colors" style={{
            borderRadius: "9999px",
            fontFamily: "futura, sans-serif",
            fontSize: "16px",
        }}/>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-white text-xl" style={{ fontFamily: "futura, sans-serif" }}>
              Your phone number
            </label>
            <input type="tel" placeholder="Enter your phone Number" className="w-full bg-transparent border border-white/30 text-white placeholder-white/50 px-6 py-4 outline-none focus:border-white/70 transition-colors" style={{
            borderRadius: "9999px",
            fontFamily: "futura, sans-serif",
            fontSize: "16px",
        }}/>
          </div>
        </div>
      </div>
    </div>);
};
export default OrganizersForm;
