"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { useState } from "react";
import type { NoteTag } from "../../../../types/note";
import { fetchNotes } from "../../../../lib/api";
import Modal from "../../../../components/Modal/Modal";
import NoteForm from "../../../../components/NoteForm/NoteForm";
import NoteList from "../../../../components/NoteList/NoteList";
import Pagination from "../../../../components/Pagination/Pagination";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import css from "../../NotesPage.module.css";

const PER_PAGE = 12;

export interface NotesClientProps {
	initialPage?: number;
	initialSearch?: string;
	initialTag?: NoteTag;
}

export default function NotesClient({
	initialPage = 1,
	initialSearch = "",
	initialTag,
}: NotesClientProps) {
	const [page, setPage] = useState(initialPage);
	const [search, setSearch] = useState(initialSearch);
	const tag = initialTag;
	const [isModalOpen, setModalOpen] = useState(false);
	const [debouncedSearch] = useDebounce(search, 500);

	const notesQuery = useQuery({
		queryKey: ["notes", tag ?? "all", page, PER_PAGE, debouncedSearch],
		queryFn: () =>
			fetchNotes({
				page,
				perPage: PER_PAGE,
				search: debouncedSearch.trim() || undefined,
				tag,
			}),
		placeholderData: keepPreviousData,
	});

	if (notesQuery.isError) {
		throw notesQuery.error instanceof Error
			? notesQuery.error
			: new Error("Could not fetch the list of notes.");
	}

	const notes = notesQuery.data?.notes ?? [];
	const totalPages = notesQuery.data?.totalPages ?? 0;
	const showPagination = totalPages > 1;

	const handleSearchChange = (value: string) => {
		setSearch(value);
		setPage(1);
	};

	const closeModal = () => setModalOpen(false);
	const handleCreateSuccess = () => {
		setPage(1);
		setModalOpen(false);
	};

	const canShowList = notes.length > 0;
	const showEmptyState = !notesQuery.isPending && !canShowList;

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				<SearchBox value={search} onChange={handleSearchChange} />
				{showPagination && (
					<Pagination
						pageCount={totalPages}
						currentPage={page}
						onChange={setPage}
					/>
				)}
				<button className={css.button} onClick={() => setModalOpen(true)}>
					Create note +
				</button>
			</header>

			{notesQuery.isPending && <p>Loading, please wait...</p>}
			{canShowList && <NoteList notes={notes} />}
			{showEmptyState && <p>No notes yet.</p>}

			{isModalOpen && (
				<Modal onClose={closeModal}>
					<NoteForm onCancel={closeModal} onSuccess={handleCreateSuccess} />
				</Modal>
			)}
		</div>
	);
}
