import React, { useState, useEffect } from 'react';
import  Modal from "react-modal"
import './StationsList.css'
import { Button, ButtonToolbar } from 'react-bootstrap';


Modal.setAppElement('#root');

const StationsList = ({modalIsOpen, closeModal, items}) => {

    return(
        <Modal 
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="StationsList"
        >
            <h2>Stations List</h2>
            <div className='stations-list-container'>
                {items.map(item => (
                <ul key={item.id}>
                    <label>
                    <input
                        type="checkbox"
                    />
                    {item.name}
                    </label>
                </ul>
                ))}
                <ButtonToolbar>
                <Button onClick={closeModal}>Закрыть</Button>
                </ButtonToolbar>
            </div>
            
            
        </Modal>       
    );   
}

export default StationsList;