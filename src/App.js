import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = '8d85cefcb9e3a57ee9da979cb40a3379';

const MovieRecommendationApp = () => {
  const [genre, setGenre] = useState('');
  const [movies, setMovies] = useState([]);

  const fetchMovies = () => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setMovies(data.results));
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre]);

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMovies();
  };

  return (
    <div className="movie-app-container">
      <h1 className="movie-app-title">Movie Recommendation App</h1>
      <form onSubmit={handleSubmit}>
        <label className="movie-app-label">
          Select a genre: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <select className="movie-app-select" value={genre} onChange={handleGenreChange}>
            <option value="">-- Select Genre --</option>
            <option value="28">Action</option>
            <option value="35">Comedy</option>
            <option value="18">Drama</option>
            {/* Add more genre options */}
          </select>
        </label>
      </form>
      <h2 className="movie-app-subtitle">Movie Recommendations:</h2>
      <div className="movie-app-card-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-app-card">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="movie-app-card-image"
              />
            ) : (
              <div className="movie-app-card-placeholder">No Image</div>
            )}
            <div className="movie-app-card-content">
              <h3 className="movie-app-card-title">{movie.title}</h3>
              <p className="movie-app-card-overview">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendationApp;
