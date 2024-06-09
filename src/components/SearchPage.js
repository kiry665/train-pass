import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import Cookies from 'js-cookie';
import './SearchPage.css'

const SearchPage = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [routeDetails, setRouteDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/v1/stations/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = response.data.map(item => ({
          value: item.id,
          label: item.name
        }));
        setOptions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange1 = (option) => {
    setSelectedOption1(option);
    setRouteDetails([]);
  };

  const handleChange2 = (option) => {
    setSelectedOption2(option);
    setRouteDetails([]);
  };

  const swapOptions = () => {
    const t = selectedOption1;
    setSelectedOption1(selectedOption2);
    setSelectedOption2(selectedOption1);
    setRouteDetails([]);
  };

  const find = async () => {
    if (!selectedOption1 || !selectedOption2) {
      console.error('Please select departure and arrival stations');
      return;
    }

    try {
      const token = Cookies.get('token');
      if (!token) {
        console.error('No token found');
        return;
      }
  
      const response = await axios.post('http://localhost:8080/api/v1/route/details', {
        departureStationId: selectedOption1.value,
        arrivalStationId: selectedOption2.value
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);
      setRouteDetails(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='container'>
      <div className='search-container'>
        <div className='line'>
          <Select className='select'
            value={selectedOption1}
            onChange={handleChange1}
            options={options}
            placeholder="Откуда"
            isSearchable
          />
          <button onClick={swapOptions}>&#8646;</button>
          <Select className='select'
            value={selectedOption2}
            onChange={handleChange2}
            options={options}
            placeholder="Куда"
            isSearchable
          />
          <button onClick={find}>Найти</button>
        </div>
      </div>

      <div className='table-container'>
        <table className='table'>
          <thead>
            <tr>
              <th>Откуда</th>
              <th>Куда</th>
              <th>Номер поезда</th>
              <th>Тип</th>
              <th>Время отправления</th>
              <th>Время прибытия</th>
            </tr>
          </thead>
          <tbody>
            {routeDetails.map((routeDetail, index) => (
              <tr key={index}>
                <td>{routeDetail.startStationName}</td>
                <td>{routeDetail.endStationName}</td>
                {/* <td>{routeDetail.trainNumber}</td> */}
                <td>
                <Link to={`/schedule/${routeDetail.trainNumber}`}>
                  {routeDetail.trainNumber}
                </Link>
                </td>
                <td>{routeDetail.type}</td>
                <td>{routeDetail.departureTime}</td>
                <td>{routeDetail.arrivalTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
};

export default SearchPage;