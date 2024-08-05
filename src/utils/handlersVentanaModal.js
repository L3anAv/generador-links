// Para agregar una nueva red
export const handleNombreNuevaSeccion = (inputNuevoNombre, inputNuevoValor, append, setagregarSeccion) => {

    const nombreSeccionNueva = inputNuevoNombre.current.value
    const valorSeccionnNueva = inputNuevoValor.current.value
  
    append({"nombre": nombreSeccionNueva, "ruta": valorSeccionnNueva})
    setagregarSeccion(false)

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });

}

// Para eliminar una red agregada
export const handleRemoveButton = (index, remove) => {
    remove(index)
}