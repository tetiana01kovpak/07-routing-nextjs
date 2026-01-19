import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note, NoteTag } from "../types/note";

export const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

export const getAuthHeaders = () => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (!token) {
    throw new Error("Missing NEXT_PUBLIC_NOTEHUB_TOKEN");
  }
  return { Authorization: `Bearer ${token}` };
};

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
  sortBy?: "created" | "updated";
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export type CreateNoteResponse = Note;
export type DeleteNoteResponse = Note;

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    headers: getAuthHeaders(),
    params,
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.get(`/notes/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const createNote = async (
  payload: CreateNotePayload
): Promise<CreateNoteResponse> => {
  const response: AxiosResponse<CreateNoteResponse> = await api.post(
    "/notes",
    payload,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const deleteNote = async (id: string): Promise<DeleteNoteResponse> => {
  const response: AxiosResponse<DeleteNoteResponse> = await api.delete(
    `/notes/${id}`,
    { headers: getAuthHeaders() }
  );
  return response.data;
};
