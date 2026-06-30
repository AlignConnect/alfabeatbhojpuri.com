import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrendingSongs from './components/TrendingSongs';
import LatestLaunches from './components/LatestLaunches';
import ChannelHighlights from './components/ChannelHighlights';
import ArtistSpotlight from './components/ArtistSpotlight';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <TrendingSongs />
      <LatestLaunches />
      <ChannelHighlights />
      <ArtistSpotlight />
      <Footer />
    </main>
  );
}