"use client";

import NotePreview from "../../../../components/NotePreview/NotePreview";

export interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  return <NotePreview id={id} />;
}
