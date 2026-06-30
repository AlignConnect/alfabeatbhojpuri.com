import Image from "next/image";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { FaAward } from "react-icons/fa";

const ChannelHighlights = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-red-950/10 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Why Alfa Beat</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            Your #1 Source for <span className="text-red-500">Bhojpuri Music</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="bg-red-600/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/20 transition-colors">
              <FaYoutube className="h-10 w-10 text-red-500 group-hover:text-red-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Exclusive Videos</h3>
            <p className="text-gray-400 text-sm">Get access to exclusive Bhojpuri music videos and behind-the-scenes content.</p>
          </div>

          <div className="text-center group">
            <div className="bg-red-600/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/20 transition-colors">
              <FaMusic className="h-10 w-10 text-red-500 group-hover:text-red-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Trending Hits</h3>
            <p className="text-gray-400 text-sm">Stay updated with the latest trending Bhojpuri songs and chart-toppers.</p>
          </div>

          <div className="text-center group">
            <div className="bg-red-600/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/20 transition-colors">
              <FaUsers className="h-10 w-10 text-red-500 group-hover:text-red-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Top Artists</h3>
            <p className="text-gray-400 text-sm">Featuring the biggest names in Bhojpuri music industry like Shilpi Raj, Sonu Sargam Yadav, and more.</p>
          </div>

          <div className="text-center group">
            <div className="bg-red-600/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/20 transition-colors">
              <FaAward className="h-10 w-10 text-red-500 group-hover:text-red-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Content</h3>
            <p className="text-gray-400 text-sm">High-quality music production and visually stunning videos that set new standards.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChannelHighlights;