import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
      <div className={css.wrap}>
        <p>Developer: Tetiana</p>
        <p>
          Contact us: <a href="mailto:tetiana@notehub.app">tetiana@notehub.app</a>
        </p>
      </div>
    </footer>
  );
}
