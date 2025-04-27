
const url="http://127.0.0.1:5001"
export const fetchInstructors = async () => {
    const response = await fetch(`${url}/get-instructors`);
    const data = await response.json();
    return data;
  };
  
  export const processData = async (scannedData, selectedPackage,instructorDetails) => {
    const response = await fetch(`${url}/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: scannedData, package: selectedPackage,instructorDetails:instructorDetails }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to process data');
    }
  
    const data = await response.json();
    return data;
  };
  