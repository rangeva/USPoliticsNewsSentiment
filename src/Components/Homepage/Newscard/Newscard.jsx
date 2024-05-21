import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import config from '../../../config.json';

export default function Newscard() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const people = config.people;
   

    const handleMouseEnter = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleProfileClick = (personId) => {
        navigate(`/profile/${personId}`);
    };

    return (
        <div className="newsCard-section">
            <div className='container mt-lg-4'>
                <div className="row g-4 justify-content-center">
                    {people && people.map(person => (
                        <div key={person.id} className="col-lg-6 mt-0">
                            <div className="card" onMouseEnter={handleMouseEnter}>
                                <img src={person.image} className="card-img-top" alt={person.name} />
                            </div>
                        </div>
                    ))}
                </div>

                <Modal show={showModal} onHide={handleCloseModal} onMouseLeave={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select Persona</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Pick a candidate to View Latest News</h4>
                        <div className="row flex-wrap flex-md-nowrap gap-4 m-0">
                            {people && people.map(person => (
                                <div key={person.id} className="col-md" onClick={() => handleProfileClick(person.id)} style={{ cursor: 'pointer' }}>
                                    <div className="modal-img-holder">
                                        <img src={person.secondImage} alt={person.name} className="img-fluid w-100" />
                                    </div>
                                    <h2>{person.name}</h2>
                                    <h5>{person.title}</h5>
                                    <p>{person.description}</p>
                                </div>
                            ))}
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}
