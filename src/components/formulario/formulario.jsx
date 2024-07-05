import './formulario.css'
import Select from 'react-select'
import { useLocation } from 'wouter'
import styled from 'styled-components'
import AddIcon from '../../svg/add.icon'
import {useStore } from '../../store/useStore'
import { useEffect, useState, useRef} from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import {opcionesTheme, opcionesColores} from '../../utils/optionsSelect'
import { isFormValid, irAPreview } from '../../utils/validacionesFormulario'
import {theme, colores, coloresAddIcon, darStylesParaSelect} from '../../utils/colors'
import {handleNombreNuevaSeccion, handleRemoveButton} from '../../utils/handlersVentanaModal'

const Inputs = styled.input`
    width:100%;
    height:15px;
    padding:12px;
    outline:none;
    font-size:16px;
    border:1px solid;
    border-radius:20px;
    border-color:${props => props.bordercolor};
`

const Formulario = () => {

    // useForm 
    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch, control } = useForm();
    
    // Hook Fields Dinámicos
    const { fields, append, remove } = useFieldArray({
      control,
      name: "redes",
    });

    // Store
    const { dataStore } = useStore()
    
    // Fuciones del store
    const actualizarData = useStore((state) => state.actualizarData)

    // Datos actuales del formulario
    const dataActual = watch()

    // Reedirigir a /preview
    const [,navigate] = useLocation()

    // Referencias a inputs para ingresar nuevos valores
    const inputNuevoValor = useRef(null)
    const inputNuevoNombre = useRef(null)
    
    // Estados
    const [colorFill, setColorFill] = useState('#0080ff')
    const [agregarSeccion, setagregarSeccion] = useState(false)
    const [DisabledPreview, setDisabledPreview] = useState(true)
    const [butttonClass, setButtonClass] = useState('button-c-blue')
    const [errorNoExistenRedes, setErrorNoExistenRedes] = useState(false)

    // Enviando data al store, si pasa validaciones
    const cargandoFormulario = () => {

      const dataCargada = getValues()

      if(JSON.stringify(dataCargada) === JSON.stringify(dataActual)){
        actualizarData(dataCargada)
        setDisabledPreview(!isFormValid(getValues))
      }else{
        setDisabledPreview(true)
      }

    }

    // Use Effects
    // Para estado inicial del formulario
    useEffect(() => {

      if(dataStore != undefined){
          setValue('Nombre', dataStore.Nombre)
          setValue('ColorTheme', dataStore.ColorTheme)
          setValue('ColorBotones', dataStore.ColorBotones)

          const redes  = dataStore.redes

          for (let index = 0; index < redes.length; index++) {
            const elemento = redes[index];
            append({"nombre": elemento.nombre , "ruta": elemento.ruta})
          }

      }

    }, [])

    //Cambios de estilos para botones, titulo, background, etc.
    useEffect(() => {

      if(dataActual.ColorBotones){
        setButtonClass(colores.get(dataActual.ColorBotones.value))
        setColorFill(coloresAddIcon.get(dataActual.ColorBotones.value))
      }
      
      if(dataActual.Nombre){
        window.document.title = `Los links de ${dataActual.Nombre} | Generador Links`
      }else{
        window.document.title = ' Home | Generador Mis Links'
      }

      if(dataActual.ColorTheme){
        window.document.body.classList = `${theme.get(dataActual.ColorTheme.value)}`
      }
      
      if(DisabledPreview){
        window.document.getElementById('botonPreview').style.background = '#a3a3a3'
      }else{
        window.document.getElementById('botonPreview').style.background = `${colorFill}`
      }
      
    }, [dataActual, colorFill, DisabledPreview])
 
    return (
      <div className='contenedor'>
        
      {agregarSeccion &&
        <div className='ventanaModal'>
          <label>Nombre de nuevo Boton:</label>
          <Inputs bordercolor={colorFill} type="text" ref={inputNuevoNombre} />
          <label>Link hacia:</label>
          <Inputs bordercolor={colorFill} type="text" ref={inputNuevoValor} defaultValue={'https://'}/>
          <div className='botonContenedor'>
            <button className={butttonClass} onClick={() => handleNombreNuevaSeccion(inputNuevoNombre, inputNuevoValor, append, setagregarSeccion)}>Agregar</button>
            <button className={butttonClass} onClick={() => setagregarSeccion(false)}>Cerrar</button>
          </div>
        </div>
      }

      <form onSubmit={handleSubmit(cargandoFormulario)}>

        <div className='contenedores'>
          <label htmlFor="Nombre">Los links de:</label>
          <Inputs bordercolor={colorFill} type="text" {...register('Nombre', { required: 'El nombre es obligatorio' })} />
          {errors.Nombre && <span className="error">Ingresa tu nombre completo</span>}
        </div>
  
        <div className='contenedores'>
          <label htmlFor="colorTema">Tema:</label>
          <Controller
            name="ColorTheme"
            control={control}
            rules={{ required: true }}
            render={({field}) => (
              <Select
                value={field.value}
                options={opcionesTheme}
                onChange={field.onChange}
                error={errors.ColorTheme}
                styles={darStylesParaSelect(colorFill)}
                classNamePrefix="ReactSelect"
                placeholder="Color Para Tema"
              />
            )}
          />
          {errors.ColorTheme && <span className="error">Elija un color para el tema.</span>}
          </div>
          
        <div className='contenedores'>
          <label htmlFor="ColorBotones">Color de Botones:</label>
          <Controller
            name="ColorBotones"
            control={control}
            rules={{ required: true }}
            render={({field}) => (
              <Select
                value={field.value}
                options={opcionesColores}
                onChange={field.onChange}
                error={errors.ColorBotones}
                styles={darStylesParaSelect(colorFill)}
                classNamePrefix="ReactSelect"
                placeholder="Color para botones"
              />
            )}
          />
          {errors.ColorBotones && <span className="error">Elija un color para los botones.</span>}
        </div>

        {fields.map((field, index) =>{
             return (
              <div className='agregados contenedores' key={field.id}>
               <label >{field.nombre}:</label>
               <Inputs bordercolor={colorFill} type="text" {...register(`redes.${index}.ruta`, {required: 'Debe ingresar una url', pattern: {
                value:/(?:http[s]?:\/\/.)?(?:www\.)?[-a-zA-Z0-9@%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/,
                message: 'Debe poner una url válida'
               }})}/>
               {errors.redes?.[index]?.ruta && <span className="error">{errors.redes?.[index]?.ruta.message}</span>}
               <div>
               <button className={butttonClass} onClick={() => handleRemoveButton(index, remove)}>Eliminar</button>
               </div>
              </div>
            )
        })}

        <div className='contenedores addIcon'onClick={() => setagregarSeccion(true)}>
          <AddIcon colorPath={colorFill}/>
          <div className='contenedores'>{errorNoExistenRedes && <span className='error'>Agregue una red con el simbolo `+`</span>}</div>
        </div>

        <div className='contenedorBotones'>
        <button className={butttonClass} type="submit">Cargar Data</button>
        <button className={butttonClass} id="botonPreview" type="button" onClick={() => irAPreview(navigate, getValues, dataActual, dataStore, fields, setErrorNoExistenRedes, setDisabledPreview, DisabledPreview, errors)} disabled={DisabledPreview}>Ver Preview</button>
        </div>
        
      </form>
      </div>
    )
}

export default Formulario