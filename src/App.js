import React, { useState, useEffect } from 'react';
import LicenseForm from './components/LicenseForm';
import AddInstructorModal from './components/AddInstructorModal';
import OutputSection from './components/OutputSection';
import './App.css';

function App() {
  const [outputData, setOutputData] = useState(null);

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="card shadow p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0">License Data Extractor</h1>
            <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addInstructorModal">
              Add Instructor
            </button>
          </div>
          <LicenseForm setOutputData={setOutputData}/>
          <OutputSection data={outputData}/>
        </div>
      </div>
      <AddInstructorModal />
    </div>
  );
}

export default App;
