import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Project from "../components/project";

const project = {
  id: "1",
  title: "Project 1",
  description: "Description for Project 1",
  image: "../assets/image1.jpg",
  cellImage: "../assets/cellImage1.jpg",
  frontend: "React",
  backend: "Node.js",
  color: "#ff0000",
};
const project2 = {
  id: "2",
  title: "Project 2",
  description: "Description for Project 2",
  image: "../assets/image2.jpg",
  cellImage: "../assets/cellImage2.jpg",
  frontend: "React",
  backend: "Node.js",
  color: "#0000ff",
};

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Welcome to Our Portfolio</h1>
      <Project project={project} side={"left"} />
      <Project project={project2} side={"right"} />
      <p>This is the home page.</p>
      <Footer />
    </div>
  );
}
