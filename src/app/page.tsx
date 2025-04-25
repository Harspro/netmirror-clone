'use client';
// Temporary change to force new Vercel build

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const API_KEY = "f6b2d935f3c7e5b1709a8c78b49c69be"; // Example TMDB API Key (replace with yours for production)

// Change function name from App to Page
export default function Page() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const sampleVideos = [
          "https://archive.org/download/NightOfTheLivingDead_201303/NightOfTheLivingDead_512kb.mp4",
          "https://archive.org/download/TheMatrix1999_201904/TheMatrix1999.mp4",
          "https://archive.org/download/Tears-of-Steel/TearsOfSteel_4000.mp4"
        ];
        const mapped = data.results.map((movie, index) => ({
          title: movie.title,
          description: movie.overview,
          thumbnail: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          videoUrl: sampleVideos[index % sampleVideos.length] // cycle through sample videos
        }));
        setMovies(mapped);
      });
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`p-6 min-h-screen ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">NetMirror Clone 🎬</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded text-black"
          />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      {selectedMovie ? (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Now Playing: {selectedMovie.title}</h2>
          <video controls autoPlay className="w-full rounded-lg">
            <source src={selectedMovie.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
            onClick={() => setSelectedMovie(null)}
          >
            Back to Home
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredMovies.map((movie, idx) => (
            <Card
              key={idx}
              className={`${darkMode ? "bg-zinc-800 hover:bg-zinc-700" : "bg-zinc-200 hover:bg-zinc-300"} transition cursor-pointer`}
              onClick={() => setSelectedMovie(movie)}
            >
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className="w-full h-48 object-cover rounded-t"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="text-sm text-zinc-300 dark:text-zinc-700">{movie.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-10 text-center text-sm opacity-70">
        <p>Monetize with: Google AdSense (add your script in the HTML), banner ads, or affiliate links.</p>
        <p>You can use tools like Ezoic or setup your own sponsor ads here too.</p>
        <p>Everyone has open access – no login required.</p>
      </div>
    </div>
  );
}