import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";
// import { useState } from "react";
export const metadata: Metadata = {
  title: "Notes Hub | Create Note",
  description: "Create a new note in Notes App.",
  openGraph: {
    title: "Notes Hub | Create Note",
    description: "Create a new note in Notes App.",
    url: `https://08-zustand-nu.vercel.app/notes/action/create`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create a new note in Notes Hub",
      },
    ],
    type: "article",
  },
};
function CreateNote() {
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const togleModal = () => setIsModalOpen(!isModalOpen);
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

export default CreateNote;
