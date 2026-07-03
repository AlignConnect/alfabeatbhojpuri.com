"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    IoClose,
    IoArrowBack,
    IoEyeOutline,
    IoTimeOutline,
    IoShareSocial,
    IoDownloadOutline,
    IoEllipsisVertical
} from "react-icons/io5";
import {
    FaThumbsUp,
    FaThumbsDown,
    FaHeart,
    FaRegHeart,
    FaComment,
    FaShare,
    FaPlus,
    FaMusic
} from "react-icons/fa";

export default function ShortDetailClient({ shortId }) {
    const router = useRouter();
    const [short, setShort] = useState(null);
    const [suggested, setSuggested] = useState([]);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const videoRef = useRef(null);

    // Handle body overflow
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    // FETCH SINGLE SHORT
    useEffect(() => {
        const fetchShort = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/alfabeat/shorts/${shortId}`,
                    {
                        headers: {
                            "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
                        },
                    }
                );

                const data = await res.json();

                if (data.success) {
                    setShort(data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchShort();
    }, [shortId]);

    // FETCH SUGGESTED SHORTS
    useEffect(() => {
        const fetchSuggested = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/alfabeat/shorts?page=1&limit=10`,
                    {
                        headers: {
                            "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
                        },
                    }
                );

                const data = await res.json();

                if (data.success) {
                    // const filtered = (data.shorts || []).filter(
                    //     (item) => item.videoId !== shortId
                    // );
                    const filtered = (data.shorts || []).filter(
                        (item) => item.video_id !== shortId
                    );
                    setSuggested(filtered);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchSuggested();
    }, [shortId]);

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

    // Toggle subscribe
    const toggleSubscribe = () => {
        setIsSubscribed(!isSubscribed);
    };

    // Format views count
    const formatViews = (views) => {
        if (!views || views === "N/A") return "0";
        if (views >= 1000000) return (views / 1000000).toFixed(1) + "M";
        if (views >= 1000) return (views / 1000).toFixed(1) + "K";
        return views.toString();
    };

    // Handle back button
    const handleBackClick = () => {
        router.push("/#trending");
    };

    // Handle close button
    const handleCloseClick = () => {
        router.push("/#trending");
    };

    // Navigate to next short
    const handleNextShort = () => {
        if (suggested.length > 0) {
            // router.push(`/shorts/${suggested[0].videoId}`);
            router.push(`/shorts/${suggested[0].video_id}`);
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!short) {
        return (
            <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
                <div className="text-white text-xl">Video not found</div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 bg-black">
            {/* Header - Minimal, overlay on video */}
            <div className="absolute top-0 left-0 right-0 z-20 px-4 py-3 bg-gradient-to-b from-black/60 to-transparent">
                <div className="flex items-center justify-between">
                    {/* Back Button */}
                    <button
                        onClick={handleBackClick}
                        className="text-white hover:text-gray-300 transition-colors p-1"
                    >
                        <IoArrowBack className="h-6 w-6" />
                    </button>

                    {/* Title - Centered */}
                    {/* <h2 className="text-sm font-semibold text-white truncate max-w-[150px] sm:max-w-xs">
                        {short.title}
                    </h2> */}

                    {/* Close Button */}
                    <button
                        onClick={handleCloseClick}
                        className="text-white hover:text-gray-300 transition-colors p-1"
                    >
                        <IoClose className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Video Container - Full screen with swipe navigation */}
            <div className="relative w-full h-full flex items-center justify-center bg-black">
                {/* Video Player - Full height with proper aspect ratio */}
                <div className="relative w-full h-full max-w-[450px]">
                    <iframe
                        ref={videoRef}
                        src={`https://www.youtube.com/embed/${short.videoId}?autoplay=1&mute=0&controls=0&rel=0&modestbranding=1&showinfo=0`}
                        title={short.title}
                        allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>

                    {/* Overlay to prevent clicks on iframe */}
                    <div className="absolute inset-0 pointer-events-none"></div>

                    {/* Next Short Button - Right side */}
                    {/* {suggested.length > 0 && (
                        <button
                            onClick={handleNextShort}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
                        >
                            <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>
                    )} */}
                </div>

                {/* Right Side Actions - Overlay on video */}
                <div className="absolute bottom-0 right-0 z-10 flex flex-col items-center gap-4 p-4 pb-8">
                    {/* Like Button */}
                    <button
                        onClick={toggleLike}
                        className="flex flex-col items-center gap-1 group"
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${liked
                            ? "bg-red-600/30 text-red-500"
                            : "bg-white/10 text-white hover:bg-white/20"
                            }`}>
                            <FaThumbsUp className={`h-6 w-6 ${liked ? "text-red-500" : ""}`} />
                        </div>
                        <span className="text-xs text-white font-medium">
                            {formatViews(short.likeCount || 0)}
                        </span>
                    </button>

                    {/* Dislike Button */}
                    <button
                        onClick={toggleDislike}
                        className="flex flex-col items-center gap-1 group"
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${disliked
                            ? "bg-red-600/30 text-red-500"
                            : "bg-white/10 text-white hover:bg-white/20"
                            }`}>
                            <FaThumbsDown className={`h-6 w-6 ${disliked ? "text-red-500" : ""}`} />
                        </div>
                    </button>

                    {/* Comment Button */}
                    <button className="flex flex-col items-center gap-1 group">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                            <FaComment className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xs text-white font-medium">
                            {formatViews(short.commentCount || 0)}
                        </span>
                    </button>

                    {/* Share Button */}
                    <button className="flex flex-col items-center gap-1 group">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                            <FaShare className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xs text-white font-medium">Share</span>
                    </button>

                    {/* Music Note */}
                    <button className="flex flex-col items-center gap-1 group">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                            <FaMusic className="h-6 w-6 text-white" />
                        </div>
                    </button>

                    {/* More Options */}
                    <button className="flex flex-col items-center gap-1 group">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                            <IoEllipsisVertical className="h-6 w-6 text-white" />
                        </div>
                    </button>
                </div>

                {/* Bottom Info - Overlay on video */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 pb-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    {/* Channel Info */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-red-600/30 flex items-center justify-center flex-shrink-0 border-2 border-white/20">
                            <Image
                                src="/imgs/ab.png"
                                alt="Channel"
                                width={36}
                                height={36}
                                className="h-9 w-9 object-contain rounded-full"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-white hover:text-red-400 transition-colors cursor-pointer">
                                {short.channel || "Alfa Beat Bhojpuri"}
                            </h3>
                            <p className="text-xs text-gray-400">
                                {short.subscribers || "2.1M"} subscribers
                            </p>
                        </div>
                        {/* <button
                            onClick={toggleSubscribe}
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                                isSubscribed
                                    ? "bg-gray-600 text-white hover:bg-gray-500"
                                    : "bg-red-600 text-white hover:bg-red-700"
                            }`}
                        >
                            {isSubscribed ? "Subscribed" : "Subscribe"}
                        </button> */}
                    </div>

                    {/* Title & Description */}
                    <div className="mb-2">
                        <h1 className="text-white font-semibold text-sm">
                            {short.title}
                        </h1>
                        {short.description && (
                            <div className="mt-1">
                                <p className={`text-gray-300 text-sm ${!showDescription ? "line-clamp-2" : ""
                                    }`}>
                                    {short.description}
                                </p>
                                {short.description.length > 100 && (
                                    <button
                                        onClick={() => setShowDescription(!showDescription)}
                                        className="text-gray-400 text-xs hover:text-white transition-colors mt-1"
                                    >
                                        {showDescription ? "Show less" : "more"}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Music Info */}
                    <div className="flex items-center gap-2 text-gray-300 text-xs">
                        <FaMusic className="h-3 w-3" />
                        <span>Original Sound - {short.channel || "Alfa Beat Bhojpuri"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}