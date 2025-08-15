import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Project from "../components/project";
import cell1 from "../assets/cellImage1.png";
import img1 from "../assets/image1.png";
import cell2 from "../assets/cellImage2.png";
import img2 from "../assets/image2.png";

const project = {
  id: "1",
  title: "Project 1",
  description:
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem lorem lorem lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  image: img1,
  cellImage: cell1,
  frontend: "React",
  backend: "Node.js",
  color: "#AE0404E5",
};
const project2 = {
  id: "2",
  title: "Project 2",
  description:
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem lorem lorem lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  image: img2,
  cellImage: cell2,
  frontend: "React",
  backend: "Node.js",
  color: "#0080F591",
};

export default function Home() {
  return (
    <div className="bg-coolWhite">
      <Navbar />
      <h1>Welcome to Our Portfolio</h1>
      <Project project={project} side={"left"} />
      <Project project={project2} side={"right"} />
      <p>This is the home page.</p>
      <Footer />
    </div>
  );
}
