import { fetchNoteById } from "@/lib/api";
import NoteDetailClient from "./NoteDetails.client";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const noteId = Number(id); // Перетворення id у число
  const note = await fetchNoteById(noteId);

  return {
    title: `Notes Hub | ${note.title}`,
    description: note.content,
    openGraph: {
      title: `Notes Hub | ${note.title}`,
      description: note.content,
      url: `https://yourdomain.com/notes/${id}`,
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
  const noteId = Number(id); // Перетворення id у число
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
