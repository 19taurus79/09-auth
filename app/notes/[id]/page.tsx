import { fetchNoteById } from "@/lib/api";
import NoteDetailClient from "./NoteDetails.client";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: number }>;
};
const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  // const note = await fetchNoteById(id);
  // console.log(id);
  // console.log(note);
  // console.log(await params);
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailClient />
    </HydrationBoundary>
  );
};
export default NoteDetails;
