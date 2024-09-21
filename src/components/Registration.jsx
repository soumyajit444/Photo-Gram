import { auth, db } from "../config/firebase"; // Import your Firebase configuration
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      // Create user in Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;
      // Store additional user information in Firestore
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          userId: user.uid, // Use Firebase Authentication user ID as document ID
          firstName: firstName,
          lastName: lastName,
          password: password, // Storing plain text passwords is not recommended
          email: user.email,
          country: country,
          address: address,
        });
      }
      navigate("/login");
      console.log(
        "User created and additional information stored in Firestore"
      );
    } catch (error) {
      console.error(
        "Error creating user and storing additional information: ",
        error
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(
          "https://images.unsplash.com/photo-1718376282529-65d511527225?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        )`,
      }}
    >
      <form
        onSubmit={handleRegistration}
        className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-md rounded-lg shadow-lg p-6 md:p-12 w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-200 text-center">
          User Information
        </h2>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">First Name</label>
          <input
            type="text"
            placeholder="Enter your First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Last Name</label>
          <input
            type="text"
            placeholder="Enter your Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Country</label>
          <input
            type="text"
            placeholder="Enter your Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Address</label>
          <textarea
            placeholder="Enter your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
