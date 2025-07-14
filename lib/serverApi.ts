import { cookies } from "next/headers";
import { nextServer } from "./api";
import { GetNotesParams, GetNotesResponse, Note } from "./clientApi";

export const getServerNotes = async ({
  search,
  page,
  tag,
}: GetNotesParams): Promise<GetNotesResponse> => {
  const params = {
    page,
    perPage: 12,
    ...(search && { search }),
    ...(tag && { tag }),
  };
  const cookieStore = await cookies();
  const res = await nextServer<GetNotesResponse>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const getServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const res = await nextServer<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};
