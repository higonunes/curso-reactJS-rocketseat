import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css'

export default function Register() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUF] = useState('');
  
  const history = useHistory();

  async function handlerRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    }


    try {
      const response = await api.post('ongs', data);

      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push('/');
    } catch {
      alert("Não foi possível criar os seu cadastro!");
    }
    
  }


  return (
    <div className="register-container">
      <div className="content">
      <section>
        <img src={logoImg} alt="Be the Hero" />

        <h1>Cadastro</h1>
        <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
        <Link className="back-link" to="/">
          <FiArrowLeft size={16} color="#e02041" />
            Voltar
        </Link>
      </section>

      <form onSubmit={handlerRegister}>
        <input 
          placeholder="Nome da ONG"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          />
        <input 
          placeholder="Whatsapp"
          value={whatsapp}
          onChange={e => setWhatsapp(e.target.value)}
          />

        <div className="input-group">
          <input 
            placeholder="Cidade"
            value={city}
            onChange={e => setCity(e.target.value)}
            />
          <input 
            placeholder="UF" style= {{width: 80}}
            value={uf}
            onChange={e => setUF(e.target.value)}
            />
        </div>

        <button className="button" type="submit"> Cadastrar</button>
        </form>
      </div>
      
  
    </div>
  );
}