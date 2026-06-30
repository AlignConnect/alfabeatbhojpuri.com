import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const artists = [
  {
    name: "Kajal Raghwani",
    role: "Bhojpuri actress",
    image: "/api/placeholder/200/200",
    songs: ["Chhalakata Hamro Jawaniya", "Sarso Ke Sagiya", "Jable Jagal Bani"],
  },
  {
    name: "Shilpi Raj",
    role: "Singer",
    image: "/api/placeholder/200/200",
    songs: ["Mangjarani", "Holiya Mein Udey", "Naiharwa"],
  },
  {
    name: "Sonu Sargam Yadav",
    role: "Singer & Composer",
    image: "/api/placeholder/200/200",
    songs: ["Dil Khoichha Me Le Ja", "Saans Up Down Hot Ba", "Bewafai Geet"],
  },
  {
    name: "Srishti Bharti",
    role: "Featured Artist",
    image: "/api/placeholder/200/200",
    songs: ["Dil Khoichha Me Le Ja", "Mangjarani"],
  },
  {
    name: "Vijay Chauhan",
    role: "Featured Artist",
    image: "/api/placeholder/200/200",
    songs: ["Mangjarani"],
  },
];

const ArtistSpotlight = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-t from-black to-red-950/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">
            Featured Artists
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            Meet the <span className="text-red-500">Stars</span>
          </h2>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            Discover the talented artists behind the biggest Bhojpuri hits on
            Alfa Beat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {artists.map((artist, index) => (
            <div
              key={artist.name}
              className="bg-black/40 backdrop-blur-sm border border-red-600/10 rounded-xl p-6 text-center hover:border-red-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-600/5 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-600 to-red-800 p-1 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center">
                  <FaUser className="h-16 w-16 text-gray-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">{artist.name}</h3>
              <p className="text-red-400 text-sm mb-3">{artist.role}</p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {artist.songs.map((song) => (
                  <span
                    key={song}
                    className="bg-red-600/10 text-red-300 text-xs px-2 py-1 rounded-full"
                  >
                    {song}
                  </span>
                ))}
              </div>
              <Link
                href="#"
                className="text-gray-400 hover:text-white text-sm flex items-center justify-center gap-1 transition-colors"
              >
                View Profile <FiExternalLink className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistSpotlight;
