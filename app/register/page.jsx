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
        subtitle={"Closed for This Season"}
        msg={"Registration for this season has closed, but great things are ahead! Keep an eye out — we'll be opening again with fresh opportunities next season."} />
    </main>
  );
}
export default Layout
