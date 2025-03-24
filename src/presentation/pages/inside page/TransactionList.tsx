
import React, { useEffect } from "react";
import { useTransactionContext } from "../../../infrastructure/context/TransactionContext";
import { useNavigate } from "react-router-dom";

const TransactionList: React.FC = () => {
  const { transactions, fetchTransactions, deleteTransaction } = useTransactionContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleEdit = (transaction_id: number) => {
    const transaction = transactions.find((t) => t.transaction_id === transaction_id);
    if (transaction) {
      navigate("/issuing", { state: transaction }); 
    }
  };

  const handleDelete = async (transaction_id: number) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      await deleteTransaction(transaction_id);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-[#255D81]">Transaction Lists</h2>
      <table className="w-full border-collapse border border-[#255D81]">
        <thead>
          <tr className="bg-[#6A6A6A] text-white">
            <th className="border border-[#255D81] px-4 py-2">Transaction ID</th>
            <th className="border border-[#255D81] px-4 py-2">Student Name</th>
            <th className="border border-[#255D81] px-4 py-2">Librarian Name</th>
            <th className="border border-[#255D81] px-4 py-2">Book Name</th>
            <th className="border border-[#255D81] px-4 py-2">Transaction Type</th>
            <th className="border border-[#255D81] px-4 py-2">Borrowed Date</th>
            <th className="border border-[#255D81] px-4 py-2">Due Date</th>
            <th className="border border-[#255D81] px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.transaction_id}>
              <td className="border border-[#255D81] px-4 py-2">{transaction.transaction_id}</td>
              <td className="border border-[#255D81] px-4 py-2">{transaction.student_name}</td>
              <td className="border border-[#255D81] px-4 py-2">{transaction.librarian_name}</td>
              <td className="border border-[#255D81] px-4 py-2">{transaction.book_name}</td>
              <td className="border border-[#255D81] px-4 py-2">{transaction.transaction_type}</td>
              <td className="border border-[#255D81] px-4 py-2">{transaction.borrowed_date}</td>
              <td className="border border-[#255D81] px-4 py-2">{transaction.due_date}</td>
              <td className="border border-[#255D81] px-4 py-2">
                <button
                  onClick={() => handleEdit(transaction.transaction_id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(transaction.transaction_id)}
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
  );
};

export default TransactionList;