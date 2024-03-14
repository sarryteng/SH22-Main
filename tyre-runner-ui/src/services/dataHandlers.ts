export async function getCarData() {    
    

    try {
        const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL}/get-data`, {
      
            // const response = await fetch('http://localhost:8000/get-data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();

            return data;
            
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}    
// export async function getCarData() {
//     try {
//             const response = await fetch('http://localhost:8000/get-data', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
            
//             const data = await response.json();
//              console.log(data.registration_plate)
//             return data;
            
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }