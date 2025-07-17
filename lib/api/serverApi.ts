import { cookies } from "next/headers";
import { nextServer } from "../api/api";
import {
  GetNotesParams,
  GetNotesResponse,
  ServerBoolResponse,
} from "../api/clientApi";
import { Note } from "@/types/note";
import { User } from "@/types/user";

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

export const checkServerSession = async () => {
  const cookieData = await cookies();
  const response = await nextServer<ServerBoolResponse>(`/auth/session`, {
    headers: { Cookie: cookieData.toString() },
  });
  return response;
};

export const getServerMe = async () => {
  const cookieData = await cookies();
  const { data } = await nextServer<User>(`/users/me`, {
    headers: { Cookie: cookieData.toString() },
  });
  return data;
};
