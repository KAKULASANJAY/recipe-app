import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setError('Please enter a valid search term.');
      return;
    }
    setError('');
    setLoading(true); // Start loading

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=66b00d5cfb5c45f7a198f39dc8f5490a&query=${search}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch recipes. Please try again.');
      }
      const data = await response.json();
      setRecipes(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="app-container">
      <center>
        <h4>Food Recipe App</h4>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a recipe..."
          />
          <input type="submit" value="Search" />
        </form>
        {error && <p>{error}</p>}
        {loading ? (
          <div className="loader"></div> // Show the loader while fetching data
        ) : (
          <div className="recipe-container">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div key={recipe.id} className="recipe">
                  <h5>{recipe.title}</h5>
                  <img src={recipe.image} alt={recipe.title} />
                </div>
              ))
            ) : (
              <p>No recipes found. Try a different search term!</p>
            )}
          </div>
        )}
      </center>
      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear(2024)} sanjaykakula. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default App;
