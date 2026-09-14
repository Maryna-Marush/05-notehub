import React, { useState } from 'react';
import {
  useQuery,
  keepPreviousData,
} from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import css from './App.module.css';
const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const updateSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 300);
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateSearch(value);
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
      }),
    placeholderData: keepPreviousData,
  });
  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };
  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            forcePage={page - 1}
            onPageChange={handlePageChange}
          />
        )}
        <button
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>
      <main>
        {isLoading && <p>Loading notes...</p>}
        {isError && (
          <p>Error loading notes. Check token or connection.</p>
        )}
        {!isLoading && !isError && (
          <NoteList notes={notes} />
        )}
      </main>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};
export default App;