// components/TrendingSongs.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoPlay } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { allSongsData } from "@/app/data/songsData";

const TrendingSongs = () => {
  const [hoveredId, setHoveredId] = useState(null);

  // Filter trending songs
  const trendingSongs = allSongsData.filter(
    (song) => song.category === "trending",
  );

  return (
    <section id="trending" className="py-20 bg-black">
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {trendingSongs.map((song, index) => (
            <Link
              key={song.id}
              href={`/song/${song.slug}`}
              className="group bg-black/40 rounded-xl overflow-hidden border border-red-600/10 hover:border-red-600/30 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/10 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredId(song.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-video overflow-hidden bg-black">
                <img
                  src={song.thumbnail}
                  alt={song.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                  decoding="async"
                />

                {/* YouTube Play Button Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-red-600 text-white p-4 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-300 hover:bg-red-700 shadow-2xl">
                    <IoPlay className="h-8 w-8" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {hoveredId === song.id ? "▶ Play" : "Watch"}
                </div>

                {/* Top Badge */}
                {index < 3 && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <span>🔥</span> #{index + 1}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-sm sm:text-base line-clamp-2 text-gray-100 group-hover:text-white transition-colors mb-2">
                  {song.title}
                </h3>

                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0">
                    <FaYoutube className="h-3 w-3 text-red-500" />
                  </div>
                  <span className="text-xs text-gray-400 hover:text-white transition-colors">
                    {song.channel}
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
