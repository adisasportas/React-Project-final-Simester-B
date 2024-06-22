import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import '../CSS/HomePage.css';

const HomePage = () => {
    const { employees, addToFavorites, isFavorite, error } = useEmployees();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [companies, setCompanies] = useState([]);
  
    useEffect(() => {
      const uniqueCompanies = [...new Set(employees.map(emp => emp.company))];
      setCompanies(uniqueCompanies);
      setFilteredEmployees(employees);
    }, [employees]);
  
    const handleSearch = (company) => {
      const filtered = employees.filter(emp => emp.company.toLowerCase().includes(company.toLowerCase()));
      setFilteredEmployees(filtered);
    };
  
    const handleInputChange = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      handleSearch(value);
    };
  
    return (
      <>
        <div className="search-form">
          <input
            type="text"
            placeholder="Search by company"
            value={searchTerm}
            onChange={handleInputChange}
            list="companies"
            className="search-input"
          />
          <datalist id="companies">
            {companies.map((company, index) => (
              <option key={index} value={company} />
            ))}
          </datalist>
          <button onClick={() => handleSearch(searchTerm)} className="search-button">Search</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <ul className="employee-list">
          {filteredEmployees.map((worker, index) => (
            <li key={index} className="employee-item">
              <img src={worker.picture.thumbnail} alt={worker.name.first} className="employee-thumbnail" />
              <div className="employee-details">
                <h5>{worker.name.first} {worker.name.last}</h5>
                <p>Age: {worker.dob.age}</p>
                <p>Location: {worker.location.city}, {worker.location.country}</p>
                <p>Company: {worker.company}</p>
                <button onClick={() => addToFavorites(worker)} className="favorite-button">
                  {isFavorite(worker.login.uuid) ? 'Unfavorite' : 'Save Favorite'}
                </button>
                <Link to={`/employee/${worker.login.uuid}`}>
                  <button className="details-button">More Details</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }
  
  export default HomePage;