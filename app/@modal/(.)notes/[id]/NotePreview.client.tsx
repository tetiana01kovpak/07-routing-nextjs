"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Modal from "../../../../components/Modal/Modal";
import css from "../../../../components/NotePreview/NotePreview.module.css";
import { fetchNoteById } from "../../../../lib/api";

export interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const noteQuery = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={() => router.back()}>
      <button type="button" onClick={() => router.back()}>
        Close
      </button>

      {noteQuery.isLoading ? (
        <p>Loading, please wait...</p>
      ) : noteQuery.isError || !noteQuery.data ? (
        <p>Something went wrong.</p>
      ) : (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{noteQuery.data.title}</h2>
              <span className={css.tag}>{noteQuery.data.tag}</span>
            </div>
            <p className={css.content}>{noteQuery.data.content}</p>
            <p className={css.date}>{noteQuery.data.createdAt}</p>
          </div>
        </div>
      )}
    </Modal>
  );
}
