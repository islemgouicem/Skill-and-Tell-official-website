import { useState } from "react";
import snt from "/images/logo.png"
import AlgerieTelecom from "../../../assets/images/mobai/Logo_Algérie_Télécom.png";
import AlgeriePoste from "../../../assets/images/mobai/logo_AlgeriePoste.png";
import Djezzy from "../../../assets/images/mobai/Logo_Djezzy_2015.png";
import Mobilis from "../../../assets/images/mobai/logo_mobilis.png";
import Ooredoo from "../../../assets/images/mobai/logo_ooredoo.png";

export default function Sponsors() {
  const sponsors = [
    { logo: snt, link: "#" },
    { logo: snt, link: "#" },
    { logo: snt, link: "#" },
    // { logo: Djezzy, link: "https://www.djezzy.dz" },
    // { logo: Ooredoo, link: "https://www.ooredoo.dz" },
  ];

  return (
    <section
      id="sponsors"
      className="relative w-full my-20 flex flex-col items-center justify-center"
    >
      {/* Title */}
      <h2 className="title">
        OUR SPONSORS
      </h2>

      {/* Logos Row */}

      <div className="flex flex-wrap justify-center sm:justify-evenly items-center w-full max-w-6xl gap-16">
        {sponsors.map((sponsor, index) => (
          <a
            key={index}
            href={sponsor.link}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <img
              src={sponsor.logo}
              alt={`Sponsor ${index + 1}`}
              className="h-16 md:h-20 lg:h-24 object-contain"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
