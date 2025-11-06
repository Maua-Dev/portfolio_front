import Navbar from "../components/navbar";
import Footer from "../components/footer";
import NextEventCard from "../components/nextEventCard";
import EventHighlight from "../components/eventHighlight";

export default function Events() {
  return (
    <div className="bg-coolWhite flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center p-6 gap-4">
        <EventHighlight />
        <NextEventCard image="src/assets/eventplaceholder1.png" name="nome do evento" day={8} month="agosto" description="descrição do evento" place="local do evento" time="10h00"/>
      </div>
      <Footer />
    </div>
  );
}
