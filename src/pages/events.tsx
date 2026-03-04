import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Cards from "../components/eventsCards";
import NextEventCard from "../components/nextEventCard";
import EventHighlight from "../components/eventHighlight";
import eventPlaceholder1 from "../assets/eventplaceholder1.png";

export default function Events() {
  return (
    <div className="bg-coolWhite flex flex-col min-h-screen">
      <Navbar />
      <Cards />

      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pb-12 sm:pb-16">
        <div className="flex flex-col justify-center items-center gap-8 sm:gap-10">
          <EventHighlight />

          <div className="w-full flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-16">
            <div className="w-full lg:max-w-xl flex flex-col gap-3 sm:gap-4 text-sm sm:text-base text-gray-700">
              <p>primeiro paragrafo</p>
              <p>segundo paragrafo</p>
            </div>

            <div className="w-full lg:max-w-lg">
              <NextEventCard
                image={eventPlaceholder1}
                name="nome do evento"
                day={8}
                month="agosto"
                description="descricao do evento"
                place="local do evento"
                time="10h00"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
