import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import {theme} from '../../utils/colors'
import { useStore } from '../../store/useStore'
import Links from "../../components/links/Links"
import { onSubmit, descargarApp } from '../../utils/onSubmit'
import {Contenedor, ContenedorBotones, BotonVista, TextoParaLoading} from './preview.styles'

function Preview() {
 
  const [,navigate] = useLocation()
  const { dataStore } = useStore()
  const [MostrarLoading, setMostrarLoading] = useState(false)
  const [MostrarBuildeando, setMostrarBuildeando] = useState(false)
  const [MostrarDescarga, setMostrarDescarga] = useState(false)

  async function handlerDescarga(){
    const respuesta = await onSubmit(dataStore, setMostrarLoading, setMostrarBuildeando)
    
    if(respuesta === 200){
      descargarApp(setMostrarDescarga)
    }
    
  }

  const irAInicio = () => {
    navigate('/')
  }
  
  useEffect(() => {
    window.document.title = `🔗 Los links de ${dataStore.Nombre} | Generador Mis Links`
  }, [dataStore])

  return (
    <Contenedor className={theme.get(dataStore.ColorTheme.value)}>
      <Links colorBotones={`${dataStore.ColorBotones.value}`}/>
      {MostrarLoading ? <div className="loader">Loading...</div> : ''}
      {MostrarBuildeando ? <TextoParaLoading theme={dataStore.ColorTheme.value}>La web de links se está creando...</TextoParaLoading> : ''}
      {MostrarDescarga ? <TextoParaLoading theme={dataStore.ColorTheme.value}>Proceso de descarga...</TextoParaLoading> : ''}
      <ContenedorBotones>
      <BotonVista color={dataStore.ColorTheme.value === 'oscuro' ? '#fff' : '#000'} onClick={() => irAInicio()}>Ir a incio</BotonVista>
      <BotonVista color={dataStore.ColorTheme.value === 'oscuro' ? '#fff' : '#000'} onClick={() => handlerDescarga()}>Descargar</BotonVista>
      </ContenedorBotones>
    </Contenedor>
    
  )
}

export default Preview