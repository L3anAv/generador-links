import { saveAs } from 'file-saver'

export const onSubmit = async (dataStore, setMostrarLoading) => {

    try {
      setMostrarLoading(true);

      const formResponse = await fetch('https://mis-links-generador.onrender.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataStore),
      });
  
      if (!formResponse.ok) {
        throw new Error(`Error: ${formResponse.statusText}`);
      }else{
        return 200
      }

    } catch (error) {
      console.error('Error submitting form:', error);
    }finally{
      setMostrarLoading(false)
    }

  };


export const descargarApp = async () => {
    
    try {
  
      const downloadResponse = await fetch('https://mis-links-generador.onrender.com/descargar');
      
      console.log('Download response status:', downloadResponse.status);
  
      if (!downloadResponse.ok) {
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
    }

  };