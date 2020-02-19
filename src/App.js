import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './assets/cryptomonedas.png';
import dev from './assets/Desarrollador.jpeg';
import Formulario from './Components/Formulario/Formulario';
import axios from 'axios';
import Cotizacion from './Components/Cotizacion/Contizacion';
import Spinner from './Components/Spinner/Spinner';


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

const ImgDev = styled.img`
    width:150px;
    height:150px;
    border-radius:150px;
    border: 2px solid black;
    cursor: pointer;
&::hover{
  filter: grayscale(100%)
}

`;
const ContenerdoImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p{
    color: #FFF;
    font-size: 20px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
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
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargado] = useState(false)

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (moneda === '' || criptoMoneda === '') return;
      // consultar la api
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`
      const resultado = await axios.get(url);

      //Mostrar el Spinner
      guardarCargado(true);

      setTimeout(() => {
        // dejar de mostrar el Spinner
        guardarCargado(false);
        // Guardar la cotización 
        guardarResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
      }, 3000)

    }
    cotizarCriptomoneda();
  }, [moneda, criptoMoneda]);

  // Mostrar el Spinner o resultado

  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />
  return (
    <Contenedor>
      <div>
        <Img alt="img-criptomonedas" src={imagen} />
        <ContenerdoImg>
          <ImgDev alt="img-desarrollador" src={dev} />
          <p>Developer
          <span role="img" aria-label="carita">&#129299;</span>
            <span role="img" aria-label="mano">&#128075;</span>
          </p>
        </ContenerdoImg>

      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptoMoneda={guardarCriptoMoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
