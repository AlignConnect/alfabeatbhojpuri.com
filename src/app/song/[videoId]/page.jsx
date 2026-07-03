import { notFound } from "next/navigation";
import SongDetailClient from "./SongDetailClient";

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/alfabeat/songs?page=1&limit=1000`,
    {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
      },
    }
  );

  const data = await res.json();

  return (data.songs || []).map((item) => ({
    videoId: item.video_id,
  }));
}

export default async function Page({ params }) {
  const { videoId } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/song/${videoId}`,
    {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
      },
    }
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  if (!data.success) {
    notFound();
  }

  return <SongDetailClient song={data.song} />;
}
// import { notFound } from "next/navigation";
// import SongDetailClient from "./SongDetailClient";

// export default async function Page({ params }) {
//   const { videoId } = await params;

//   console.log("videoId =", videoId);

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/song/${videoId}`,
//     {
//       cache: "no-store",
//       headers: {
//         "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
//       },
//     }
//   );

//   if (!res.ok) {
//     notFound();
//   }

//   const data = await res.json();

//   if (!data.success) {
//     notFound();
//   }

//   return <SongDetailClient song={data.song} />;
// }