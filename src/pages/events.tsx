import Footer from "../components/footerMobile";
import Navbar from "../components/navbarMobile";
import Cards from "../components/eventsCards";
import NextEventCard from "../components/nextEventCard";
import EventHighlight from "../components/eventHighlight";

export default function Events() {
  return (
    <div className="bg-coolWhite flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center p-4 sm:p-6 md:px-16 lg:px-32 xl:px-48 gap-6 sm:gap-8">
        <EventHighlight />
        <div className="flex flex-col lg:flex-row justify-between w-full gap-8 lg:gap-16">
          <div className="flex flex-col gap-4 max-w-full lg:max-w-lg text-sm sm:text-base">
            <p>A Dev Community Mauá promove eventos ao longo do ano com o objetivo de proporcionar experiências práticas, aprendizado contínuo e conexão entre estudantes e entusiastas da tecnologia. Nossas iniciativas buscam desenvolver tanto habilidades técnicas quanto criativas, sempre alinhadas às demandas do mercado e à troca de conhecimento entre a comunidade. Além de palestras e encontros sobre temas relevantes, realizamos eventos próprios que incentivam a prática e a inovação. Entre eles, destacam-se o Battle Snake, o Dev In The Dark e o Design It Yourself, que já se consolidaram como tradições da entidade.</p>
          </div>
          <div className="w-full lg:w-auto lg:shrink-0 lg:basis-[380px]">
            <NextEventCard
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
      <Footer />
    </div>
  );
}