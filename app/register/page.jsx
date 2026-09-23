"use client";
import PopUp from "./features/components/PopUp";
import { useState } from "react";

function Layout(){

  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <main>

      <PopUp isOpen={isPopupOpen}
        onClose={handleClosePopup}
        color={"bg-Main-500"}
        title={"Registration Closed"}
        subtitle={"Not yet Open for This Season...."}
        msg={"Registration for this season hasn't open yet, but great things are ahead! Keep an eye out — we'll be opening with fresh opportunities this season."} />
    </main>
  );
}
export default Layout
