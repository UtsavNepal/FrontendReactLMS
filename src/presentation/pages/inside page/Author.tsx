
import React, { useState } from "react";
import { useAuthorContext } from "../../../infrastructure/context/AuthorContext";
import type { Author } from "../../../domain/Author"; // Type-only import

const Author: React.FC = () => {
  const { authors, addAuthor, updateAuthor, deleteAuthor } = useAuthorContext();
  const [formData, setFormData] = useState<Author>({
    AuthorID: 0, // Initialize AuthorID to 0 (or null if needed)
    Name: "",
    Bio: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      await updateAuthor(editId, formData);
      setEditId(null);
    } else {
      await addAuthor(formData);
    }
    setFormData({ AuthorID: 0, Name: "", Bio: "" }); // Reset form data
  };

  const handleEdit = (author: Author) => {
    setFormData(author);
    setEditId(author.AuthorID);
  };

  const handleDelete = async (id: number) => {
    await deleteAuthor(id);
  };

  return (
    <div className="h-screen p-6 "> 
      <h1 className="text-2xl font-bold mb-6">Add Author</h1>

      <form onSubmit={handleSubmit}>
        {/* AuthorID Field (Visible only in Edit Mode) */}
        {editId !== null && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Author ID</label>
              <input
                type="text"
                name="AuthorID"
                value={formData.AuthorID}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg border-[#D9D9D9]"
                placeholder="Author ID"
                disabled // Disable editing of AuthorID
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Author Name</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg border-[#D9D9D9]"
              placeholder="Enter Author Name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <input
              type="text"
              name="Bio"
              value={formData.Bio}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg border-[#D9D9D9]"
              placeholder="Enter Bio"
              required
            />
          </div>
        </div>

        <button type="submit" className="bg-[#255D81] text-white px-4 py-2 rounded-lg hover:bg-[#1A455D]">
          {editId !== null ? "Update Author" : "Add Author"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-[#255D81]">Author Lists</h2>
        <div className="max-h-96 overflow-y-auto"> {/* Limit height and make it scrollable */}
          <table className="w-full border-collapse border border-[#255D81]">
            <thead>
              <tr className="bg-[#6A6A6A] text-white">
                <th className="border border-[#255D81] px-4 py-2">Author ID</th>
                <th className="border border-[#255D81] px-4 py-2">Author Name</th>
                <th className="border border-[#255D81] px-4 py-2">Bio</th>
                <th className="border border-[#255D81] px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.AuthorID}>
                  <td className="border border-[#255D81] px-4 py-2">{author.AuthorID}</td>
                  <td className="border border-[#255D81] px-4 py-2">{author.Name}</td>
                  <td className="border border-[#255D81] px-4 py-2">{author.Bio}</td>
                  <td className="border border-[#255D81] px-4 py-2">
                    <button
                      onClick={() => handleEdit(author)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(author.AuthorID)}
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
    </div>
  );
};

export default Author;