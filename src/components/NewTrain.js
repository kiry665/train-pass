import React, { useState } from 'react';
import StationsList from './Modal/StationsList';
import axios from 'axios';
import Cookies from 'js-cookie';

const NewTrain = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [items, setItems] = useState([]);

    const openModal = () => {
        fetchData();
        setModalIsOpen(true);
    } 
    const closeModal = () => setModalIsOpen(false);

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
            id: item.id,
            name: item.name
          }));
          setItems(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    return(
        
        <div className="container">
            <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr>
                        <th>Станция отправления</th>
                        <th>Время отправления</th>
                        <th>Время в пути</th>
                        <th>Станция прибытия</th>
                        <th>Время стоянки</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
            <button onClick={openModal}>Open Modal</button>
            <StationsList
                modalIsOpen={modalIsOpen} 
                closeModal={closeModal}
                items={items} 
            />
        </div>
    );
}

export default NewTrain;