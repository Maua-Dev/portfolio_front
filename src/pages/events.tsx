import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Cards from "../components/eventsCards";
import NextEventCard from "../components/nextEventCard";
import EventHighlight from "../components/eventHighlight";

export default function Events() {
  return (
    <div className="bg-coolWhite flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center p-6 px-64 gap-8">
        <EventHighlight />
        <div className="flex flex-row justify-between w-full gap-16">
          <div className="flex flex-col gap-4 max-w-lg">
            <p>A Dev Community Mauá promove eventos ao longo do ano com o objetivo de proporcionar experiências práticas, aprendizado contínuo e conexão entre estudantes e entusiastas da tecnologia. Nossas iniciativas buscam desenvolver tanto habilidades técnicas quanto criativas, sempre alinhadas às demandas do mercado e à troca de conhecimento entre a comunidade. Além de palestras e encontros sobre temas relevantes, realizamos eventos próprios que incentivam a prática e a inovação. Entre eles, destacam-se o Battle Snake, o Dev In The Dark e o Design It Yourself, que já se consolidaram como tradições da entidade.</p>
            <p></p>
          </div>
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
      <Cards />
      <Footer />
    </div>
  );
}