
import ShortDetailClient from "./ShortDetailClient";

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/alfabeat/shorts?page=1&limit=1000`,
    {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
      },
    }
  );

  const data = await res.json();

  return (data.shorts || []).map((item) => ({
    id: item.video_id, // ✅ Correct field
  }));
}

export default async function ShortsPage({ params }) {
  const { id } = await params; // ✅ Next.js 16

  return <ShortDetailClient shortId={id} />;
}


// export default async function ShortsPage({ params }) {
//   const { id } = await params;

//   return <ShortDetailClient shortId={id} />;
// }

