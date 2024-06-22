import React from 'react';
import { useParams } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import '../CSS/EmployeeDetails.css';

const EmployeeDetails = () => {
    const { id } = useParams();
    const { employees, favorites, addToFavorites, isFavorite } = useEmployees();
    const employee = employees.find(emp => emp.login.uuid === id) || favorites.find(emp => emp.login.uuid === id);
  
    if (!employee) {
      return <div>Employee not found</div>;
    }
  
    const position = { lat: parseFloat(employee.location.coordinates.latitude), lng: parseFloat(employee.location.coordinates.longitude) };
    const googleMapSrc = `https://maps.google.com/maps?q=${position.lat},${position.lng}&z=15&output=embed`;
  
    return (
      <div className="employee-details">
        <h1>{employee.name.first} {employee.name.last}</h1>
        <p>Company: {employee.company}</p>
        <p>Email: {employee.email}</p>
        <p>Phone: {employee.phone}</p>
        <p>Address: {employee.location.street.number} {employee.location.street.name}, {employee.location.city}, {employee.location.country}</p>
        <button onClick={() => addToFavorites(employee)}>
          {isFavorite(employee.login.uuid) ? 'Unfavorite' : 'Save Favorite'}
        </button>
        <div className="map-container mt-4">
          <iframe
            title="employee-location"
            width="100%"
            height="400px"
            frameBorder="0"
            src={googleMapSrc}
            allowFullScreen>
          </iframe>
        </div>
      </div>
    );
  };
  
  export default EmployeeDetails;