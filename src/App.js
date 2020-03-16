import React, { useEffect, useState } from 'react';
import { Recipe } from './components/recipe/recipe.component'; //me traigo la receta
import { SearchBox } from './components/search-box/search-box.component';
import { SearchFilter } from './components/search-filter/search-filter.component';
import './App.css';

const App = () => {
  const APP_ID = '5f3dff1f';
  //c2b98cb7
  const APP_KEY = '99609981fefd375ae9c462e98ec26b09';
  //f0869bf01680a8472affea83a20507fa

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => { //se ejecuta después de cada renderizado, por tanto no tengo que hacer mil peticiones, sino solo una
    const getRecipes = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json(); //formato json
      console.log(data);
      setRecipes(data.hits); //guardar los diferentes platos
      console.log(data.hits);
    };
    getRecipes();
  }, [query]); //se actualiza solo cuando lo envío, no cada vez que el usuario escribe

  const updateSearch = e => {
    setSearch(e.target.value); //actualizo el estado de la busqueda, que viene de searchBox
    console.log(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search); //modifico el state cuando ya le pase el parametro de busqueda
    console.log(search);
  };

  const filterLogic = e => {
    e.target.classList.toggle('active-filter');
    const li = e.target;
    if (li.classList.contains('active-filter')) {
      setQuery(li.innerText); //reemplaza el contenido cuando se activa el toggle
    } else {
      setQuery(''); //sino limpia el state de la query
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="title">Recetas Millennials</h1>
        <form onSubmit={getSearch} className="search-form">
          <SearchBox updateSearch={updateSearch} placeholder="Search recipe" />
        </form>
        <div className="search-filter">
          <SearchFilter filterLogic={filterLogic} />
        </div>
      </header>
      <div className="recipes">
        {recipes.map((recipe, index) => ( //recorro mis recipes
          <Recipe
            key={index}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
