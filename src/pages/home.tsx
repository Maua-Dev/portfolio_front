import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Project from "../components/project";

const project = {
  id: "1",
  title: "Project 1",
  description: "Description for Project 1",
  image: "/path/to/image1.jpg",
  cellImage: "/path/to/cellImage1.jpg",
  frontend: "React",
  backend: "Node.js",
};

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Welcome to Our Portfolio</h1>
      <Project project={project} side={"left"} />
      <p>This is the home page.</p>
      <Footer />
    </div>
  );
}
