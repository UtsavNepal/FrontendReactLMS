// src/contexts/TransactionContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { Transaction } from "../../domain/Transaction.Entity";
import { TransactionRepository } from "../repositories/TransactionRepository";

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: () => Promise<void>;
  createTransaction: (transaction: Omit<Transaction, "transaction_id">) => Promise<void>;
  updateTransaction: (id: number, transaction: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const repository = new TransactionRepository();

  const fetchTransactions = async () => {
    try {
      const data = await repository.getAll();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const createTransaction = async (transaction: Omit<Transaction, "transaction_id">) => {
    try {
      const newTransaction = await repository.post("/", transaction);
      setTransactions((prev) => [...prev, newTransaction]);
    } catch (error) {
      console.error("Failed to create transaction:", error);
      throw error;
    }
  };

  const updateTransaction = async (id: number, transaction: Partial<Transaction>) => {
    try {
      const updatedTransaction = await repository.put(`/${id}/`, transaction);
      setTransactions((prev) =>
        prev.map((t) => (t.transaction_id === id ? { ...t, ...updatedTransaction } : t))
      );
    } catch (error) {
      console.error("Failed to update transaction:", error);
      throw error;
    }
  };

  const deleteTransaction = async (id: number) => {
    try {
      await repository.delete(`/${id}/`);
      setTransactions((prev) => prev.filter((t) => t.transaction_id !== id));
    } catch (error) {
      console.error("Failed to delete transaction:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransactions, createTransaction, updateTransaction, deleteTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactionContext must be used within a TransactionProvider");
  }
  return context;
};