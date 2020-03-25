import React, { useState, useEffect } from 'react';
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

function Profile() {
  const [incidents, setIncidents] = useState([]);

  const ngoId = localStorage.getItem('ngoId');
  const ngoName = localStorage.getItem('ngoName');

  const history = useHistory();

  useEffect(() => {
    api
      .get('profile', {
        headers: {
          Authorization: ngoId,
        },
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [ngoId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ngoId,
        },
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert('Erron on delet incident');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Be welcome, {ngoName}</span>
        <Link className="button" to="/incidents/new">
          Register new incident
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size="18" color="#e02041" />
        </button>
      </header>

      <h1>Incidents</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>INCIDENT:</strong>
            <p>{incident.title}</p>
            <strong>DESCRIPTION:</strong>
            <p>{incident.description}</p>
            <strong>VALUE:</strong>
            <p>
              {Intl.NumberFormat('en', {
                style: 'currency',
                currency: 'USD',
              }).format(incident.value)}
            </p>
            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size="20" color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
