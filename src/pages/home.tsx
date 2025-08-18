import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div className="bg-coolWhite flex flex-col justify-between items-center min-h-[100vh]">
      <Navbar />
      <h1>Welcome to Our Portfolio</h1>
      <p>This is the home page.</p>
      <Footer />
    </div>
  );
}
