import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();

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

  const handleLearnMoreClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center">
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1718473673817-11fe56c0ff92?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        }}
      >
        <div className="bg-black bg-opacity-50 py-20 px-6 sm:px-12 lg:px-24 rounded-lg shadow-lg text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Discover Photo-Gram</h1>
          <p className="text-lg mb-6">
            Welcome to Photo-Gram, the ultimate platform for photographers to
            share their creative art. Our website is designed to help
            photographers showcase their work, connect with others in the
            community, and find inspiration from a diverse range of photography
            styles.
          </p>
          <p className="text-lg mb-6">
            Whether you are a professional photographer or just starting,
            Photo-Gram provides a space for you to upload your photos, explore
            the work of others, and participate in discussions about all things
            photography. Join us and be part of a vibrant community of creative
            individuals.
          </p>
          <button
            onClick={handleLearnMoreClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg inline-block transition duration-300 ease-in-out"
          >
            Learn More
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

export default Home;
