import React from "react";
import Image from "next/image";
import separator from "@/assets/images/odyssea/separator.webp";

/** The Greek wave frieze with the three musician cats. */
function SeparatorSection() {
  return (
    /* the -1px lift makes this frieze overlap the parchment above it, so a
       fractional section height can never leave a dark hairline between them */
    <div className="relative -mt-px w-full overflow-hidden bg-ody-parchment-deep">
      <Image
        src={separator}
        alt="A frieze of classical cats playing music, framed by Greek wave borders"
        loading="lazy"
        className="block w-full select-none object-cover"
      />
    </div>
  );
}

export default React.memo(SeparatorSection);
