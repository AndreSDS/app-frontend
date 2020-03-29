import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

import { FiLogIn } from 'react-icons/fi';
import heroesImg from '../../assets/heroes.png';
import logoimg from '../../assets/logo.svg';

export default function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('session', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');

        } catch (error) {
            alert('Falha  no login, tente novamente');
        }
    };

    return (
        <div className="container">
            <section className="form">
                <img src={logoimg} alt="Be the hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input
                    type="text"
                    placeholder="Sua ID"
                    value={ id }
                    onChange={ e => setId(e.target.value) }
                    />
                    
                    <button className="button" type="submit">Entrar</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}