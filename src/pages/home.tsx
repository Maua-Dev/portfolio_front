import Footer from "../components/footer";
import HomeHero from "../components/homeHero";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div className="bg-coolWhite flex flex-col min-h-screen">
      <Navbar />
      <HomeHero />
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1>Welcome to Our Portfolio</h1>
        <p>This is the home page.</p>
      </main>
      <Footer />
    </div>
  );
}
