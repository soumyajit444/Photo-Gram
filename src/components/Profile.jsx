import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const accessKey = import.meta.env.VITE_ACCESS_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(apiUrl)
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching photos from Unsplash:", error);
      });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setFirstName(userData.firstName);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1589002615196-a7dc3df5bed3?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen pt-24">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg text-center mx-auto my-8 max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-6">
            Welcome to our website, {firstName}!
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-lg"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white bg-opacity-20 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={photo.urls.regular}
                alt={photo.alt_description}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-white">
                  {photo.user.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
        <footer className="bg-black bg-opacity-70 text-white py-4 w-full text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={scrollToTop}
              className="mt-4 mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg inline-block transition duration-300 ease-in-out"
            >
              Scroll to Top
            </button>
            <p className="text-sm">
              Photography is the art, application, and practice of creating
              durable images by recording light or other electromagnetic
              radiation, either electronically by means of an image sensor, or
              chemically by means of a light-sensitive material such as
              photographic film.
            </p>
            <p className="mt-2">
              © 2024 Photo-Gram. Designed and Published by Photo-Gram Team
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Profile;
