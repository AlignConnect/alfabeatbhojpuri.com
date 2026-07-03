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
        // Update like count
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
            {/* Header with Back Button and Logo */}
            <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-md border-b border-white/5">
                <div className="px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
                        {/* Back Button */}
                        <button
                            onClick={handleBackClick}
                            className="flex items-center gap-1 sm:gap-2 text-gray-300 hover:text-white transition-colors p-1"
                        >
                            <IoArrowBack className="h-5 w-5 sm:h-6 sm:w-6" />
                            <span className="hidden sm:inline text-sm">Back</span>
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-1 sm:gap-2 ml-0 sm:ml-2">
                            <Image
                                src="/imgs/ab.png"
                                alt="Alfa Beat Bhojpuri"
                                width={32}
                                height={32}
                                className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
                                priority
                            />
                            <span className="font-bold text-base sm:text-xl text-white hidden xs:inline">
                                Alfa<span className="text-red-600">Beat</span>
                            </span>
                            <span className="inline-block text-[8px] sm:text-[10px] bg-red-600/20 text-red-400 px-1.5 sm:px-2 py-0.5 rounded-full hidden sm:inline">
                                Bhojpuri
                            </span>
                        </Link>
                    </div>

                    {/* Title - Centered */}
                    <h2 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-300 truncate max-w-[80px] xs:max-w-[120px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-md flex-1 text-center px-1">
                        {song.title}
                    </h2>

                    {/* Close Button */}
                    <button
                        onClick={handleCloseClick}
                        className="text-gray-300 hover:text-white transition-colors p-1 flex-shrink-0"
                    >
                        <IoClose className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                </div>
            </div>

            <div className="px-2 sm:px-4 py-2 sm:py-4 lg:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                    {/* Left Column - Video Player and Details */}
                    <div className="lg:col-span-2">
                        {/* Video Player */}
                        <div className="relative w-full aspect-video bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-red-600/20">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${song.video_id}?autoplay=1&rel=0`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Video Details */}
                        <div className="mt-3 sm:mt-4 lg:mt-6">
                            <h1 className="text-base sm:text-lg lg:text-2xl font-bold text-white line-clamp-2">
                                {song.title}
                            </h1>

                            {/* Channel Info & Actions */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mt-2 sm:mt-3 py-2 sm:py-3 border-y border-white/10">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    {/* Channel Logo */}
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0">
                                        <Image
                                            src="/imgs/ab.png"
                                            alt="Alfa Beat Bhojpuri"
                                            width={32}
                                            height={32}
                                            className="h-7 w-7 sm:h-9 sm:w-9 object-contain rounded-full"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-xs sm:text-sm font-semibold text-white hover:text-red-400 transition-colors cursor-pointer truncate">
                                            {song.channel || "Alfa Beat Bhojpuri"}
                                        </h3>
                                        <p className="text-[10px] sm:text-xs text-gray-400">
                                            {song.subscribers || "2.1M"} subscribers
                                        </p>
                                    </div>

                                    {/* Subscribe Button */}
                                    <Link
                                        href="https://www.youtube.com/@alfabeatbhojpuri"
                                        target="_blank"
                                        className="bg-red-600 hover:bg-red-700 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-sm font-semibold transition-colors flex items-center gap-1 sm:gap-2 flex-shrink-0"
                                    >
                                        <FaYoutube className="h-3 w-3 sm:h-4 sm:w-4" /> 
                                        <span className="hidden xs:inline">Subscribe</span>
                                    </Link>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                                    {/* Like Button with Count */}
                                    <button
                                        onClick={toggleLike}
                                        className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-sm transition-all ${
                                            liked ? "bg-blue-600/20 text-blue-400" : "bg-white/5 text-gray-300 hover:bg-white/10"
                                        }`}
                                    >
                                        <FaThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="hidden xs:inline">{formatLikeCount(likeCount)}</span>
                                    </button>

                                    {/* Dislike Button */}
                                    <button
                                        onClick={toggleDislike}
                                        className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-sm transition-all ${
                                            disliked ? "bg-blue-600/20 text-blue-400" : "bg-white/5 text-gray-300 hover:bg-white/10"
                                        }`}
                                    >
                                        <FaThumbsDown className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </button>

                                    {/* Like/Dislike Stats */}
                                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-400 ml-1">
                                        <span className="flex items-center gap-0.5">
                                            <FaHeart className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-red-500" />
                                            {formatLikeCount(likeCount)}
                                        </span>
                                        {disliked && (
                                            <span className="text-gray-500">| 👎</span>
                                        )}
                                    </div>

                                    {/* Share Button - Hidden on very small screens */}
                                    <div className="relative hidden xs:block">
                                        <button
                                            onClick={() => setShowShareMenu(!showShareMenu)}
                                            className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-sm bg-white/5 text-gray-300 hover:bg-white/10 transition-all"
                                        >
                                            <FaShare className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="hidden sm:inline">Share</span>
                                        </button>
                                        {showShareMenu && (
                                            <div className="absolute top-full right-0 mt-2 bg-[#1a1a1a] rounded-lg shadow-xl border border-white/10 p-2 min-w-[180px] z-20">
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                                                    className="w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-300 hover:bg-white/5 rounded transition-colors"
                                                >
                                                    Copy link
                                                </button>
                                                <a
                                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-300 hover:bg-white/5 rounded transition-colors"
                                                >
                                                    Share on Facebook
                                                </a>
                                                <a
                                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-300 hover:bg-white/5 rounded transition-colors"
                                                >
                                                    Share on Twitter
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Video Stats & Description */}
                            <div className="mt-2 sm:mt-3">
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs lg:text-sm text-gray-400">
                                    <span className="flex items-center gap-0.5 sm:gap-1">
                                        <IoEyeOutline className="h-3 w-3 sm:h-4 sm:w-4" />
                                        {formatViews(song.views)}
                                    </span>
                                    <span className="flex items-center gap-0.5 sm:gap-1">
                                        <IoTimeOutline className="h-3 w-3 sm:h-4 sm:w-4" />
                                        {formatDate(song.publish_date)}
                                    </span>
                                    {song.duration && (
                                        <>
                                            <span className="hidden xs:inline">•</span>
                                            <span className="flex items-center gap-0.5 sm:gap-1 hidden xs:inline">
                                                ⏱️ {song.duration}
                                            </span>
                                        </>
                                    )}
                                    <span className="flex items-center gap-0.5 sm:gap-1">
                                        <FaHeart className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-red-500" />
                                        {formatLikeCount(likeCount)}
                                    </span>
                                    {liked && (
                                        <>
                                            <span>•</span>
                                            <span className="flex items-center gap-0.5 sm:gap-1 text-blue-400">
                                                <FaHeart className="h-2 w-2 sm:h-3 sm:w-3 text-red-500" /> 
                                                <span className="hidden xs:inline">Liked</span>
                                            </span>
                                        </>
                                    )}
                                    {song.category && (
                                        <>
                                            <span className="hidden xs:inline">•</span>
                                            <span className="px-1.5 sm:px-2 py-0.5 bg-red-600/20 text-red-400 rounded-full text-[8px] sm:text-[10px] uppercase">
                                                {song.category}
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Description with Read More */}
                                <div className="mt-2 sm:mt-4 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div className="relative">
                                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
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
                                        
                                        {/* Read More / Read Less Button */}
                                        {isDescriptionLong && (
                                            <button
                                                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                                className="mt-2 text-xs sm:text-sm text-red-400 hover:text-red-300 font-medium transition-colors flex items-center gap-1"
                                            >
                                                {isDescriptionExpanded ? (
                                                    <>
                                                        Read Less
                                                        <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                        </svg>
                                                    </>
                                                ) : (
                                                    <>
                                                        Read More
                                                        <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>

                                    {/* Tags */}
                                    {song.tags && song.tags.length > 0 && (
                                        <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2">
                                            {song.tags.slice(0, isDescriptionExpanded ? song.tags.length : 5).map((tag, index) => (
                                                <span key={index} className="text-[10px] sm:text-xs text-blue-400 hover:text-blue-300 cursor-pointer">
                                                    #{tag}
                                                </span>
                                            ))}
                                            {!isDescriptionExpanded && song.tags.length > 5 && (
                                                <span className="text-[10px] sm:text-xs text-gray-500">
                                                    +{song.tags.length - 5} more
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Suggested Songs */}
                    <div className="lg:col-span-1 mt-4 sm:mt-6 lg:mt-0">
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                            <span className="text-red-500">▶</span> Suggested Songs
                        </h3>
                        <div className="space-y-2 sm:space-y-3">
                            {suggestedSongs.slice(0, 8).map((suggestedSong) => (
                                <Link
                                    key={suggestedSong.id}
                                    href={`/song/${suggestedSong.video_id}`}
                                    className="flex gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer group"
                                >
                                    <div className="relative w-24 xs:w-28 sm:w-32 md:w-40 flex-shrink-0 aspect-video rounded-lg overflow-hidden bg-black">
                                        <img
                                            src={suggestedSong.thumbnail}
                                            alt={suggestedSong.title}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                            <IoPlay className="h-6 w-6 sm:h-8 sm:w-8 text-white opacity-0 group-hover:opacity-100 transition-all" />
                                        </div>
                                        {suggestedSong.category === "hero" && (
                                            <div className="absolute top-1 left-1 bg-red-600 text-white text-[6px] sm:text-[8px] px-1 sm:px-1.5 py-0.5 rounded">
                                                HERO
                                            </div>
                                        )}
                                        {suggestedSong.category === "launch" && (
                                            <div className="absolute top-1 left-1 bg-green-600 text-white text-[6px] sm:text-[8px] px-1 sm:px-1.5 py-0.5 rounded">
                                                NEW
                                            </div>
                                        )}
                                        {suggestedSong.duration && (
                                            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded">
                                                {suggestedSong.duration}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs sm:text-sm font-medium text-gray-100 line-clamp-2 group-hover:text-white transition-colors">
                                            {suggestedSong.title}
                                        </h4>
                                        <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 truncate">
                                            {suggestedSong.channel || "Alfa Beat Bhojpuri"}
                                        </p>
                                        <div className="flex items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1 text-[8px] sm:text-[10px] text-gray-500">
                                            <span className="truncate">{formatViews(suggestedSong.views)}</span>
                                            <span className="hidden xs:inline">•</span>
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
    );
};

export default SongDetailClient;