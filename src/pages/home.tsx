import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Project from "../components/project";

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Welcome to Our Portfolio</h1>
      <Project />
      <p>This is the home page.</p>
      <Footer />
    </div>
  );
}
