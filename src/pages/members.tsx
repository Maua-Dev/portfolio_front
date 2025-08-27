import Footer from "../components/footer";
import InfoComponent from "../components/infoComponent";
import Navbar from "../components/navbar";
import InfoComponentImages from "../components/infoComponentElements/infoComponentImages";

import membersImage1 from "../assets/membersImage1.png";
import membersImage2 from "../assets/membersImage2.png";

const images = [
  { src: membersImage1, alt: "Membros da dev" },
  { src: membersImage2, alt: "Membros da dev" }
];

export default function Projects() {
  return (
    <div className="bg-coolWhite flex flex-col min-h-screen">
      <Navbar />
      <div className="p-6">
        <main className="flex-grow flex flex-row items-center justify-center gap-24">
        <div className="flex flex-col">
          <InfoComponent title="Membros" description="Conheça os membros da Dev Community! Eles fazem tudo acontecer, colaborando e inovando juntos."/>
          
        </div>
        <InfoComponentImages quantity={2} images={images}/>
      </main>
      </div>
      <Footer />
    </div>
  );
}
