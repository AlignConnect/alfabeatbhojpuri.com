// components/LatestLaunches.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { IoPlay } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { allSongsData } from "@/app/data/songsData";

const LatestLaunches = () => {
  const [hoveredId, setHoveredId] = useState(null);
  
  // Filter launch songs
  const launchesData = allSongsData.filter(song => song.category === "launch");

  return (
    <section id="latest" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Latest Releases</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              New <span className="text-red-500">Launches</span>
            </h2>
            <p className="text-gray-400 mt-2 max-w-2xl">
              Be the first to experience the newest Bhojpuri music videos and songs.
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

        {/* 2 Grid on Desktop, 1 Grid on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {launchesData.map((launch, index) => (
            <Link
              key={launch.id}
              href={`/song/${launch.slug}`}
              className="group bg-gradient-to-br from-red-950/20 to-black border border-red-600/20 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/10 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredId(launch.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={launch.thumbnail}
                  alt={launch.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="eager"
                  decoding="async"
                />
                
                {/* Play Button Overlay - No default blur */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-red-600 text-white p-4 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-300 hover:bg-red-700 shadow-2xl">
                    <IoPlay className="h-8 w-8" />
                  </div>
                </div>

                {/* Date Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className={`text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 ${
                    launch.date === "Coming Soon" ? "bg-yellow-600" : 
                    launch.date === "Latest Launch" ? "bg-green-600" : 
                    "bg-red-600"
                  }`}>
                    <IoCalendarOutline className="h-3 w-3" /> {launch.date}
                  </span>
                </div>

                {/* Views Badge */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <IoTimeOutline className="h-3 w-3" /> {launch.views} views
                </div>

                {/* New Badge */}
                {launch.date === "Latest Launch" && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    NEW
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                  {launch.title}
                </h3>

                {/* Channel Name */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0">
                    <FaYoutube className="h-3 w-3 text-red-500" />
                  </div>
                  <span className="text-xs text-gray-400 hover:text-white transition-colors">
                    {launch.channel}
                  </span>
                </div>

                {/* Watch Now Button */}
                <div className="mt-3 inline-flex items-center gap-2 text-red-500 group-hover:text-red-400 text-sm font-semibold transition-colors">
                  <IoPlay className="h-4 w-4" /> Watch Now
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestLaunches;