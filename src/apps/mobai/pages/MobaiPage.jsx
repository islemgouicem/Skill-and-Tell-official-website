
import "../../../styles/mobai.css"
import HeroSection from "../sections/hero_section"
import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"
export default function MobAI() {
    return (
        <main
            className="
                relative w-full min-h-screen bg-[hsl(274,87%,24%)] overflow-hidden
                bg-[url('/images/stars.svg')]
                bg-repeat-[repeat-y]
                bg-[length:auto]
                bg-[position:top_left]
            "
        >

            <Navbar />

            {/* content */}
            <HeroSection />

            {/* <Organizers /> */}

            <Footer />
        </main>
    )
}
