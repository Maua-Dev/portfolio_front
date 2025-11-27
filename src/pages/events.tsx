import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Cards from "../components/eventsCards";
export default function Events() {
  return (
    <div className="bg-coolWhite flex flex-col min-h-screen">
      <Navbar />
      <Cards />
      <Footer />
    </div>
  );
}
