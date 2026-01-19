"use client";

import { useParams, useRouter } from "next/navigation";
import Modal from "../../../../../components/Modal/Modal";
import NotePreview from "../../../../../components/NotePreview/NotePreview";

export default function NotePreviewModalPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  return (
    <Modal onClose={() => router.back()}>
      <NotePreview id={id} />
    </Modal>
  );
}
