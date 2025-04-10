import React, { useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, ArrowLeft } from 'lucide-react';

const IDCard = ({ data, onBack }) => {
  const [template, setTemplate] = useState('template1');
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const cardRef = useRef(null);

  const styles = {
    template1: 'bg-white bg-opacity-60 text-gray-900 backdrop-blur-lg',
    template2: 'bg-cyan-100 bg-opacity-50 text-blue-900 backdrop-blur-l',
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
      'w-full max-w-sm md:max-w-md p-6 rounded-2xl shadow-xl border border-white/20 flex flex-col items-center';
    return (
      <div
        ref={cardRef}
        className={`${baseClasses} ${styles[template]} transition-all duration-300`}
      >
        <img
          src={data.photoPreview}
          alt="Student"
          className="w-24 h-24 rounded-full object-cover border-4 border-white mb-4"
        />
        <h2 className="text-2xl font-semibold mb-1">{data.name}</h2>
        <p className="text-sm mb-1">Roll No: <span className="font-medium">{data.rollNumber}</span></p>
        <p className="text-sm mb-1">Class & Division: <span className="font-medium">{data.classDivision}</span></p>
        <p className="text-sm mb-1">Rack Number: <span className="font-medium">{data.rackNumber}</span></p>
        <p className="text-sm mb-2">Bus Route: <span className="font-medium">{data.busRoute}</span></p>
        {data.allergies.length > 0 && (
          <div className="mt-2 text-sm text-red-600 text-center">
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
    <div className="p-4 sm:p-6 flex flex-col items-center w-full max-w-4xl mx-auto ">
      {/* Header */}
      <div className="w-full flex max-w-4xl justify-between items-center mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white bg-opacity-30 text-white hover:bg-opacity-50 transition backdrop-blur-md"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition"
        >
          <Download size={20} />
          <span className="font-medium">Download</span>
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-6 text-white text-center drop-shadow-lg">Smart ID Card Preview</h1>

      {/* Live Template Selector */}
      <div className="mb-6 w-full max-w-sm text-white">
        <label className="block mb-2 text-base font-semibold">Select Template:</label>
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="w-full p-2 rounded-lg border border-white/30 bg-white/20 text-white shadow-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"
        >
          <option value="template1">Template 1 (White Glass)</option>
          <option value="template2">Template 2 (Cyan Glass)</option>
        </select>
      </div>

      {/* ID Card */}
      {renderTemplate()}

      {/* Modal */}
      {showTemplatePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white bg-opacity-60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-900">Choose Template for Download</h2>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="mb-6 w-full p-2 rounded-lg border border-white/30 bg-white/20 text-gray-900 shadow-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="template1">Template 1 (White Glass)</option>
              <option value="template2">Template 2 (Cyan Glass)</option>
            </select>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowTemplatePicker(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDownload}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
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
