import React, { createContext, useContext, useState, useEffect } from "react";
import { Student } from "../../domain/Student";
import { StudentRepository } from "../repositories/StudentRepository";

interface StudentContextType {
  students: Student[];
  fetchStudents: () => Promise<void>;
  addStudent: (student: Omit<Student, "student_id">) => Promise<void>;
  updateStudent: (id: number, student: Partial<Student>) => Promise<void>;
  deleteStudent: (id: number) => Promise<void>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const repository = new StudentRepository();

  const fetchStudents = async () => {
    const data = await repository.getAll();
    setStudents(data);
  };

  const addStudent = async (student: Omit<Student, "student_id">) => {
    const newStudent: Student = await repository.post("/", student);
    setStudents((prev) => [...prev, newStudent]);
  };

  const updateStudent = async (id: number, student: Partial<Student>) => {
    const updatedStudent: Student = await repository.put(`/${id}/`, student);
    setStudents((prev) =>
      prev.map((s) => (s.student_id === id ? { ...s, ...updatedStudent } : s))
    );
  };

  const deleteStudent = async (id: number) => {
    await repository.delete(`/${id}/`);
    setStudents((prev) => prev.filter((s) => s.student_id !== id));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <StudentContext.Provider value={{ students, fetchStudents, addStudent, updateStudent, deleteStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudentContext must be used within a StudentProvider");
  }
  return context;
};