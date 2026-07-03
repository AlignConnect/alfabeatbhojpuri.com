"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoPlay } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";

const TrendingSongs = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/alfabeat/songs?limit=20`,
          {
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
            },
          },
        );

        console.log(process.env.NEXT_PUBLIC_API_URL);

        const data = await res.json();

        if (data.success) {
          setTrendingSongs(data.songs);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-black text-center">
        <h2 className="text-white text-xl">Loading...</h2>
      </section>
    );
  }

  return (
    <section id="trending" className="pb-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">
              Trending Now
            </span>

            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              Most Popular <span className="text-red-500">Bhojpuri Songs</span>
            </h2>

            <p className="text-gray-400 mt-2 max-w-2xl">
              Check out the hottest trending Bhojpuri songs that everyone is
              talking about.
            </p>
          </div>

          <Link
            href="https://www.youtube.com/@alfabeatbhojpuri"
            target="_blank"
            className="mt-4 md:mt-0 text-red-500 hover:text-red-400 font-semibold flex items-center gap-1"
          >
            View All <span className="text-xl">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {trendingSongs.map((song, index) => (
            <Link
              key={song.video_id}
              href={`/song/${song.video_id}`}
              className="group bg-black/40 rounded-xl overflow-hidden border border-red-600/10 hover:border-red-600/30 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/10"
              onMouseEnter={() => setHoveredId(song.video_id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative w-full aspect-video overflow-hidden bg-black">
                <img
                  src={song.thumbnail}
                  alt={song.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-red-600 text-white p-4 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-300">
                    <IoPlay className="h-8 w-8" />
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {hoveredId === song.video_id ? "▶ Play" : song.duration}
                </div>

                {index < 3 && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    🔥 #{index + 1}
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-sm sm:text-base line-clamp-2 text-gray-100 group-hover:text-white mb-2">
                  {song.title}
                </h3>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center">
                    <FaYoutube className="text-red-500 text-sm" />
                  </div>

                  <span className="text-xs text-gray-400">
                    Alfa Beat Bhojpuri
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSongs;
