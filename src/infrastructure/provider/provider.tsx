import React from 'react';
// import { AuthProvider } from '../context/AuthContext';
import { TransactionProvider } from '../context/TransactionContext';
import { StudentProvider } from '../context/StudentContext';
import { AuthorProvider } from '../context/AuthorContext';
import { BookProvider } from '../context/BookContext';
import { DashboardProvider } from '../context/DashboardContext';


// Add other providers here if needed (e.g., ThemeProvider, ReduxProvider, etc.)

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
   
    <StudentProvider>
     
      <AuthorProvider>
        <BookProvider>
      <TransactionProvider>
        <DashboardProvider>
        {children}
        </DashboardProvider>
      </TransactionProvider>
      </BookProvider>
      </AuthorProvider>
      </StudentProvider>
     
 
  );
};

export default Provider;