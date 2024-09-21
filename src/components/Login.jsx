import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase"; // Import your Firebase configuration
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful, redirect to Profile page
      navigate("/profile");
    } catch (error) {
      console.error("Error signing in:", error.message);
      // Refresh the login page on error
      window.location.reload();
    }
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      const accessKey = import.meta.env.VITE_ACCESS_KEY;
      const apiUrl = import.meta.env.VITE_API_URL;

      try {
        const response = await axios.get(apiUrl);
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching photos from Unsplash:", error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1718027808460-7069cf0ca9ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex w-full max-w-4xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Login
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-black mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="mb-6">
              <label className="block text-black mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="text-center mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
              >
                Submit
              </button>
            </div>
            <div className="text-center">
              <p className="text-white">
                Not a user?{" "}
                <span
                  onClick={() => navigate("/registration")}
                  className="text-blue-400 cursor-pointer hover:underline"
                >
                  Sign up
                </span>
              </p>
            </div>
          </form>
        </div>
        <div className="w-1/2 p-8 bg-white bg-opacity-70 text-gray-800">
          <h2 className="text-2xl font-bold mb-4">
            Please login to explore more
          </h2>
          <p className="text-lg mb-6">
            Your photography is a record of your living, for anyone who really
            sees.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <img
                key={photo.id}
                src={photo.urls.small}
                alt={photo.alt_description}
                className="rounded-lg shadow-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
