import React, { useState } from 'react';
import { fetchInstructors, processData } from '../api';

const AddInstructorModal = () => {
  const [instructorName, setInstructorName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
const url="http://127.0.0.1:5001"
  const saveInstructor = () => {
    fetch(`${url}/add-instructor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: instructorName, license: licenseNumber, expiry: expiryDate }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Instructor added!");
        // Refresh instructors after adding
        fetchInstructors();
      } else {
        alert("Error saving instructor.");
      }
    });
  };

  const showModal = () => {
    const modal = new window.bootstrap.Modal(document.getElementById('addInstructorModal'));
    modal.show();
  };

  return (
    <div>
     

      <div className="modal fade" id="addInstructorModal" tabIndex="-1" aria-labelledby="addInstructorModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <h5 className="modal-title" id="addInstructorModalLabel">Add Instructor</h5>
            <div className="modal-body">
              <input
                className="form-control mb-2"
                placeholder="Instructor Name"
                value={instructorName}
                onChange={e => setInstructorName(e.target.value)}
              />
              <input
                className="form-control mb-2"
                placeholder="License Number"
                value={licenseNumber}
                onChange={e => setLicenseNumber(e.target.value)}
              />
              <input
                type="date"
                className="form-control mb-2"
                value={expiryDate}
                onChange={e => setExpiryDate(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button className="btn btn-primary" onClick={saveInstructor}>Save Instructor</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInstructorModal;
