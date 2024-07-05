// Para agregar una nueva red
export const handleNombreNuevaSeccion = (inputNuevoNombre, inputNuevoValor, append, setagregarSeccion) => {

    const nombreSeccionNueva = inputNuevoNombre.current.value
    const valorSeccionnNueva = inputNuevoValor.current.value
  
    append({"nombre": nombreSeccionNueva, "ruta": valorSeccionnNueva})
    setagregarSeccion(false)
}

// Para eliminar una red agregada
export const handleRemoveButton = (index, remove) => {
    remove(index)
}