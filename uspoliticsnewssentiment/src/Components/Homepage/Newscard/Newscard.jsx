import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { people } from './PeopleData';

export default function Newscard() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const showTimeout = useRef(null);
    const hideTimeout = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(hideTimeout.current);
        showTimeout.current = setTimeout(() => setShow(true), 300);
    };

    const handleMouseLeave = () => {
        clearTimeout(showTimeout.current);
        hideTimeout.current = setTimeout(() => setShow(false), 30000);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleProfileClick = (personId) => {
        navigate(`/profile/${personId}`);
    };

    return (
        <div className='container mt-4'>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {people.map(person => (
                    <div key={person.id} className="col">
                        <div className="card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <img src={person.image} className="card-img-top" alt={person.name} />
                        </div>
                    </div>
                ))}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Persona</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <h4>Pick a candidate  to View Latest News</h4>
                        {people.map(person => (
                            <div key={person.id} className="col-md-6" onClick={() => handleProfileClick(person.id)} style={{ cursor: 'pointer' }}>
                                <img src={person.image} alt={person.name} className="img-fluid" />
                                <h2>{person.name}</h2>
                                <h5>{person.title}</h5>
                                <p>{person.description}</p>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
