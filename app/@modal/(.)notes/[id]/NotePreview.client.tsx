"use client";
import css from "./NotePreview.client.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import { getNoteById } from "@/lib/clientApi";
const NotePreview = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id),
    refetchOnMount: false,
  });
  const route = useRouter();
  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  const togleModal = () => {
    setIsModalOpen(!isModalOpen);
    route.back();
  };
  // console.log(togleModal);
  return (
    <>
      {isModalOpen && (
        <Modal onClose={togleModal}>
          <div className={css.container}>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{note.title}</h2>
                <span className={css.tag}>{note.tag}</span>
                {/* <button className={css.editBtn}>Edit note</button> */}
              </div>
              <p className={css.content}>{note.content}</p>
              <p className={css.date}>{note.createdAt}</p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NotePreview;
