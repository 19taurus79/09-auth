"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import css from "../../app/notes/App.module.css";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import Pagination from "@/components/Pagination/Pagination";
import NoteModal from "@/components/NoteModal/NoteModal";
import SearchBar from "@/components/SearchBox/SearchBox";
import css from "./Note.client.module.css";
export default function NotesClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 300);

  const { data } = useQuery({
    queryKey: ["notes", currentPage, debouncedQuery],
    queryFn: () => fetchNotes({ search: debouncedQuery, page: currentPage }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes;
  const totalPages = data?.totalPages;
  const togleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBar
          value={searchQuery}
          onSearch={setSearchQuery}
          setPage={setCurrentPage}
        />
        {totalPages && totalPages > 1 && (
          <Pagination
            totalPages={totalPages || 1}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={togleModal}>
          Create note +
        </button>
      </header>
      {notes && <NoteList notes={notes} />}
      {isModalOpen && <NoteModal onClose={togleModal} />}
    </div>
  );
}
