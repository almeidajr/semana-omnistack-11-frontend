import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ngoId = localStorage.getItem('ngoId');

  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ngoId,
        },
      });

      history.push('/profile');
    } catch (error) {
      console.log(error);
      alert('Erron in register, try again');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Register a new incident</h1>
          <p>Describe the incident in detail to find a hero to solve this.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Go back home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Incident title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          <input
            placeholder="Value in reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewIncident;
