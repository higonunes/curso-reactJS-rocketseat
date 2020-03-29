import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const history = useHistory();
  const ongName = localStorage.getItem('ongName');
  const ongID = localStorage.getItem('ongID');
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    api.get('profile', { headers: { Authorization: ongID } })
      .then(response => {
        setIncidents(response.data)
      })
  }, [ongID]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, { headers: { Authorization: ongID } });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert("Erro ou deletar caso! Tente novamente")
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
        <span>Bem vindo, {ongName} | ID: {ongID}</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>

      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button onClick={() => { handleDeleteIncident(incident.id) }} type="button"><FiTrash2 size={20} /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}