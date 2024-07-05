export const sonIgualesLosDatos = (dataActual, dataStore) => {
    return JSON.stringify(dataActual) === JSON.stringify(dataStore)
  }

export const existenDatos = (fields) => {
    return fields.length > 0
  }

export const noExistenErrores = (errors) => {
    return errors.redes === undefined
}

export const isFormValid = (getValues) => {
    const dataCargada = getValues();
    return Object.values(dataCargada).every((value) => !!value);
}

// Para ir a /preview, pero validando requisitos
export const irAPreview = (navigate, getValues, dataActual, dataStore, fields, setErrorNoExistenRedes, setDisabledPreview, DisabledPreview, errors) => {

  if(
  isFormValid(getValues) 
  && sonIgualesLosDatos(dataActual, dataStore) 
  && existenDatos(fields)
  && noExistenErrores(errors))
  {
    setErrorNoExistenRedes(false)
    navigate('/preview')
  }else if(
    !sonIgualesLosDatos(dataActual, dataStore) 
    && isFormValid(getValues)
    && existenDatos(fields)
    && noExistenErrores(errors)
  ){
    setDisabledPreview(true)
  }else if(
    sonIgualesLosDatos(dataActual, dataStore) 
    && isFormValid(getValues)
    && !existenDatos(fields)
    && noExistenErrores(errors)){
      setDisabledPreview(true)
      setErrorNoExistenRedes(true)
  }else{
    setDisabledPreview(!DisabledPreview)
  }
}