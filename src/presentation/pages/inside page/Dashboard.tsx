
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Card from "../../component/ui/card";
import { FaUsers, FaBook, FaUniversity } from "react-icons/fa";
import { useDashboard } from "../../../infrastructure/context/DashboardContext";
import { useAuth } from "../../../infrastructure/context/AuthContext";

const Dashboard: React.FC = () => {
  const { dashboardData, loading } = useDashboard();
  const { users } = useAuth(); // Destructure users from useAuth

  if (loading) {
    return <div>Loading...</div>;
  }

  // Data for Pie Chart
  const pieData = [
    { name: "Borrowed Books", value: dashboardData.total_borrowed_books },
    { name: "Returned Books", value: dashboardData.total_returned_books },
  ];
  const COLORS = ["#1E3A8A", "#60A5FA"];

  // Calculate remaining books
  const remainingBooks =
    dashboardData.total_books -
    (dashboardData.total_borrowed_books + dashboardData.total_returned_books);

  // Get the user_name of the first user in the users array (logged-in user)
  const userName = users.length > 0 ? users[0].user_name : "Guest";

  return (
    <div className="w-full h-screen flex bg-gray-100 overflow-hidden">
      {/* Main Content */}
      <div className="flex-grow p-6 overflow-hidden">
        {/* User Info */}
        <div className="flex items-center justify-end mb-4">
          <span className="font-semibold">{userName}</span> {/* Display the user_name */}
          <span className="text-sm text-gray-500 ml-2">Admin</span>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Pie Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 flex justify-center">
            <PieChart width={250} height={250}>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* Cards */}
          <div className="flex flex-col space-y-4">
            <Card
              icon={<FaUsers />}
              value={dashboardData.total_students.toString()}
              label="Total User Base"
            />
            <Card
              icon={<FaBook />}
              value={dashboardData.total_books.toString()}
              label="Total Book Count"
            />
            <Card icon={<FaUniversity />} value="0010" label="Branch Count" />
          </div>
        </div>

        {/* Overdue Borrowers List */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md w-96 max-h-48 overflow-y-auto">
          <h3 className="font-semibold text-lg mb-2">Overdue Borrowers</h3>
          <ul className="space-y-2">
            {dashboardData.overdue_borrowers.map((borrower, index) => (
              <li key={index} className="flex justify-between p-2 border rounded-md">
                <span>
                  {borrower.student_name} (TransactionId: {borrower.transaction_id})
                </span>
                <span className="text-sm text-red-500">Overdue</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;