import React, { useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IDCard = ({ data }) => {
  const [template, setTemplate] = useState('template1');
  const cardRef = useRef(null);
  const navigate = useNavigate(); // ✅ Hook for navigation

  const handleDownload = () => {
    if (cardRef.current) {
      htmlToImage.toPng(cardRef.current).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${data.name}_ID.png`;
        link.href = dataUrl;
        link.click();
      });
    }
  };

  const renderTemplate = () => {
    const baseClasses =
      'w-full md:w-[350px] p-4 rounded-xl shadow-lg border flex flex-col items-center';
    const styles = {
      template1: 'bg-white text-gray-800',
      template2: 'bg-blue-100 text-blue-900',
    };

    return (
      <div
        ref={cardRef}
        className={`${baseClasses} ${styles[template]} transition-all duration-300`}
      >
        <img
          src={data.photoPreview}
          alt="Student"
          className="w-24 h-24 rounded-full object-cover border mb-2"
        />
        <h2 className="text-xl font-semibold">{data.name}</h2>
        <p>Roll No: {data.rollNumber}</p>
        <p>Class & Division: {data.classDivision}</p>
        <p>Rack Number: {data.rackNumber}</p>
        <p>Bus Route: {data.busRoute}</p>
        {data.allergies.length > 0 && (
          <div className="mt-2 text-sm text-red-600">
            Allergies: {data.allergies.join(', ')}
          </div>
        )}
        <div className="mt-4">
          <QRCodeCanvas value={JSON.stringify(data)} size={96} />
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 flex flex-col items-center w-full max-w-xl mx-auto">
      {/* Buttons */}
      <div className="flex justify-between w-full mb-6 gap-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all"
        >
          <Download size={20} />
          <span className="font-medium">Download</span>
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4 text-center">Smart ID Card Preview</h1>

      {/* Template Selector */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Select Template:</label>
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="template1">Template 1 (White)</option>
          <option value="template2">Template 2 (Blue)</option>
        </select>
      </div>

      {/* Rendered Card */}
      {renderTemplate()}
    </div>
  );
};

export default IDCard;
