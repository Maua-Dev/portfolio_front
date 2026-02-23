import FooterMobile from "../components/footerMobile";
import NavbarMobile from "../components/navbarMobile";
import Cards from "../components/eventsCards";
import NextEventCardMobile from "../components/nextEventCard";
import EventHighlightMobile from "../components/eventHighlightMobile";

export default function EventsMobile() {
  return (
    <div className="bg-coolWhite flex flex-col min-h-screen">
      <NavbarMobile />
      <div className="flex flex-col justify-center items-center p-4 sm:p-6 gap-8 w-full max-w-7xl mx-auto">
        
        <EventHighlightMobile />
        <div className="flex flex-col md:flex-row gap-8 w-full">
          <div className="flex flex-col gap-4 md:w-1/2">
            <p>primeiro parágrafo</p>
            <p>segundo parágrafo</p>
          </div>
          <div className="w-full md:w-1/2">
            <NextEventCardMobile
              image="src/assets/eventplaceholder1.png"
              name="nome do evento"
              day={8}
              month="agosto"
              description="descrição do evento"
              place="local do evento"
              time="10h00"
            />
          </div>
        </div>
      </div>
      <Cards />
      <FooterMobile />
    </div>
  );
}