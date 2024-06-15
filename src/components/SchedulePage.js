import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import "./SchedulePage.css"
import config from '../config.js';

const SchedulePage = () => {
    const { trainNumber } = useParams();

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const token = Cookies.get('token');
          if (!token) {
            console.error('No token found');
            return;
          }
    
          try {
            const response = await axios.get(`${config.apiUrl}/v1/trains/number`, {
              headers: {
                Authorization: `Bearer ${token}`
              },
              params: {
                trainNumber:  trainNumber
              }
            });
            console.log(response)
            setData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <div className="container">
            <h1 className="h1">Поезд № {trainNumber}</h1>
            <div className='table-container'>
            
                <table className='table'>
                    <thead>
                        <tr>
                        <th>Станция</th>
                        <th>Время прибытия</th>
                        <th>Время отправления</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.route && data.route.map((route, index) => (
                            <tr key={index}>
                                <td>{route.station.name}</td>
                                <td>{route.arrival_time || '-'}</td>
                                <td>{route.departure_time || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
    );
};

export default SchedulePage;