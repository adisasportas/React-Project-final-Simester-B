import React from 'react';
import { Link } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import '../CSS/FavoritesPage.css';

const FavoritesPage = () => {
  const { favorites, addToFavorites, isFavorite } = useEmployees();

  return (
    <>
      <h1>Favorites</h1>
      <ul className="favorites-list">
        {favorites.map((worker, index) => (
          <li key={index} className="favorites-item">
            <img src={worker.picture.thumbnail} alt={worker.name.first} className="thumbnail" />
            <div className="details">
              <h5>{worker.name.first} {worker.name.last}</h5>
              <p>Age: {worker.dob.age}</p>
              <p>Location: {worker.location.city}, {worker.location.country}</p>
              <button onClick={() => addToFavorites(worker)}>
                {isFavorite(worker.login.uuid) ? 'Unfavorite' : 'Save Favorite'}
              </button>
              <Link to={`/employee/${worker.login.uuid}`}>
                <button className="more-details">More Details</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default FavoritesPage;
