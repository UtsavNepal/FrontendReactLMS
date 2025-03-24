// src/contexts/BookContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { Book } from "../../domain/BookEntities";
import { BookRepository } from "../repositories/BookRepositories";

interface BookContextType {
  books: Book[];
  fetchBooks: () => Promise<void>;
  addBook: (book: Omit<Book, "BookId">) => Promise<void>;
  updateBook: (id: number, book: Partial<Book>) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const repository = new BookRepository();

  const fetchBooks = async () => {
    const data = await repository.getAll();
    setBooks(data);
  };

  const addBook = async (book: Omit<Book, "BookId">) => {
    const newBook: Book = await repository.post("/", book);
    setBooks((prev) => [...prev, newBook]);
  };

  const updateBook = async (id: number, book: Partial<Book>) => {
    const updatedBook: Book = await repository.put(`/${id}/`, book);
    setBooks((prev) =>
      prev.map((b) => (b.BookId === id ? { ...b, ...updatedBook } : b))
    );
  };

  const deleteBook = async (id: number) => {
    await repository.delete(`/${id}/`);
    setBooks((prev) => prev.filter((b) => b.BookId !== id));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{ books, fetchBooks, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used within a BookProvider");
  }
  return context;
};