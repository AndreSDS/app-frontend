import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function Profile() {
    const history = useHistory();
    const [casos, setCasos] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        })
            .then(response => {
                setCasos(response.data);
            })
    }, [ongId]);

    async function handleDelete(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setCasos(casos.filter(caso => caso.id !== id));

        } catch (error) {
            alert("Erro a deletar caso, tente novamente.")
        }
    };

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    };

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>

                <button onClick={ handleLogout }>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {casos.map(caso => (
                    <li key={caso.id}>
                        <strong>Caso:</strong>
                        <p>{caso.title}</p>

                        <strong>Descrição</strong>
                        <p>{caso.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR',
                            { style: 'currency', currency: 'BRL' })
                            .format(caso.value)}</p>

                        <button onClick={()=> handleDelete(caso.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};