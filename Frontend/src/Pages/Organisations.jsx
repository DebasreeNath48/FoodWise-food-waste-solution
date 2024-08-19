import React, { useState } from 'react';
import '../Styles/CSS/organisations.css';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import Modal from '../Components/Modal';

const Organisations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrg, setSelectedOrg] = useState(null);
  const organisations = [
    { name: 'Org 1', address: '123 Main St', contact: '123-456-7890' },
    { name: 'Org 2', address: '456 Maple Ave', contact: '987-654-3210' },
    { name: 'Org 3', address: '789 Oak Dr', contact: '555-123-4567' },
    { name: 'Org 1', address: '123 Main St', contact: '123-456-7890' },
    { name: 'Org 2', address: '456 Maple Ave', contact: '987-654-3210' },
    { name: 'Org 3', address: '789 Oak Dr', contact: '555-123-4567' },
    { name: 'Org 1', address: '123 Main St', contact: '123-456-7890' },
    { name: 'Org 2', address: '456 Maple Ave', contact: '987-654-3210' },
    { name: 'Org 3', address: '789 Oak Dr', contact: '555-123-4567' },
    { name: 'Org 1', address: '123 Main St', contact: '123-456-7890' },
    { name: 'Org 2', address: '456 Maple Ave', contact: '987-654-3210' },
    { name: 'Org 3', address: '789 Oak Dr', contact: '555-123-4567' },
    { name: 'Org 1', address: '123 Main St', contact: '123-456-7890' },
    { name: 'Org 2', address: '456 Maple Ave', contact: '987-654-3210' },
    { name: 'Org 3', address: '789 Oak Dr', contact: '555-123-4567' },
    { name: 'Org 1', address: '123 Main St', contact: '123-456-7890' },
    { name: 'Org 2', address: '456 Maple Ave', contact: '987-654-3210' },
    { name: 'Org 3', address: '789 Oak Dr', contact: '555-123-4567' },
    { name: 'Org 1', address: '123 Main St', contact: '123-456-7890' },
    { name: 'Org 2', address: '456 Maple Ave', contact: '987-654-3210' },
    { name: 'Org 3', address: '789 Oak Dr', contact: '555-123-4567' },

  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrgs = organisations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (org) => {
    setSelectedOrg(org);
  };

  const handleCloseModal = () => {
    setSelectedOrg(null);
  };

  return (
    <div className='organisationsContainer'>
      <div className="navContainer">
        <NavBar />
      </div>
      <div className="organisationsMainContainer">
        <h1 className="organisationsTitle">Organisations</h1>
        <input
          type="text"
          placeholder="Search Organisations"
          value={searchTerm}
          onChange={handleSearchChange}
          className="searchBox"
        />
        <div className="cardContainer">
          {filteredOrgs.map((org, index) => (
            <div key={index} className="orgCard" onClick={() => handleCardClick(org)}>
              <h2>{org.name}</h2>
              <p>{org.address}</p>
              <p>{org.contact}</p>
            </div>
          ))}
        </div>
        <Modal isOpen={!!selectedOrg} onClose={handleCloseModal}>
          {selectedOrg && (
            <div className="orgDetails">
              <h2>{selectedOrg.name}</h2>
              <p>Address: {selectedOrg.address}</p>
              <p>Contact: {selectedOrg.contact}</p>
            </div>
          )}
        </Modal>
      </div>
      <Footer />
    </div>
  );
}

export default Organisations;
