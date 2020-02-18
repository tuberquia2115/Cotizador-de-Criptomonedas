import React, { useState } from 'react'
import styled from '@emotion/styled';
const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color:#FFF;
    text-transform: uppercase;
    font-weight:bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;

 &::before{
     content:'';
     width: 12rem;
     height: 6px ;
     background-color: #66A2FE;
     display: block;
     margin-bottom: .5rem;
 }
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding:.5rem;
    -webkit-uppearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;
const useCriptomoneda = (label, stateInicial, selectOption) => {
    // State de nuestro custom hooks
    const [state, actualizarState] = useState(stateInicial);
    const SelectCripto = () => (
        <React.Fragment>
            <Label>{label}</Label>
            <Select onChange={e => actualizarState(e.target.value)}
                value={state}>
                <option value=''>-- Seleccione --</option>
                {Array.isArray(selectOption) && selectOption.map(options => (
                    <option key={options.CoinInfo.Id} value={options.CoinInfo.Name}>{options.CoinInfo.FullName}</option>
                ))}
            </Select>
        </React.Fragment>
    )

    // Retornar state, Interfaz y fn que modifica el state

    return [state, SelectCripto, actualizarState]
}

export default useCriptomoneda;