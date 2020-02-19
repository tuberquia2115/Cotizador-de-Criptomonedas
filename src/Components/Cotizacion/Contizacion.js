import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`
    margin-top: 1rem;
    background-color: #fff;
    color: #000;
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
    border: 4px solid #00345b;
    border-radius: 20px;

`;

const Info = styled.p`
    margin: 1rem 0 1rem 0;
    font-size: 18px;
    text-align: center;
    span{
        font-weight: bold;
    }
`;
const Precio = styled.p`
    font-size: 30px;
    text-align:center;

   
`;
const Span = styled.span`
    font-weight: bold;
    font-size: 20px;
    display: flex;
    justify-content: center;
`;


const Cotizacion = ({ resultado }) => {
    console.log(resultado);

    if (Object.keys(resultado).length === 0) return null;
    return (
        <ResultadoDiv>
            <Precio>El precio es</Precio>
            <Span>{resultado.PRICE}</Span>
            <Info>Precio más alto del día: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio más bajo del día: <span>{resultado.LOWDAY}</span></Info>
            <Info>Verificación últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Última actualización: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
    )
}

export default Cotizacion;