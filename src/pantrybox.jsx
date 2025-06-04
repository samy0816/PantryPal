import React, { useState } from 'react';

function PantryBox() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    if (!ingredients.trim()) return;

    setLoading(true);
    const encodedIngredients = encodeURIComponent(ingredients);
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${encodedIngredients}&number=5&ignorePantry=true&ranking=1`;

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '3a29a0732bmsh5d1b5402f38f441p16fb45jsn80da41e80bda',
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Recipe Finder</h1>

      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients (e.g. apples, flour, sugar)"
        style={{ width: '300px', padding: '8px' }}
      />
      <button onClick={fetchRecipes} style={{ marginLeft: '10px', padding: '8px 16px' }}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      <ul style={{ marginTop: '20px' }}>
        {recipes.map((recipe) => (
          <li key={recipe.id} style={{ marginBottom: '20px' }}>
            <strong>{recipe.title}</strong>
            <br />
            <img src={recipe.image} alt={recipe.title} width="150" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PantryBox;
