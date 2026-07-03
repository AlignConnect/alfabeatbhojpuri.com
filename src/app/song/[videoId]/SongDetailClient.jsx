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
    FaRegHeart,
} from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

const SongDetailClient = ({ song }) => {
    const router = useRouter();
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [likeCount, setLikeCount] = useState(song.likes || 0);

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
        setLikeCount(prev => liked ? prev - 1 : prev + 1);
    };

    // Toggle dislike
    const toggleDislike = () => {
        if (liked) {
            setLiked(false);
            setLikeCount(prev => prev - 1);
        }
        setDisliked(!disliked);
    };

    // Toggle subscribe
    const toggleSubscribe = () => {
        setIsSubscribed(!isSubscribed);
    };

    // Get suggested songs (exclude current song)
    const [suggestedSongs, setSuggestedSongs] = useState([]);

    useEffect(() => {
        const fetchSongs = async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/alfabeat/songs?limit=10`,
                {
                    headers: {
                        "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
                    },
                }
            );

            const data = await res.json();

            if (data.success) {
                setSuggestedSongs(
                    data.songs.filter(
                        (item) => item.video_id !== song.video_id
                    )
                );
            }
        };

        fetchSongs();
    }, [song.video_id]);

    // Format views count
    const formatViews = (views) => {
        if (!views || views === "N/A") return "N/A views";
        return views;
    };

    // Format date
    const formatDate = (date) => {
        if (!date || date === "N/A") return "No date";
        return date;
    };

    // Format like count
    const formatLikeCount = (count) => {
        if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
        if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
        return count;
    };

    // Handle back button - Go to Home page
    const handleBackClick = () => {
        router.push("/#trending");
    };

    // Handle close button - Go to Home page
    const handleCloseClick = () => {
        router.push("/#trending");
    };

    // Check if description is long enough to need truncation
    const isDescriptionLong = song.description && song.description.length > 300;
    const descriptionToShow = isDescriptionExpanded 
        ? song.description 
        : (song.description || "").slice(0, 300);

    return (
        <div className="fixed inset-0 z-50 bg-[#0a0a0a] overflow-y-auto">
            {/* Netflix-style Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-b from-black via-black/95 to-transparent backdrop-blur-xl border-b border-white/5">
                <div className=" px-3 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                        <button
                            onClick={handleBackClick}
                            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 p-1.5 rounded-lg hover:bg-white/5"
                            aria-label="Go back"
                        >
                            <IoArrowBack className="h-5 w-5 sm:h-5.5 sm:w-5.5 transition-transform group-hover:-translate-x-1" />
                            <span className="hidden sm:inline text-sm font-medium">Back</span>
                        </button>

                        <Link href="/" className="flex items-center gap-2 sm:gap-3 ml-0 sm:ml-1 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-red-600/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <Image
                                    src="/imgs/ab.png"
                                    alt="Alfa Beat Bhojpuri"
                                    width={36}
                                    height={36}
                                    className="h-9 w-9 sm:h-10 sm:w-10 object-contain relative z-10"
                                    priority
                                />
                            </div>
                            <span className="font-black text-lg sm:text-2xl text-white hidden xs:inline tracking-tight">
                                Alfa<span className="text-red-500">Beat</span>
                            </span>
                            <span className="inline-block text-[8px] sm:text-[10px] font-bold bg-red-600/20 text-red-400 px-2 sm:px-3 py-0.5 rounded-full hidden sm:inline border border-red-500/20 uppercase tracking-wider">
                                Bhojpuri
                            </span>
                        </Link>
                    </div>

                    <h2 className="text-xs sm:text-sm lg:text-base font-medium text-gray-300 truncate max-w-[80px] xs:max-w-[140px] sm:max-w-[220px] md:max-w-[350px] lg:max-w-md flex-1 text-center px-2 opacity-80">
                        {song.title}
                    </h2>

                    <button
                        onClick={handleCloseClick}
                        className="text-gray-400 hover:text-white transition-all duration-300 p-1.5 rounded-lg hover:bg-white/5 hover:rotate-90"
                        aria-label="Close"
                    >
                        <IoClose className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                </div>
            </div>

            <div className="px-3 sm:px-8 py-4 sm:py-6 lg:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                    {/* Left Column - Video Player and Details */}
                    <div className="lg:col-span-2 space-y-5 sm:space-y-6">
                        {/* Netflix-style Video Player */}
                        <div className="relative w-full aspect-video bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-red-600/20 ring-1 ring-white/5">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10"></div>
                            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                                {/* <span className="bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-red-600/30">
                                    Now Playing
                                </span> */}
                                {song.category && (
                                    <span className="bg-white/10 backdrop-blur-sm text-white text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                                        {song.category}
                                    </span>
                                )}
                            </div>
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${song.video_id}?autoplay=1&rel=0&modestbranding=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Netflix-style Video Details */}
                        <div className="space-y-5 sm:space-y-6">
                            <div className="space-y-1.5">
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight line-clamp-2">
                                    {song.title}
                                </h1>
                            </div>

                            {/* Netflix-style Channel Info & Actions */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-3 py-4 sm:py-5 px-4 sm:px-5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="relative flex-shrink-0">
                                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/40 to-red-500/20 rounded-full blur-xl"></div>
                                        <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-red-600/30 to-red-500/10 flex items-center justify-center ring-2 ring-white/10 relative overflow-hidden">
                                            <Image
                                                src="/imgs/ab.png"
                                                alt="Alfa Beat Bhojpuri"
                                                width={40}
                                                height={40}
                                                className="h-9 w-9 sm:h-11 sm:w-11 object-contain rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-sm sm:text-base font-semibold text-white hover:text-red-400 transition-colors duration-200 cursor-pointer truncate flex items-center gap-2">
                                            {song.channel || "Alfa Beat Bhojpuri"}
                                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                                        </h3>
                                        <p className="text-[11px] sm:text-xs text-gray-400 flex items-center gap-1.5">
                                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                            {song.subscribers || "2.1M"} subscribers
                                        </p>
                                    </div>

                                    <Link
                                        href="https://www.youtube.com/@alfabeatbhojpuri"
                                        target="_blank"
                                        className="group bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-3.5 sm:px-6 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 flex-shrink-0 shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:scale-105 active:scale-95"
                                    >
                                        <FaYoutube className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> 
                                        <span className=" xs:inline">Subscribe</span>
                                    </Link>
                                </div>

                                {/* Netflix-style Action Buttons */}
                                <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap">
                                    <button
                                        onClick={toggleLike}
                                        className={`group flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-medium transition-all duration-300 ${
                                            liked 
                                                ? "bg-blue-600/20 text-blue-400 ring-1 ring-blue-400/40 shadow-lg shadow-blue-600/10" 
                                                : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white ring-1 ring-white/5 hover:ring-white/20"
                                        }`}
                                    >
                                        <FaThumbsUp className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:scale-110 ${liked ? "text-blue-400" : ""}`} />
                                        <span className="hidden xs:inline font-medium">{formatLikeCount(likeCount)}</span>
                                    </button>

                                    <button
                                        onClick={toggleDislike}
                                        className={`group flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-medium transition-all duration-300 ${
                                            disliked 
                                                ? "bg-blue-600/20 text-blue-400 ring-1 ring-blue-400/40 shadow-lg shadow-blue-600/10" 
                                                : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white ring-1 ring-white/5 hover:ring-white/20"
                                        }`}
                                    >
                                        <FaThumbsDown className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:scale-110 ${disliked ? "text-blue-400" : ""}`} />
                                    </button>

                                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-400 ml-0.5">
                                        <span className="flex items-center gap-1.5 bg-white/5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full ring-1 ring-white/5">
                                            <FaHeart className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-500" />
                                            <span className="font-medium text-gray-300">{formatLikeCount(likeCount)}</span>
                                        </span>
                                    </div>

                                    <div className="relative hidden xs:block">
                                        <button
                                            onClick={() => setShowShareMenu(!showShareMenu)}
                                            className="group flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-medium bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 ring-1 ring-white/5 hover:ring-white/20"
                                        >
                                            <FaShare className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:rotate-12" />
                                            <span className="hidden sm:inline">Share</span>
                                        </button>
                                        {showShareMenu && (
                                            <div className="absolute top-full right-0 mt-2.5 bg-[#1a1a1a] rounded-2xl shadow-2xl border border-white/10 p-1.5 min-w-[200px] z-20 backdrop-blur-xl bg-black/95">
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                                                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-gray-300 hover:bg-white/5 rounded-xl transition-colors duration-150 font-medium"
                                                >
                                                    📋 Copy link
                                                </button>
                                                <a
                                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block w-full text-left px-4 py-2.5 text-xs sm:text-sm text-gray-300 hover:bg-white/5 rounded-xl transition-colors duration-150 font-medium"
                                                >
                                                    📘 Share on Facebook
                                                </a>
                                                <a
                                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block w-full text-left px-4 py-2.5 text-xs sm:text-sm text-gray-300 hover:bg-white/5 rounded-xl transition-colors duration-150 font-medium"
                                                >
                                                    🐦 Share on Twitter
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Netflix-style Stats & Description */}
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs lg:text-sm text-gray-400 bg-white/[0.02] rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 ring-1 ring-white/5">
                                    <span className="flex items-center gap-1.5">
                                        <IoEyeOutline className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                        <span className="font-medium">{formatViews(song.views)}</span>
                                    </span>
                                    <span className="text-white/20">•</span>
                                    <span className="flex items-center gap-1.5">
                                        <IoTimeOutline className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                        <span className="font-medium">{formatDate(song.publish_date)}</span>
                                    </span>
                                    {song.duration && (
                                        <>
                                            <span className="text-white/20 hidden xs:inline">•</span>
                                            <span className="flex items-center gap-1.5 hidden xs:inline">
                                                <span className="text-base">⏱️</span>
                                                <span className="font-medium">{song.duration}</span>
                                            </span>
                                        </>
                                    )}
                                    <span className="text-white/20">•</span>
                                    <span className="flex items-center gap-1.5">
                                        <FaHeart className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-500" />
                                        <span className="font-medium text-gray-300">{formatLikeCount(likeCount)}</span>
                                    </span>
                                    {liked && (
                                        <>
                                            <span className="text-white/20">•</span>
                                            <span className="flex items-center gap-1.5 text-blue-400 font-medium">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                                                <span className="hidden xs:inline">Liked</span>
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Netflix-style Description */}
                                <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-2xl border border-white/5 p-4 sm:p-6 hover:border-white/10 transition-all duration-300">
                                    <div className="relative">
                                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-wrap">
                                            {song.description ? (
                                                <>
                                                    {descriptionToShow}
                                                    {!isDescriptionExpanded && isDescriptionLong && (
                                                        <span className="text-gray-500">...</span>
                                                    )}
                                                </>
                                            ) : (
                                                "Watch this amazing Bhojpuri song on Alfa Beat Bhojpuri. Don't forget to like, share, and subscribe!"
                                            )}
                                        </p>
                                        
                                        {isDescriptionLong && (
                                            <button
                                                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                                className="mt-3 text-sm sm:text-base text-red-400 hover:text-red-300 font-semibold transition-all duration-200 flex items-center gap-1.5 group"
                                            >
                                                <span className="relative">
                                                    {isDescriptionExpanded ? "Read Less" : "Read More"}
                                                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
                                                </span>
                                                <svg className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${isDescriptionExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>

                                    {song.tags && song.tags.length > 0 && (
                                        <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1.5 sm:gap-2">
                                            {song.tags.slice(0, isDescriptionExpanded ? song.tags.length : 5).map((tag, index) => (
                                                <span key={index} className="text-[11px] sm:text-xs text-blue-400 hover:text-blue-300 cursor-pointer transition-all duration-200 bg-blue-400/5 px-3 py-1 rounded-full hover:bg-blue-400/10 ring-1 ring-blue-400/10 hover:ring-blue-400/20">
                                                    #{tag}
                                                </span>
                                            ))}
                                            {!isDescriptionExpanded && song.tags.length > 5 && (
                                                <span className="text-[11px] sm:text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full ring-1 ring-white/5">
                                                    +{song.tags.length - 5} more
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Netflix-style Suggested Songs */}
                    <div className="lg:col-span-1 mt-5 sm:mt-6 lg:mt-0">
                        <div className="sticky top-24">
                            <div className="flex items-center justify-between mb-4 sm:mb-5">
                                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
                                    <span className="inline-block w-1 h-6 rounded-full bg-gradient-to-b from-red-500 to-red-600"></span>
                                    Up Next
                                </h3>
                                <span className="text-[10px] sm:text-xs text-gray-500 bg-white/5 px-2.5 py-1 rounded-full ring-1 ring-white/5 font-medium">
                                    {suggestedSongs.length}
                                </span>
                            </div>
                            <div className="space-y-2.5 sm:space-y-3.5">
                                {suggestedSongs.slice(0, 8).map((suggestedSong, index) => (
                                    <Link
                                        key={suggestedSong.id}
                                        href={`/song/${suggestedSong.video_id}`}
                                        className="group flex gap-3 sm:gap-3.5 p-2 sm:p-2.5 rounded-2xl hover:bg-white/[0.04] transition-all duration-300 cursor-pointer ring-1 ring-transparent hover:ring-white/5"
                                    >
                                        <div className="relative w-28 xs:w-32 sm:w-36 md:w-40 flex-shrink-0 aspect-video rounded-xl overflow-hidden bg-black/50 ring-1 ring-white/5 group-hover:ring-red-500/30 transition-all duration-300">
                                            <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <img
                                                src={suggestedSong.thumbnail}
                                                alt={suggestedSong.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <div className="bg-red-600/90 rounded-full p-2.5 sm:p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-2xl shadow-red-600/40">
                                                    <IoPlay className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                                </div>
                                            </div>
                                            <div className="absolute top-1.5 left-1.5 flex items-center gap-1">
                                                <span className="bg-black/70 backdrop-blur-sm text-white text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md ring-1 ring-white/10">
                                                    #{index + 1}
                                                </span>
                                                {suggestedSong.category === "hero" && (
                                                    <span className="bg-gradient-to-r from-red-600 to-red-500 text-white text-[7px] sm:text-[8px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md uppercase tracking-wider shadow-lg shadow-red-600/20">
                                                        HERO
                                                    </span>
                                                )}
                                                {suggestedSong.category === "launch" && (
                                                    <span className="bg-gradient-to-r from-green-600 to-green-500 text-white text-[7px] sm:text-[8px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md uppercase tracking-wider shadow-lg shadow-green-600/20">
                                                        NEW
                                                    </span>
                                                )}
                                            </div>
                                            {suggestedSong.duration && (
                                                <div className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded-md ring-1 ring-white/10">
                                                    {suggestedSong.duration}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xs sm:text-sm font-semibold text-gray-200 line-clamp-2 group-hover:text-white transition-colors duration-200">
                                                {suggestedSong.title}
                                            </h4>
                                            <p className="text-[10px] sm:text-xs text-gray-400 mt-1 truncate flex items-center gap-1.5">
                                                <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                                                {suggestedSong.channel || "Alfa Beat Bhojpuri"}
                                            </p>
                                            <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 text-[9px] sm:text-[10px] text-gray-500">
                                                <span className="truncate font-medium">{formatViews(suggestedSong.views)}</span>
                                                <span className="text-gray-600 hidden xs:inline">•</span>
                                                <span className="hidden xs:inline truncate">{formatDate(suggestedSong.publish_date)}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SongDetailClient;