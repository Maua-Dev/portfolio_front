import Footer from "../components/footer";
import HomeHero from "../components/homeHero";
import Navbar from "../components/navbar";
import HomeProjetos from "../components/homeProject";
import Membros from "../components/homeMembers";
import cell2 from "../assets/cellImage2.png";
import img2 from "../assets/image2.png";
import Eventos from "../components/homeEvents";

const projetoMock = {
  id: "1",
  title: "Project 2",
  description:
    "Dev Médias é um aplicativo para ajudar e facilitar a vida dos estudantes na hora de calcular a média final em cada semestre.",
  image: img2,
  cellImage: cell2,
  frontend: "React",
  backend: "Node.js",
  color: "#0080F591",
};

export default function Home() {
  return (
    <div className="bg-coolWhite flex flex-col min-h-screen">
      <Navbar />
      <HomeHero />
      <HomeProjetos project={projetoMock} side="right" />
      <Membros />
      <Eventos />
      <Footer />
    </div>
  );
}
