import React, {useState} from 'react';
import {FiLogIn} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
  const [id, setID] = useState('');
  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', {id});

      localStorage.setItem('ongID', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (error) {
      alert("Falha no login, verifique o código e tente novamente")
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
      <img src={logoImg} alt="Be the Hero" />
      
        <form onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>

          <input 
            placeholder="Sua ID"
            value={id}
            onChange={e => setID(e.target.value)}
            />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041"/>
            Não tenho cadastro
            </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}