"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoPlay, IoTimeOutline, IoCalendarOutline } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";

const LatestShorts = () => {
  const [shortsData, setShortsData] = useState([]);

  useEffect(() => {
    const getLatestShorts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/alfabeat/shorts?page=1&limit=15`,
          {
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
            },
          }
        );

        const data = await res.json();

        if (data.success) {
          setShortsData(data.shorts || data.songs || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getLatestShorts();
  }, []);

  return (
    <section id="shorts" className="py-20 bg-gradient-to-b from-black to-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">
              Short Videos
            </span>

            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              <span className="text-red-500">Shorts</span> Collection
            </h2>

            <p className="text-gray-400 mt-2 max-w-2xl">
              Quick, engaging, and trending Bhojpuri short videos for your entertainment.
            </p>
          </div>

          <Link
            href="https://www.youtube.com/@alfabeatbhojpuri/shorts"
            target="_blank"
            className="mt-4 md:mt-0 text-red-500 hover:text-red-400 font-semibold flex items-center gap-1"
          >
            View All →
          </Link>
        </div>

        {/* Shorts Grid - Portrait/Vertical format */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {shortsData.map((short, index) => (
            <Link
              key={short.videoId || short.video_id || index}
              href={`/shorts/${short.videoId || short.video_id}`}
              className="group relative bg-gradient-to-br from-red-950/20 to-black border border-red-600/20 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/10"
            >
              <div className="relative aspect-[9/16] overflow-hidden bg-black">
                {/* Thumbnail - Portrait mode */}
                <img
                  src={short.thumbnail}
                  alt={short.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay with play button */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <div className="bg-red-600 text-white p-3 md:p-4 rounded-full scale-0 group-hover:scale-100 transition-all duration-300">
                    <IoPlay className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                </div>

                {/* NEW Badge */}
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] md:text-xs px-2 py-0.5 rounded-full">
                  NEW
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] md:text-xs px-2 py-0.5 rounded flex items-center gap-1">
                  <IoTimeOutline className="h-3 w-3" />
                  {short.duration || "0:30"}
                </div>

                {/* Views Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] md:text-xs px-2 py-0.5 rounded flex items-center gap-1">
                  <IoCalendarOutline className="h-3 w-3" />
                  {Number(short.viewCount || 0).toLocaleString()}
                </div>

                {/* Vertical gradient at bottom for text readability */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent"></div>

                {/* Title at bottom of thumbnail */}
                <div className="absolute bottom-8 left-2 right-2">
                  <h3 className="text-white text-[10px] md:text-xs font-medium line-clamp-2 drop-shadow-lg">
                    {short.title}
                  </h3>
                </div>
              </div>

              {/* Channel info - below thumbnail */}
              <div className="p-2 md:p-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0">
                    <FaYoutube className="h-2.5 w-2.5 text-red-500" />
                  </div>
                  <span className="text-[10px] md:text-xs text-gray-400 truncate">
                    Alfa Beat Bhojpuri
                  </span>
                </div>

                {/* View all button - appears on hover */}
                <div className="mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-red-500 text-[10px] md:text-xs font-semibold flex items-center gap-1">
                    <IoPlay className="h-3 w-3" />
                    Watch Short
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {shortsData.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl text-gray-300 mb-2">No Shorts Available</h3>
            <p className="text-gray-500">Check back later for new shorts!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestShorts;