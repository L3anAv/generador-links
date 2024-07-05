import './links.css'
import '/src/theme.css'
import { useEffect, useState } from 'react'
import { useStore, } from '../../store/useStore'

function Links( {colorBotones} ){

  const { dataStore } = useStore()
  const [RutasLinks, setRutasLinks] = useState([])

    const colores = new Map([
      ['blue', 'button-c-blue'],
      ['orange', 'button-c-orange'],
      ['purple','button-c-purple'],
      ['green', 'button-c-green'],
      ['pink', 'button-c-pink']
    ]);
    
    useEffect(() => {
      if(dataStore.redes.length >= 1){
        for (let index = 0; index < dataStore.redes.length; index++) {
          const elemento = dataStore.redes[index];
          setRutasLinks((prevState) => [...prevState, elemento])
        }
      }
    }, [dataStore])
    
  return (
    <div>
      <h1>🔗 Mis redes 🔗</h1>
      {RutasLinks.map(value => <a key={value.nombre} href={value.ruta} target="_blank"><button className={colores.get(colorBotones)}>{value.nombre}</button></a>)}
    </div>
  )
}

export default Links