import React, { useState } from "react";
import { useStudentContext } from "../../../infrastructure/context/StudentContext";
import type { Student } from "../../../domain/Student";

const Student: React.FC = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useStudentContext();
  const [formData, setFormData] = useState<Omit<Student, "student_id">>({
    name: "",
    email: "",
    contact_number: "",
    department: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      await updateStudent(editId, formData);
      setEditId(null);
    } else {
      await addStudent(formData);
    }
    setFormData({ name: "", email: "", contact_number: "", department: "" });
  };

  const handleEdit = (student: Student) => {
    setFormData(student);
    setEditId(student.student_id);
  };

  const handleDelete = async (id: number) => {
    await deleteStudent(id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add Students</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Full name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg border-[#D9D9D9]"
              placeholder="Enter Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg border-[#D9D9D9]"
              placeholder="Enter Department"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg border-[#D9D9D9]"
              placeholder="Enter Email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Contact No.</label>
            <input
              type="text"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg border-[#D9D9D9]"
              placeholder="Enter Contact No."
              required
            />
          </div>
        </div>

        <button type="submit" className="bg-[#255D81] text-white px-4 py-2 rounded-lg hover:bg-[#1A455D]">
          {editId !== null ? "Update Student" : "Add Student"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-[#255D81]">Student Lists</h2>
        <table className="w-full border-collapse border border-[#255D81]">
          <thead>
            <tr className="bg-[#6A6A6A] text-white">
              <th className="border border-[#255D81] px-4 py-2">Student ID</th>
              <th className="border border-[#255D81] px-4 py-2">Name</th>
              <th className="border border-[#255D81] px-4 py-2">Department</th>
              <th className="border border-[#255D81] px-4 py-2">Email</th>
              <th className="border border-[#255D81] px-4 py-2">Contact No.</th>
              <th className="border border-[#255D81] px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.student_id}>
                <td className="border border-[#255D81] px-4 py-2">{student.student_id}</td>
                <td className="border border-[#255D81] px-4 py-2">{student.name}</td>
                <td className="border border-[#255D81] px-4 py-2">{student.department}</td>
                <td className="border border-[#255D81] px-4 py-2">{student.email}</td>
                <td className="border border-[#255D81] px-4 py-2">{student.contact_number}</td>
                <td className="border border-[#255D81] px-4 py-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.student_id)}
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

export default Student;