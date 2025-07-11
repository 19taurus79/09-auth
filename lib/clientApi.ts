import { nextServer } from "./api";

export type LoginRequest = {
  email: string;
  password: string;
};
export type RegisterRequest = {
  email: string;
  password: string;
};
export type User = {
  username: string;
  email: string;
  avatar: string;
};
export type ServerBoolResponse = {
  success: boolean;
};
export type PatchUser = {
  username: string;
  email: string;
};
export type GetNotesParams = {
  search?: string;
  page: number;
  tag?: string | "";
  perPage?: number;
  sortBy?: string;
};
export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tag: string;
};
export type GetNotesResponse = {
  notes: Note[];
  totalPages: number;
};
interface CreateNoteParams {
  title: string;
  content?: string;
  tag: string;
}
export const login = async (payload: LoginRequest) => {
  const { data } = await nextServer.post<User>(`/auth/login`, payload);
  return data;
};
export const register = async (payload: RegisterRequest) => {
  const { data } = await nextServer.post<User>(`/auth/register`, payload);
  return data;
};
export const logOut = async () => {
  await nextServer.post<ServerBoolResponse>(`/auth/logout`);
};
export const checkSession = async () => {
  const { data } = await nextServer<ServerBoolResponse>(`/auth/session`);
  return data.success;
};
export const getMe = async () => {
  const { data } = await nextServer<User>(`/users/me`);
  return data;
};
export const patchMe = async (patchUser: PatchUser) => {
  const { data } = await nextServer.patch<User>(`/users/me`, patchUser);
  return data;
};

export const getNotes = async ({
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

  const res = await nextServer<GetNotesResponse>("/notes", {
    params,
  });

  return res.data;
};

export const getNoteById = async (id: number): Promise<Note> => {
  const res = await nextServer<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async ({
  title,
  content,
  tag,
}: CreateNoteParams): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", { title, content, tag });
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${id}`, {});
  return res.data;
};
