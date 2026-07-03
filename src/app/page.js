// app/page.jsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrendingSongs from "./components/TrendingSongs";
import LatestLaunches from "./components/LatestLaunches";
import ChannelHighlights from "./components/ChannelHighlights";
import ArtistSpotlight from "./components/ArtistSpotlight";
import Footer from "./components/Footer";
import HomeBackHandler from "./components/HomeBackHandler";
import LatestShorts from "./components/LatestShorts";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HomeBackHandler />
      <Navbar />
      <Hero />
      <TrendingSongs />
      <LatestLaunches />
      <LatestShorts />
      <ChannelHighlights />
      <ArtistSpotlight />
      <Footer />
    </main>
  );
}
