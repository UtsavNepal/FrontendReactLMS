// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './presentation/component/Nabar';
import Dashboard from './presentation/pages/inside page/Dashboard';
import Author from './presentation/pages/inside page/Author';
import Book from './presentation/pages/inside page/Book';
import Student from './presentation/pages/inside page/Student';
import TransactionList from './presentation/pages/inside page/TransactionList';
import Issuing from './presentation/pages/inside page/Issuing';
import LoginPage from './presentation/pages/mainpage/LoginPage';
import { AuthProvider } from './infrastructure/context/AuthContext'; 
import Provider from './infrastructure/provider/provider';



const App: React.FC = () => {
  return (
    <AuthProvider>
      <Provider>
      <Router>
        <Routes>
        
          <Route path="/" element={<Navigate to="/login" />} />
          
         
          <Route path="/login" element={<LoginPage />} />
          
          {/* Internal pages with Navbar */}
          <Route
            path="/*"
            element={
              <div className="flex h-screen w-screen overflow-hidden">
                <Navbar />
                <div className="ml-[222px] flex-grow h-screen overflow-y-auto bg-gray-100">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/author" element={<Author />} />
                    <Route path="/book" element={<Book />} />
                    <Route path="/student" element={<Student />} />
                    <Route path="/transaction" element={<TransactionList />} />
                    <Route path="/issuing" element={<Issuing />} />
                 
                  </Routes>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
      </Provider>
    </AuthProvider>
  );
};

export default App;