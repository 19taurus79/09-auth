import { Note } from "@/types/note";
import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
interface FetchNotesParams {
  search: string;
  page: number;
}
interface CreateNoteParams {
  title: string;
  content?: string;
  tag: string;
}
interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export const fetchNotes = async ({
  search,
  page,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  if (search !== "") {
    return await axios
      .get<FetchNotesResponse>("/notes", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        },
        params: {
          search: search,
          page: page,
          perPage: 12,
        },
      })
      .then((res) => res.data);
  } else {
    return await axios
      .get<FetchNotesResponse>("/notes", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        },
        params: {
          page: page,
          perPage: 12,
        },
      })
      .then((res) => res.data);
  }
};

export const createNote = async ({
  title,
  content,
  tag,
}: CreateNoteParams): Promise<Note> => {
  return await axios
    .post<Note>(
      "/notes",
      { title, content, tag },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        },
      }
    )
    .then((res) => res.data);
};

export const deleteNote = async (id: number): Promise<void> => {
  return await axios
    .delete<void>(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    })
    .then((res) => res.data);
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return res.data;
};
