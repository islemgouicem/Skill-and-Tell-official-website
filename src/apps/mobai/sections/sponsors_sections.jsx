import { useState } from "react";
import AlgerieTelecom from "../../../assets/images/mobai/Logo_Algérie_Telecom.png";
import AlgeriePoste from "../../../assets/images/mobai/logo_AlgeriePoste.png";
import Djezzy from "../../../assets/images/mobai/Logo_Djezzy_2015.png";
import Mobilis from "../../../assets/images/mobai/logo_mobilis.png";
import Ooredoo from "../../../assets/images/mobai/logo_ooredoo.png";

export default function Sponsors() {
  const sponsors = [
    { logo: AlgerieTelecom, link: "https://www.algerietelecom.dz" },
    { logo: Mobilis, link: "https://www.mobilis.dz" },
    { logo: AlgeriePoste, link: "https://www.poste.dz" },
    { logo: Djezzy, link: "https://www.djezzy.dz" },
    { logo: Ooredoo, link: "https://www.ooredoo.dz" },
  ];

  return (
    <section
      id="sponsors"
      className="relative w-full pt-[80px] min-h-screen overflow-hidden flex"
    >
      {/* Title */}
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-red-title tracking-wider mb-12">
        OUR SPONSORS
      </h2>

      {/* Logos Row */}

      <div className="flex flex-wrap justify-center items-center gap-8 w-full max-w-6xl">
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
