import React, { useState } from 'react';

const OutputSection = ({data}) => {
    if (!data) {
        return <p>No data yet. Upload and process a license file!</p>;
      }
      const outputData=data;
      console.log("data",data);
  //const [outputData, setOutputData] = useState(null);

  const downloadFile = (downloadLink) => {
    const link = sessionStorage.getItem(downloadLink);
    if (link) {
      const a = document.createElement('a');
      a.href = link;
      a.download = link.split('file=')[1];
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      alert("No file available to download.");
    }
  };

  return (
    <div id="output" className="mt-4 p-3 border rounded bg-white shadow-sm" >
      <h2 className="text-center">Extracted Information</h2>
      <p><strong>First Name:</strong> <span>{outputData?.firstName || 'N/A'}</span></p>
      <p><strong>Last Name:</strong> <span>{outputData?.lastName || 'N/A'}</span></p>
      <p><strong>Address:</strong> <span>{outputData?.address || 'N/A'}</span></p>
      <p><strong>License Number:</strong> <span>{outputData?.licenseNumber || 'N/A'}</span></p>

      <button className="btn btn-success" onClick={() => downloadFile('registrationDownloadLink')}>Download Registration Form</button>
      <button className="btn btn-success" onClick={() => downloadFile('regisNextLink')}>Download Car Sheet</button>
      <button className="btn btn-primary" onClick={() => downloadFile('excelDownloadLink')}>Download Excel File</button>
    </div>
  );
};

export default OutputSection;
