import React, { useState } from "react";
import { useAuth } from "../../../infrastructure/context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password, () => {
        navigate("/dashboard"); 
      });
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{ height: "100vh", width: "100vw" }}
    >
   
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-6 md:p-10">
    
        <img
          src="Book.svg"
          alt="Library Logo"
          className="w-[200px] h-[136px] md:w-[344px] md:h-[234px] mb-6"
        />

        <h2 className="text-xl md:text-2xl font-semibold text-center">
          HSMS Library Management System
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Please enter your credentials
        </p>


        <form onSubmit={handleLogin} className="flex flex-col items-center w-full">
       
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full max-w-[320px] md:w-80 p-3 rounded-[34px] border border-gray-300 mb-4 outline-none focus:ring-2 focus:ring-blue-400"
          />
    
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full max-w-[320px] md:w-80 p-3 rounded-[34px] border border-gray-300 mb-2 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <p className="text-sm text-gray-500 cursor-pointer mb-4">
            Forgot Password?
          </p>

         
          <button
            type="submit"
            className="w-40 bg-blue-600 text-white py-3 rounded-[34px] hover:bg-blue-700"
          >
            Log In
          </button>
        </form>
      </div>

      
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-[#255D81] text-white p-6 md:p-10">
      
        <img
          src="/Book.svg"
          alt="Library Logo"
          className="w-[100px] h-[76px] md:w-[175px] md:h-[132px] mb-6"
        />

        <h2 className="text-xl md:text-2xl font-semibold text-center">
          HSMS Library
        </h2>
        <p className="text-gray-300 mb-6 text-center">
          New to our platform?
          <br /> Register Now
        </p>

        <button className="w-40 bg-white text-[#255D81] py-3 rounded-[34px] hover:bg-gray-200">
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;