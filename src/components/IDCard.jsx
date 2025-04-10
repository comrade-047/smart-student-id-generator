import React, { useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, ArrowLeft } from 'lucide-react';

const IDCard = ({ data, onBack }) => {
  const [template, setTemplate] = useState('template1');
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const cardRef = useRef(null);

  const styles = {
    template1: 'bg-white text-gray-800',
    template2: 'bg-blue-100 text-blue-900',
  };

  const handleDownload = () => {
    setShowTemplatePicker(true);
  };

  const confirmDownload = () => {
    setShowTemplatePicker(false);
    if (cardRef.current) {
      htmlToImage.toPng(cardRef.current).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${data.name}_ID_${template}.png`;
        link.href = dataUrl;
        link.click();
      });
    }
  };

  const renderTemplate = () => {
    const baseClasses =
      'w-full md:w-[350px] p-4 rounded-xl shadow-lg border flex flex-col items-center';
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
      {/* Top Buttons */}
      <div className="flex justify-between w-full mb-6 gap-4">
        <button
          onClick={onBack}
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

      {/* Live Template Selector */}
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

      {/* ID Card Preview */}
      {renderTemplate()}

      {/* Template Modal */}
      {showTemplatePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">Choose Template for Download</h2>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="mb-4 p-2 border rounded w-full"
            >
              <option value="template1">Template 1 (White)</option>
              <option value="template2">Template 2 (Blue)</option>
            </select>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowTemplatePicker(false)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDownload}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IDCard;
