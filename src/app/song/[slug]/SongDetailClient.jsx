// app/song/[slug]/SongDetailClient.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IoPlay, IoClose, IoArrowBack } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import {
    FaYoutube,
    FaThumbsUp,
    FaThumbsDown,
    FaShare,
    FaDownload,
    FaHeart,
} from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

const SongDetailClient = ({ song, allSongs }) => {
    const router = useRouter();
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    // Handle body overflow
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    // Toggle like
    const toggleLike = () => {
        if (disliked) setDisliked(false);
        setLiked(!liked);
    };

    // Toggle dislike
    const toggleDislike = () => {
        if (liked) setLiked(false);
        setDisliked(!disliked);
    };

    // Get suggested songs (exclude current song)
    const suggestedSongs = allSongs
    .filter((s) => s.slug !== song.slug)
    .slice(0, 10);
    console.log('suggestedSongs: ', suggestedSongs);

    return (
        <div className="fixed inset-0 z-50 bg-[#0a0a0a] overflow-y-auto">
            {/* Header with Back Button and Logo */}
            <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-md border-b border-white/5">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">

                        {/* Logo */}
                        {/* <Link href="/" className="flex items-center gap-2 ml-2">
                            <Image
                                src="/imgs/ab.png"
                                alt="Alfa Beat Bhojpuri"
                                width={40}
                                height={40}
                                className="h-10 w-10 object-contain"
                                priority
                            />
                            <span className="font-bold text-xl text-white hidden sm:inline">
                                Alfa<span className="text-red-600">Beat</span>
                            </span>
                            <span className="inline-block text-xs bg-red-600/20 text-red-400 px-2 py-0.5 rounded-full hidden sm:inline">
                                Bhojpuri
                            </span>
                        </Link> */}



                        {/* Back Button */}
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                        >
                            <IoArrowBack className="h-6 w-6" />
                            <span className="hidden sm:inline">Back</span>
                        </button>

                    </div>

                    {/* Title - Centered */}
                    <h2 className="text-sm sm:text-base font-semibold text-gray-300 truncate max-w-[200px] sm:max-w-md flex-1 text-center">
                        {song.title}
                    </h2>

                    {/* Close Button */}
                    <button
                        onClick={() => router.push("/#trending")}
                        className="text-gray-300 hover:text-white transition-colors p-1"
                    >
                        <IoClose className="h-6 w-6" />
                    </button>
                </div>
            </div>

            <div className="px-4 py-4 sm:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Video Player and Details */}
                    <div className="lg:col-span-2">
                        {/* Video Player */}
                        <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-red-600/20">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${song.videoId}?autoplay=1&rel=0`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Video Details */}
                        <div className="mt-4 sm:mt-6">
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                                {song.title}
                            </h2>

                            {/* Channel Info & Actions */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3 py-3 border-y border-white/5">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src="/imgs/ab.png"
                                        alt="Alfa Beat Bhojpuri"
                                        width={40}
                                        height={40}
                                        className="h-10 w-10 object-contain"
                                        priority
                                    />
                                    <div>
                                        <h3 className="text-sm font-semibold text-white hover:text-red-400 transition-colors cursor-pointer">
                                            {song.channel || "Alfa Beat Bhojpuri"}
                                        </h3>
                                    </div>

                                    {/* Subscribe Button - Redirects to YouTube Channel */}
                                    <Link
                                        href="https://www.youtube.com/@alfabeatbhojpuri"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
                                    >
                                        <FaYoutube className="h-4 w-4" />
                                        Subscribe
                                    </Link>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    {/* Action buttons are commented out */}
                                </div>
                            </div>

                            {/* Video Stats & Description */}
                            <div className="mt-3">
                                <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                                    {song.description ||
                                        "Watch this amazing Bhojpuri song on Alfa Beat Bhojpuri. Don't forget to like, share, and subscribe!"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Suggested Songs */}
                    <div className="lg:col-span-1 mt-6 lg:mt-0">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="text-red-500">▶</span> Suggested Songs
                        </h3>
                        <div className="space-y-3">
                            {suggestedSongs.map((suggestedSong) => (
                                <Link
                                    key={suggestedSong.id}
                                    href={`/song/${suggestedSong.slug}`}
                                    className="flex gap-3 p-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer group"
                                >
                                    <div className="relative w-40 flex-shrink-0 aspect-video rounded-lg overflow-hidden bg-black">
                                        <img
                                            src={suggestedSong.thumbnail}
                                            alt={suggestedSong.title}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                            <IoPlay className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-all" />
                                        </div>
                                        {suggestedSong.category === "hero" && (
                                            <div className="absolute top-1 left-1 bg-red-600 text-white text-[8px] px-1.5 py-0.5 rounded">
                                                HERO
                                            </div>
                                        )}
                                        {suggestedSong.category === "launch" && (
                                            <div className="absolute top-1 left-1 bg-green-600 text-white text-[8px] px-1.5 py-0.5 rounded">
                                                NEW
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-100 line-clamp-2 group-hover:text-white transition-colors">
                                            {suggestedSong.title}
                                        </h4>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {suggestedSong.channel || "Alfa Beat Bhojpuri"}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SongDetailClient;