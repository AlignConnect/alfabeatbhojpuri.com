"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoPlay, IoTimeOutline, IoCalendarOutline } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";

const LatestLaunches = () => {
  const [launchesData, setLaunchesData] = useState([]);

  useEffect(() => {
    const getLatestSongs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/alfabeat/songs?page=1&limit=4`,
          {
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
            },
          },
        );

        const data = await res.json();

        if (data.success) {
          setLaunchesData(data.songs);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getLatestSongs();
  }, []);

  return (
    <section id="latest" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">
              Latest Releases
            </span>

            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              New <span className="text-red-500">Launches</span>
            </h2>

            <p className="text-gray-400 mt-2 max-w-2xl">
              Be the first to experience the newest Bhojpuri music videos and
              songs.
            </p>
          </div>

          <Link
            href="https://www.youtube.com/@alfabeatbhojpuri"
            target="_blank"
            className="mt-4 md:mt-0 text-red-500 hover:text-red-400 font-semibold flex items-center gap-1"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {launchesData.map((launch, index) => (
            <Link
              key={launch.video_id}
              href={`/song/${launch.video_id}`}
              className="group bg-gradient-to-br from-red-950/20 to-black border border-red-600/20 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/10"
            >
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={launch.thumbnail}
                  alt={launch.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <div className="bg-red-600 text-white p-4 rounded-full scale-0 group-hover:scale-100 transition-all">
                    <IoPlay className="h-8 w-8" />
                  </div>
                </div>

                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                  NEW
                </div>

                <div className="absolute bottom-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <IoCalendarOutline className="h-3 w-3" />
                  {new Date(launch.publish_date).toLocaleDateString()}
                </div>

                <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <IoTimeOutline className="h-3 w-3" />
                  {Number(launch.views).toLocaleString()} views
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-base sm:text-lg font-bold mb-2 line-clamp-2 group-hover:text-red-400">
                  {launch.title}
                </h3>

                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center">
                    <FaYoutube className="h-3 w-3 text-red-500" />
                  </div>

                  <span className="text-xs text-gray-400">
                    Alfa Beat Bhojpuri
                  </span>
                </div>

                <div className="mt-3 inline-flex items-center gap-2 text-red-500 text-sm font-semibold">
                  <IoPlay className="h-4 w-4" />
                  Watch Now
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
