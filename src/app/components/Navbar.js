"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Trending", href: "#trending" },
    { name: "Latest", href: "#latest" },
    { name: "Videos", href: "#videos" },
    { name: "About", href: "#about" },
  ];

  return (
    <nav className="bg-black/90 backdrop-blur-md border-b border-red-600/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              {/* Custom Logo */}
              <Image
                src="/imgs/ab.png"
                alt="Alfa Beat Bhojpuri"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                priority
              />
              <span className="font-bold text-xl text-white">
                Alfa<span className="text-red-600">Beat</span>
              </span>
              <span className="inline-block text-xs bg-red-600/20 text-red-400 px-2 py-0.5 rounded-full">
                Bhojpuri
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white hover:underline underline-offset-4 decoration-red-600 transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="https://www.youtube.com/@alfabeatbhojpuri"
              target="_blank"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <FaYoutube className="h-4 w-4" /> Subscribe
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-red-600/20">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-red-600/10 transition-all"
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="https://www.youtube.com/@alfabeatbhojpuri"
              target="_blank"
              className="block px-3 py-2 rounded-md text-base font-medium bg-red-600 text-white hover:bg-red-700 text-center transition-colors flex items-center justify-center gap-2"
              onClick={toggleMenu}
            >
              <FaYoutube className="h-5 w-5" /> Subscribe on YouTube
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
