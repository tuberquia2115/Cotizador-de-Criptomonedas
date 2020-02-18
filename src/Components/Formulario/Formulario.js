import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../../Hooks/useMoneda';
import useCriptomoneda from '../../Hooks/useCriptomoneda';
import axios from 'axios';
import Error from '../Error/Error';

const Boton = styled.input`
margin-top: 20px;
font-weight: bold;
font-size: 20px;
padding: 10px;
background-color: #66a2fe;

border: none;
width: 100%;
border-radius: 10px;
color: #fff;
transition: background-color .3s ease;

&:hover {
    background-color:black;
    cursor: pointer;
}

`;


const Formulario = ({ guardarMoneda, guardarCriptoMoneda }) => {

    const [listaCripto, guardarListaCripto] = useState([]);
    const [error, guardarError] = useState(false);
    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' },
        { codigo: 'COD', nombre: 'Peso Colombiano' },
    ]
    // Utilizar useMoneda custom hooks
    const [moneda, SelectMoneda,] = useMoneda('Elige tú Moneda', '', MONEDAS);

    // utilizar criptomoneda
    const [criptomoneda, SelectCripto,] = useCriptomoneda('Elige tú Criptomoneda', '', listaCripto);

    // Ejecutar llamado a la api
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarListaCripto(resultado.data.Data);
        };
        consultarAPI();
    }, [])

    const cotizarMoneda = e => {
        e.preventDefault();

        // validar campos 
        if (moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }
        // pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptoMoneda(criptomoneda);


    }
    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <SelectMoneda />
            <SelectCripto />

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    )
}

export default Formulario;