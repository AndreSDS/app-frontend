import React, { useState } from 'react';
import { Link, useHistory, } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncidents() {
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    const [title, setTile] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });            
            
            history.push('/profile');
        
        } catch (error) {
            alert('Falha ao cadastrar caso, tente novamente.');
        }
    };

    return (
        <div className="container">
            <div className="content">
                <section>
                    <img src={ logoImg } alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para 
                        encontrar um herói para resolvê-lo.
                    </p>

                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#e02041" />
                        Ver casos cadastrados
                    </Link>
                </section>

                <form onSubmit={ handleNewIncident }>
                    <input type="text" 
                    placeholder="Título do caso"
                    value={title}
                    onChange={e => setTile(e.target.value)}
                    />
                    <textarea type="text"
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                    <input type="text"
                    placeholder="Valor em reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    />

                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
};