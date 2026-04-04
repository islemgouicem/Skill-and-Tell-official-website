import React from "react";
import OrganizersHeader from "../../components/OrganizersHeader";
import OrganizersForm from "../../components/OrganizersForm";
import OrganizersRegistrationForm from "../../components/OrganizersRegistrationForm";

const OrganizersRegPage = () => {
  return (
    <div className="min-h-screen bg-black w-full overflow-x-hidden font-sans pb-20 relative">
      <style>{`
        ::-webkit-scrollbar { display: none !important; }
        * { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      `}</style>

      <div className="w-full max-w-[1440px] h-0 relative mx-auto pointer-events-none z-0">
        <img
          src="/images/arcade/registeration_1.png"
          alt="Claw Slashes"
          className="absolute"
          style={{
            width: "411px",
            height: "441px",
            top: "275px",
            left: "1px",
            opacity: 1,
          }}
        />
        <img
          src="/images/arcade/reg_2.png"
          alt="Hand"
          className="absolute"
          style={{
            width: "244px",
            height: "433.34px",
            top: "1855px",
            left: "1045px",
            opacity: 1,
          }}
        />
      </div>

      <div className="relative z-10 w-full">
        <OrganizersHeader />
        <OrganizersForm />
        <OrganizersRegistrationForm />
      </div>
    </div>
  );
};

export default OrganizersRegPage;
