import type { ReactNode } from "react";
import css from "./LayoutNotes.module.css";

export default function FilterNotesLayout({
  children,
  sidebar,
  modal,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
      {modal}
    </div>
  );
}
