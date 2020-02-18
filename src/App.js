import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './Components/Formulario/Formulario';
import axios from 'axios';


const Contenedor = styled.div`
  max-width:900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem
  }

  `;
const Img = styled.img`
  max-width: 100% ;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after{
  content:'';
  width:  0 auto;
  height: 6px ;
  background-color: #66A2FE;
  display: block;
}
`;
function App() {
  const [moneda, guardarMoneda] = useState('');
  const [criptoMoneda, guardarCriptoMoneda] = useState('');
  const [infoCriptomoneda, guardarInfoCriptomoneda] = useState({});
  console.log(infoCriptomoneda);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (moneda === '' || criptoMoneda === '') return;
      // consultar la api
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`
      const resultado = await axios.get(url);
      guardarInfoCriptomoneda(resultado.data.DISPLAY[criptoMoneda][moneda]);
    }
    cotizarCriptomoneda();
  }, [moneda, criptoMoneda]);
  return (
    <Contenedor>
      <div>
        <Img alt="img-criptomonedas" src={imagen} />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptoMoneda={guardarCriptoMoneda}
        />
      </div>
    </Contenedor>
  );
}

export default App;
