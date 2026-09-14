import axios from 'axios';
import type { Note, NewNote } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const noteApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  totalNotes: number;
  page: number;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search = '' } = params;
  const response = await noteApi.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search: search || undefined,
    },
  });
  return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await noteApi.post<Note>('/notes', newNote);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await noteApi.delete<Note>(`/notes/${id}`);
  return response.data;
};
