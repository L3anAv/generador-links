import styled from 'styled-components'
import Formulario from '../../components/formulario/formulario'

const Titulo = styled.h1`
  font-size:25px;
  text-align:left;
  margin-left:15px;
  font-family:OpenSans;
`

const Home = () => {

  return (
    <>
    <Titulo>⛓ Generador: Links Web</Titulo>
    <Formulario />
    <footer>Hecho por <a href="https://github.com/l3anav" target='_blanck'>L3anav</a> con 💘<br/><span>2024</span></footer>
    </>
  )
}

export default Home