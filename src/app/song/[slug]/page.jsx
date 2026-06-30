// app/song/[slug]/page.jsx
import Link from "next/link";
import { allSongsData } from "@/app/data/songsData";
import SongDetailClient from "./SongDetailClient";

// Generate static paths for all songs
export function generateStaticParams() {
    return allSongsData.map((song) => ({
        slug: song.slug,
    }));
}

// Page component
export default async function SongDetailPage({ params }) {
    // Handle params properly
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    // Find the song by slug
    const song = allSongsData.find((s) => s.slug === slug);

    // If song not found, return 404
    if (!song) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Song Not Found</h1>
                    <p className="text-gray-400">The song you&apos;re looking for doesn&apos;t exist.</p>
                    <Link
                        href="/"
                        className="inline-block mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        );
    }

    return <SongDetailClient song={song} allSongs={allSongsData} />;
}