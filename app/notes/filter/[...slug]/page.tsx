import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
type Params = { params: Promise<{ slug: string[] }> };
export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const tag = slug[0];
  return {
    title: `Notes App | ${tag === "All" ? "All Notes" : tag}`,
    description: `Browse notes tagged with "${tag}" in the Notes App.`,
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
