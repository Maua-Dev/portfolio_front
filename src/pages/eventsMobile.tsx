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
            <p>A Dev Community Mauá promove eventos ao longo do ano com o objetivo de proporcionar experiências práticas, aprendizado contínuo e conexão entre estudantes e entusiastas da tecnologia. Nossas iniciativas buscam desenvolver tanto habilidades técnicas quanto criativas, sempre alinhadas às demandas do mercado e à troca de conhecimento entre a comunidade. Além de palestras e encontros sobre temas relevantes, realizamos eventos próprios que incentivam a prática e a inovação. Entre eles, destacam-se o Battle Snake, o Dev In The Dark e o Design It Yourself, que já se consolidaram como tradições da entidade.</p>
            <p></p>
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