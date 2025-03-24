// context/DashboardContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { DashboardRepository } from "../repositories/DashboardRepository";

interface DashboardData {
  total_borrowed_books: number;
  total_returned_books: number;
  total_books: number;
  total_students: number;
  overdue_borrowers: { transaction_id: number; student_name: string }[];
}

interface DashboardContextType {
  dashboardData: DashboardData;
  loading: boolean;
}

const DashboardContext = createContext<DashboardContextType>({
  dashboardData: {
    total_borrowed_books: 0,
    total_returned_books: 0,
    total_books: 0,
    total_students: 0,
    overdue_borrowers: [],
  },
  loading: true,
});

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    total_borrowed_books: 0,
    total_returned_books: 0,
    total_books: 0,
    total_students: 0,
    overdue_borrowers: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const repository = new DashboardRepository();
      try {
        const [bookSummary, overdueBorrowers] = await Promise.all([
          repository.getBookSummary(),
          repository.getOverdueBorrowers(),
        ]);
        setDashboardData({
          ...bookSummary,
          overdue_borrowers: overdueBorrowers,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardContext.Provider value={{ dashboardData, loading }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);