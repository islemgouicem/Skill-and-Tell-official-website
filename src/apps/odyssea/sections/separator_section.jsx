import React from "react";
import separator from "../../../assets/images/odyssea/separator.webp";

/** The Greek wave frieze with the three musician cats. */
function SeparatorSection() {
  return (
    <div className="relative w-full overflow-hidden bg-ody-parchment-deep">
      <img
        src={separator}
        alt="A frieze of classical cats playing music, framed by Greek wave borders"
        loading="lazy"
        className="block w-full select-none object-cover"
      />
    </div>
  );
}

export default React.memo(SeparatorSection);
