import { getServerNoteById } from "@/lib/api/serverApi";
import NoteDetailClient from "./NoteDetails.client";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const noteId = id; // Перетворення id у число
  const note = await getServerNoteById(noteId);

  return {
    title: `Notes Hub | ${note.title}`,
    description: note.content,
    openGraph: {
      title: `Notes Hub | ${note.title}`,
      description: note.content,
      url: `https://08-zustand-nu.vercel.app/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: "article",
    },
  };
}
const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const noteId = id; // Перетворення id у число
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => getServerNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
