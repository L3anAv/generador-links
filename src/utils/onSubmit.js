export const onSubmit = async (dataStore, setMostrarLoading) => {

    setMostrarLoading(true)

    try {
      const formResponse = await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataStore),
      });
  
      if (!formResponse.ok) {
        throw new Error(`Error: ${formResponse.statusText}`);
      }
  
      // Trigger download after successful form submission
      await fetchDownload(); // Call the separate function for download

    } catch (error) {
      console.error('Error submitting form:', error);
    }finally {
      setMostrarLoading(false);
    }
  };
  

  // Function to handle download
  const fetchDownload = async () => {
    try {
      const downloadResponse = await fetch('http://localhost:5000/descargar');
      
      if (!downloadResponse.ok) {
        throw new Error(`Error: ${downloadResponse.statusText}`);
      }
      
      // Check if the response is intended for download
      if (downloadResponse.headers.get('Content-Disposition')?.includes('attachment')) {
        // Trigger browser download
        const blob = await downloadResponse.blob();
        const fileUrl = URL.createObjectURL(blob);
        window.open(fileUrl, '_blank');
        URL.revokeObjectURL(fileUrl); // Cleanup when done
      } else {
        // Handle non-downloadable responses
        console.warn('Response not formatted for download.');
      }

    } catch (error) {
      console.error('Error fetching download data:', error);

    }
  };