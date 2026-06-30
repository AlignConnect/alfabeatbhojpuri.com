import Link from "next/link";
import Image from "next/image";
import { FaYoutube, FaInstagram, FaTwitter, FaFacebook, FaMusic } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-red-600/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              {/* Custom Logo */}
              <Image
                src="/imgs/ab.png"
                alt="Alfa Beat Bhojpuri"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="font-bold text-xl text-white">
                Alfa<span className="text-red-600">Beat</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm">
              Your ultimate destination for trending Bhojpuri songs, latest music launches, and exclusive videos.
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="https://www.youtube.com/@alfabeatbhojpuri" target="_blank" className="text-gray-400 hover:text-red-500 transition-colors">
                <FaYoutube className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <FaInstagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <FaTwitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <FaFacebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#trending" className="text-gray-400 hover:text-red-400 transition-colors">Trending Songs</Link></li>
              <li><Link href="#latest" className="text-gray-400 hover:text-red-400 transition-colors">Latest Launches</Link></li>
              <li><Link href="#about" className="text-gray-400 hover:text-red-400 transition-colors">Artists</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-red-400 transition-colors">Videos</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-gray-400 hover:text-red-400 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-red-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-red-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-red-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-gray-400">
                <FiMail className="h-4 w-4 mt-0.5 text-red-500" />
                <span>contact@alfabeat.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <FiMapPin className="h-4 w-4 mt-0.5 text-red-500" />
                <span>Bhojpuri Music Industry</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <FiPhone className="h-4 w-4 mt-0.5 text-red-500" />
                <span>+91 12345 67890</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <FaMusic className="h-4 w-4 mt-0.5 text-red-500" />
                <span>Alfa Beat Records</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-red-600/20 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} <span className="text-red-500">Alfa Beat Bhojpuri</span>. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="#" className="text-xs text-gray-500 hover:text-red-400 transition-colors">Privacy</Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-red-400 transition-colors">Terms</Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-red-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;