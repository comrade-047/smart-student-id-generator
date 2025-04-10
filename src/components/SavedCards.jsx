import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';

const SavedCards = () => {
  const [savedData, setSavedData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('savedCards');
    if (stored) {
      setSavedData(JSON.parse(stored));
    }
  }, []);

  const handleDownload = (data) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const cardWidth = 350;
    const cardHeight = 200;
    canvas.width = cardWidth;
    canvas.height = cardHeight;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, cardWidth, cardHeight);
    ctx.fillStyle = '#000000';
    ctx.font = '16px sans-serif';
    ctx.fillText(`Name: ${data.name}`, 10, 30);
    ctx.fillText(`Roll No: ${data.rollNumber}`, 10, 55);
    ctx.fillText(`Class & Div: ${data.classDivision}`, 10, 80);
    ctx.fillText(`Rack No: ${data.rackNumber}`, 10, 105);
    ctx.fillText(`Bus Route: ${data.busRoute}`, 10, 130);
    if (data.allergies.length > 0) {
      ctx.fillText(`Allergies: ${data.allergies.join(', ')}`, 10, 155);
    }

     
    // Just a visual placeholder, QR code not included in canvas download for now

    const link = document.createElement('a');
    link.download = `${data.name}_Saved_ID.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Form</span>
        </button>
        <h1 className="text-xl font-bold text-center flex-1">Saved ID Cards</h1>
      </div>

      {savedData.length === 0 ? (
        <div className="text-center text-gray-500">No saved cards found.</div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {savedData.map((data, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2 border"
            >
              <div className="flex items-center gap-4">
                <img
                  src={data.photoPreview}
                  alt="Student"
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <h2 className="text-lg font-semibold">{data.name}</h2>
                  <p className="text-sm text-gray-600">Roll No: {data.rollNumber}</p>
                  <p className="text-sm text-gray-600">
                    Class & Div: {data.classDivision}
                  </p>
                  <p className="text-sm text-gray-600">Rack No: {data.rackNumber}</p>
                  <p className="text-sm text-gray-600">Bus Route: {data.busRoute}</p>
                  {data.allergies.length > 0 && (
                    <p className="text-sm text-red-600">
                      Allergies: {data.allergies.join(', ')}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <QRCodeCanvas value={JSON.stringify(data)} size={64} />
                <button
                  onClick={() => handleDownload(data)}
                  className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCards;
