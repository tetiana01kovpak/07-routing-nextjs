"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../lib/api";
import css from "./NotePreview.module.css";

export interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const noteQuery = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  if (noteQuery.isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (noteQuery.isError || !noteQuery.data) {
    return <p>Something went wrong.</p>;
  }

  const note = noteQuery.data;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}
