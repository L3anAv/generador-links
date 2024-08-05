import styled from 'styled-components'

export const Contenedor = styled.div`
  width:100%;
  height:100vh;
  display:flex;
`

export const TextoParaLoading = styled.p`
  font-size:1.2rem;
  color:${props => props.theme === 'claro' ? '#000' : '#fff'};
`

export const ContenedorBotones = styled.div`

  display:flex;
  flex-direction:row;
  align-items:center;

`

export const BotonVista = styled.button`
  width:12%;
  border:none;
  padding:10px;
  font-size:14px;
  cursor:pointer;
  background:none;
  font-family:OpenSans;
  text-decoration:underline;
  color:${props => props.color};
`