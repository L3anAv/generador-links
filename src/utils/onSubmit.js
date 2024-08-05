import { saveAs } from 'file-saver'

export const onSubmit = async (dataStore, setMostrarLoading, setMostrarBuildeando) => {

    try {
      setMostrarLoading(true);
      setMostrarBuildeando(true)
      const formResponse = await fetch('https://mis-links-generador.onrender.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataStore),
      });
  
      if (!formResponse.ok) {
        setMostrarBuildeando(false)
        throw new Error(`Error: ${formResponse.statusText}`);
      }else{
        return 200
      }

    } catch (error) {
      console.error('Error submitting form:', error);
    }finally{
      setMostrarLoading(false)
      setMostrarBuildeando(false)
    }

  };


export const descargarApp = async (setMostrarDescarga) => {
    
    try {
      setMostrarDescarga(true)
      const downloadResponse = await fetch('https://mis-links-generador.onrender.com/descargar');
      
      console.log('Download response status:', downloadResponse.status);
  
      if (!downloadResponse.ok) {
        setMostrarDescarga(false)
        throw new Error(`Error downloading file: ${downloadResponse.statusText}`);
      }
  
      if (downloadResponse.status === 200) {
  
        const blob = await downloadResponse.blob();
        const fileName = 'dist.zip'; 
        saveAs(blob, fileName);
      } else {
        console.warn('Response not formatted for download.');
      }
    } catch (error) {
      console.error('Error fetching download data:', error);
    }finally{
      setMostrarDescarga(false)
    }

  };