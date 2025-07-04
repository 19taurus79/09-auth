import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
type Params = { params: Promise<{ slug: string[] }> };
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];
  return {
    title: `Notes Hub | ${tag === "All" ? "All Notes" : tag}`,
    description: `Browse notes tagged with "${tag}" in the Notes App.`,
    openGraph: {
      title: `Notes Hub | ${tag === "All" ? "All Notes" : tag}`,
      description: `Browse notes tagged with "${tag}" in the Notes App.`,
      url: `https://08-zustand-nu.vercel.app/notes/filter/${slug.join("/")}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes tagged with ${tag}`,
        },
      ],
      type: "website",
    },
  };
}
export default async function NotesPage({ params }: Params) {
  const { slug } = await params;
  const tag = slug[0];
  const initialData = await fetchNotes({
    page: 1,
    search: "",
    ...(tag && tag !== "All" && { tag }),
  });
  // console.log(slug);
  // console.log(initialData);
  return <NotesClient initialData={initialData} tag={tag} />;
}
