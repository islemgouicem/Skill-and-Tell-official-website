import MentorsCarousel from "../components/mentors_carousel";
export default function Mentors() {
    return (
    // Main mentors section
    <section id="juries" className="relative w-full flex flex-col overflow-hidden">

      {/* Section title */}
      <h2 className="title text-center mb-0">
        OUR JURIES
      </h2>

      <div className="relative flex-1 flex justify-center items-center">
        <MentorsCarousel />
      </div>

    </section>);
}
