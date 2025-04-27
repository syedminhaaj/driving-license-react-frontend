import React, { useState, useEffect } from 'react';
import { fetchInstructors, processData } from '../api';

const LicenseForm = ({ setOutputData }) => {
  const [scannedData, setScannedData] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [instructorDetails, setInstructorDetails] = useState({
    name: '',
    license: '',
    expiry: '',
  });
  const url="http://127.0.0.1:5001"
  useEffect(() => {
    fetchInstructors().then(data => setInstructors(data.instructors));
  }, []);

  const handleInstructorChange = (e) => {
    const selected = e.target.value;
    setSelectedInstructor(selected);

    const instructor = instructors.find(i => i.name === selected);
    setInstructorDetails({
      name: instructor?.name || '',
      license: instructor?.license || '',
      expiry: instructor?.expiry || '',
    });
  };

  const handleSubmit = () => {
    if (!scannedData || !selectedPackage) {
      alert("Please fill in all fields.");
      return;
    }

    processData(scannedData, selectedPackage,instructorDetails).then(data => {
      // Process extracted data
      console.log('Processed Data:', data);
      setOutputData(data);

         // Store download link
         sessionStorage.setItem("registrationDownloadLink", `${url}${data.register_download_link}`);
         sessionStorage.setItem("regisNextLink", `${url}${data.regis_next_link}`);
         sessionStorage.setItem("excelDownloadLink", `${url}${data.excel_download_link}`);

    }).catch(error => {
      console.error('Error:', error);
      alert("An error occurred while processing the data.");
    });
  };

  return (
    <div>
      <label>Select Package:</label>
      <select
        className="form-select mb-3"
        value={selectedPackage}
        onChange={e => setSelectedPackage(e.target.value)}
      >
        <option value="">Select a package</option>
        <option value="diamond">Diamond</option>
        <option value="silver">Silver</option>
        <option value="platinum">Platinum</option>
        <option value="bronze">Bronze</option>
      </select>

      <label>Select Instructor:</label>
      <select
        className="form-select mb-3"
        value={selectedInstructor}
        onChange={handleInstructorChange}
      >
        <option value="">Select an instructor</option>
        {instructors.map(instructor => (
          <option key={instructor.name} value={instructor.name}>
            {instructor.name}
          </option>
        ))}
      </select>

      <label>Instructor Name:</label>
      <input
        type="text"
        className="form-control mb-3"
        value={instructorDetails.name}
        readOnly
      />
      <label>License Number:</label>
      <input
        type="text"
        className="form-control mb-3"
        value={instructorDetails.license}
        readOnly
      />
      <label>Expiry Date:</label>
      <input
        type="text"
        className="form-control mb-3"
        value={instructorDetails.expiry}
        readOnly
      />

      <textarea
        className="form-control mb-3"
        placeholder="Paste scanned data here..."
        rows="4"
        value={scannedData}
        onChange={e => setScannedData(e.target.value)}
      ></textarea>

      <button className="btn btn-primary" onClick={handleSubmit}>Process Data</button>
    </div>
  );
};

export default LicenseForm;
