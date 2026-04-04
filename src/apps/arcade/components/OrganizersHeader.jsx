import React from "react";

const OrganizersHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-[44px]">
      <h1
        className="text-center text-white m-0"
        style={{
          fontFamily: "compacta, sans-serif",
          fontSize: "58px",
          fontWeight: 400,
          fontStyle: "normal",
          lineHeight: "100%",
          letterSpacing: "0.1em",
          textAlign: "center",
          textEdge: "cap alphabetic",
          leadingTrim: "none",
        }}
      >
        Welcome to{" "}
        <span
          style={{
            color: "#FF0000",
            fontFamily: "futura, sans-serif",
            fontSize: "75px",
            fontWeight: 400,
            fontStyle: "normal",
            lineHeight: "100%",
            letterSpacing: "0em",
            leadingTrim: "none",
            textShadow:
              "0 0 10px rgba(255, 0, 0, 0.8), 0 0 20px rgba(255, 0, 0, 0.4)",
          }}
        >
          Arcade
        </span>
        <br />
        Registrations
      </h1>

      <div
        className="border-t border-white"
        style={{
          width: "1159px",
          maxWidth: "90vw",
          height: "0px",
          opacity: 1,
          borderWidth: "1px",
          marginTop: "20px",
        }}
      />
    </div>
  );
};

export default OrganizersHeader;
