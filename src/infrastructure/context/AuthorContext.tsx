// src/contexts/AuthorContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { Author } from "../../domain/Author";
import { AuthorRepository } from "../repositories/AuthorRepository";

interface AuthorContextType {
  authors: Author[];
  fetchAuthors: () => Promise<void>;
  addAuthor: (author: Omit<Author, "author_id">) => Promise<void>;
  updateAuthor: (id: number, author: Partial<Author>) => Promise<void>;
  deleteAuthor: (id: number) => Promise<void>;
}

const AuthorContext = createContext<AuthorContextType | undefined>(undefined);

export const AuthorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const repository = new AuthorRepository();

  const fetchAuthors = async () => {
    const data = await repository.getAll();
    setAuthors(data);
  };

  const addAuthor = async (author: Omit<Author, "AuthorID">) => {
    const newAuthor: Author = await repository.post("/", author);
    setAuthors((prev) => [...prev, newAuthor]);
  };

  const updateAuthor = async (id: number, author: Partial<Author>) => {
    const updatedAuthor: Author = await repository.put(`/${id}/`, author);
    setAuthors((prev) =>
      prev.map((a) => (a.AuthorID === id ? { ...a, ...updatedAuthor } : a))
    );
  };

  const deleteAuthor = async (id: number) => {
    await repository.delete(`/${id}/`);
    setAuthors((prev) => prev.filter((a) => a.AuthorID !== id));
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <AuthorContext.Provider value={{ authors, fetchAuthors, addAuthor, updateAuthor, deleteAuthor }}>
      {children}
    </AuthorContext.Provider>
  );
};

export const useAuthorContext = () => {
  const context = useContext(AuthorContext);
  if (!context) {
    throw new Error("useAuthorContext must be used within an AuthorProvider");
  }
  return context;
};