import React from "react";
const CustomRadio = ({ label, checked, name }) => (<label className="flex items-center gap-2 cursor-pointer">
    <input type="radio" name={name} className="hidden" defaultChecked={checked}/>
    <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-colors ${checked ? "border-[#00D859]" : "border-white"}`}>
      {checked && <div className="w-2.5 h-2.5 rounded-full bg-[#00D859]"/>}
    </div>
    <span className="text-white" style={{ fontFamily: "futura, sans-serif", fontSize: "16px" }}>
      {label}
    </span>
  </label>);
const CustomCheckbox = ({ label, checked }) => (<label className="flex items-center gap-3 cursor-pointer">
    <span className="text-white" style={{ fontFamily: "futura, sans-serif", fontSize: "16px" }}>
      {label}
    </span>
    <div className={`w-[18px] h-[18px] border-2 flex items-center justify-center transition-colors ${checked ? "border-[#00D859]" : "border-white/80"}`}>
      {checked && (<svg width="12" height="10" viewBox="0 0 12 10" fill="none">
          <path d="M1 5L4.5 8.5L11 1.5" stroke="#00D859" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>)}
    </div>
  </label>);
const OrganizersRegistrationForm = () => {
    return (<div className="w-full flex justify-center mt-12 px-4">
      <div className="relative flex flex-col p-10 sm:p-14" style={{
            width: "1203px",
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

        <div className="flex flex-col mb-16">
          <div className="flex items-end gap-5 mb-1">
            <img src="/images/arcade/personal_information.svg" alt="Organizers Registration" className="w-12 h-12"/>
            <h2 className="text-white m-0 tracking-wider" style={{
            fontFamily: "compacta, sans-serif",
            fontSize: "40px",
            fontWeight: 400,
            fontStyle: "normal",
            lineHeight: "100%",
            letterSpacing: "0.05em",
            leadingTrim: "none",
        }}>
              Organizers registration
            </h2>
          </div>
          <div className="w-full" style={{
            height: "3px",
            background: "linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)",
            clipPath: "polygon(0 0, 100% 40%, 100% 60%, 0 100%)",
            marginTop: "8px",
        }}/>
        </div>

        <div className="flex flex-col gap-10 w-full z-10 relative">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <label className="text-white text-xl" style={{ fontFamily: "futura, sans-serif" }}>
              Are you a member ?
            </label>
            <div className="flex flex-wrap items-center gap-8 bg-[#ffffff05] border border-white/30 px-8 py-3 rounded-full">
              <CustomRadio label="Yes" checked={true} name="member"/>
              <CustomRadio label="No" checked={false} name="member"/>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <label className="text-white text-xl" style={{ fontFamily: "futura, sans-serif" }}>
              Are you available in the days of the event ?
            </label>
            <div className="flex flex-wrap items-center gap-8 bg-[#ffffff05] border border-white/30 px-8 py-3 rounded-full">
              <CustomCheckbox label="25 Avril" checked={true}/>
              <CustomCheckbox label="26 Avril" checked={false}/>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <label className="text-white text-xl" style={{ fontFamily: "futura, sans-serif" }}>
              Are you available for the pre organization meet ?
            </label>
            <div className="flex flex-wrap items-center gap-8 bg-[#ffffff05] border border-white/30 px-8 py-3 rounded-full">
              <CustomRadio label="Yes" checked={true} name="premeet"/>
              <CustomRadio label="No" checked={false} name="premeet"/>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <label className="text-white text-xl" style={{ fontFamily: "futura, sans-serif" }}>
              Do you have previous experience ?
            </label>
            <div className="flex flex-wrap items-center gap-8 bg-[#ffffff05] border border-white/30 px-8 py-3 rounded-full">
              <CustomRadio label="Yes" checked={true} name="experience"/>
              <CustomRadio label="No" checked={false} name="experience"/>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-white text-xl" style={{ fontFamily: "futura, sans-serif" }}>
              Describe your experience :
            </label>
            <textarea placeholder="Write here .." className="w-full bg-[#ffffff03] border border-white/30 text-white placeholder-white/50 px-6 py-5 outline-none focus:border-white/70 transition-colors resize-none" style={{
            borderRadius: "30px",
            fontFamily: "futura, sans-serif",
            fontSize: "16px",
            minHeight: "140px",
        }}></textarea>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <label className="text-white text-xl" style={{ fontFamily: "futura, sans-serif" }}>
              Select your role :
            </label>
            <div className="flex flex-wrap items-center gap-8 bg-[#ffffff05] border border-white/30 px-8 py-3 rounded-full">
              <CustomRadio label="Logistics" checked={true} name="role"/>
              <CustomRadio label="Media" checked={false} name="role"/>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-white text-xl" style={{ fontFamily: "futura, sans-serif" }}>
              Which shift suits you best ?
            </label>
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#ffffff05] border border-white/30 px-6 sm:px-12 py-4 rounded-full w-full">
              <CustomCheckbox label="24 April morning" checked={true}/>
              <CustomCheckbox label="24 April afternoon" checked={false}/>
              <CustomCheckbox label="25 April morning" checked={false}/>
              <CustomCheckbox label="25 April afternoon" checked={false}/>
            </div>
          </div>

          <div className="flex justify-center w-full mt-12 mb-4">
            <button className="px-14 py-4 rounded-[40px] text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,0,0.6)]" style={{
            fontFamily: "compacta, sans-serif",
            fontSize: "32px",
            lineHeight: "100%",
            background: "radial-gradient(ellipse at center, rgba(160,20,20,0.6) 0%, rgba(20,0,0,0.8) 100%)",
            border: "1px solid #8C1414",
            boxShadow: "0px 0px 15px 0px rgba(255, 0, 0, 0.3)",
            letterSpacing: "0.05em",
        }}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>);
};
export default OrganizersRegistrationForm;
