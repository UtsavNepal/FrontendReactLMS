import React, { useState, useEffect } from "react";
import { useBookContext } from "../../../infrastructure/context/BookContext";
import { useAuthorContext } from "../../../infrastructure/context/AuthorContext";
import type { Book } from "../../../domain/BookEntities"; // Type-only import

const Book: React.FC = () => {
  const { books, addBook, updateBook, deleteBook } = useBookContext();
  const { authors } = useAuthorContext(); // Fetch authors for the dropdown
  const [formData, setFormData] = useState<Omit<Book, "BookId">>({
    Title: "",
    author: 0, // Use AuthorID directly
    Genre: "",
    ISBN: "",
    Quantity: 0,
  });
  const [editId, setEditId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      await updateBook(editId, formData);
      setEditId(null);
    } else {
      await addBook(formData);
    }
    setFormData({ Title: "", author: 0, Genre: "", ISBN: "", Quantity: 0 }); // Reset form data
  };

  const handleEdit = (book: Book) => {
    setFormData(book);
    setEditId(book.BookId);
  };

  const handleDelete = async (id: number) => {
    await deleteBook(id);
  };

  return (
    <div className="m-6">
      <h1 className="text-2xl font-bold mb-6">Add Book</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              name="Title"
              value={formData.Title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg border-[#D9D9D9]"
              placeholder="Enter Title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Author</label>
            <select
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg border-[#D9D9D9]"
              required
            >
              <option value={0}>Select Author</option>
              {authors.map((author) => (
                <option key={author.AuthorID} value={author.AuthorID}>
                  {author.Name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Genre</label>
            <input
              type="text"
              name="Genre"
              value={formData.Genre}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg border-[#D9D9D9]"
              placeholder="Enter Genre"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">ISBN</label>
            <input
              type="text"
              name="ISBN"
              value={formData.ISBN}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg border-[#D9D9D9]"
              placeholder="Enter ISBN"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <input
              type="number"
              name="Quantity"
              value={formData.Quantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg border-[#D9D9D9]"
              placeholder="Enter Quantity"
              required
            />
          </div>
        </div>

        <button type="submit" className="bg-[#255D81] text-white px-4 py-2 rounded-lg hover:bg-[#1A455D]">
          {editId !== null ? "Update Book" : "Add Book"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-[#255D81]">Book Lists</h2>
        <table className="w-full border-collapse border border-[#255D81]">
          <thead>
            <tr className="bg-[#6A6A6A] text-white">
              <th className="border border-[#255D81] px-4 py-2">Book ID</th>
              <th className="border border-[#255D81] px-4 py-2">Title</th>
              <th className="border border-[#255D81] px-4 py-2">Author</th>
              <th className="border border-[#255D81] px-4 py-2">Genre</th>
              <th className="border border-[#255D81] px-4 py-2">ISBN</th>
              <th className="border border-[#255D81] px-4 py-2">Quantity</th>
              <th className="border border-[#255D81] px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.BookId}>
                <td className="border border-[#255D81] px-4 py-2">{book.BookId}</td>
                <td className="border border-[#255D81] px-4 py-2">{book.Title}</td>
                <td className="border border-[#255D81] px-4 py-2">
                  {authors.find((a) => a.AuthorID === book.author)?.Name}
                </td>
                <td className="border border-[#255D81] px-4 py-2">{book.Genre}</td>
                <td className="border border-[#255D81] px-4 py-2">{book.ISBN}</td>
                <td className="border border-[#255D81] px-4 py-2">{book.Quantity}</td>
                <td className="border border-[#255D81] px-4 py-2">
                  <button
                    onClick={() => handleEdit(book)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.BookId)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Book;