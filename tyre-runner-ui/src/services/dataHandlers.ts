export async function getCarData() {
    try {
            const response = await fetch('http://localhost:8000/get-data');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const url = await response.json();
            
            console.log('URL:', url);
            // console.log('License Plate:', data.licensePlate);
            // console.log('Top Left Sensor:', data.sensorTopLeft);
            // console.log('Top Right Sensor:', data.sensorTopRight);
            // console.log('Bottom Left Sensor:', data.sensorBottomLeft);
            // console.log('Bottom Right Sensor:', data.sensorBottomRight);
  
            
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}