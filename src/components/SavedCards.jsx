// src/components/SavedCards.jsx
import React, { useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const SavedCards = () => {
  const navigate = useNavigate();
  const savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
  const cardRefs = useRef({});
  const [activeDownloadIndex, setActiveDownloadIndex] = useState(null); // Track which card is downloading

  const baseClasses =
    'w-full md:w-[350px] p-4 rounded-xl shadow-lg border flex flex-col items-center';
  const styles = {
    template1: 'bg-white text-gray-800',
    template2: 'bg-blue-100 text-blue-900',
  };

  const handleStartDownload = (index) => {
    setActiveDownloadIndex(index); // Show template selector
  };

  const handleDownload = async (card, index) => {
    const cardNode = cardRefs.current[index];

    if (cardNode) {
      setActiveDownloadIndex(null); // Hide selector after selection
      setTimeout(() => {
        htmlToImage.toPng(cardNode).then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `${card.name}_ID.png`;
          link.href = dataUrl;
          link.click();
        });
      }, 100); // Small delay to ensure UI updates
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-800"
      >
        <ArrowLeft size={20} />
        <span>Back to Form</span>
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">Saved ID Cards</h1>

      {savedCards.length === 0 ? (
        <p className="text-center text-gray-500">No saved cards found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {savedCards.map((card, index) => {
            const template = activeDownloadIndex === index ? 'template1' : 'template1'; // Default for UI render
            return (
              <div key={index} className="flex flex-col items-center">
                {/* Render Card */}
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`${baseClasses} ${styles[template]} transition-all duration-300`}
                >
                  <img
                    src={card.photoPreview}
                    alt="Student"
                    className="w-24 h-24 rounded-full object-cover border mb-2"
                  />
                  <h2 className="text-xl font-semibold">{card.name}</h2>
                  <p>Roll No: {card.rollNumber}</p>
                  <p>Class & Division: {card.classDivision}</p>
                  <p>Rack Number: {card.rackNumber}</p>
                  <p>Bus Route: {card.busRoute}</p>
                  {card.allergies.length > 0 && (
                    <div className="mt-2 text-sm text-red-600">
                      Allergies: {card.allergies.join(', ')}
                    </div>
                  )}
                  <div className="mt-4">
                    <QRCodeCanvas value={JSON.stringify(card)} size={96} />
                  </div>
                </div>

                {/* Action Section */}
                {activeDownloadIndex === index ? (
                  <select
                    className="mt-3 p-2 border rounded"
                    defaultValue="template1"
                    onChange={(e) =>
                      handleDownload(card, index, e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Choose template to download
                    </option>
                    <option value="template1">Template 1 (White)</option>
                    <option value="template2">Template 2 (Blue)</option>
                  </select>
                ) : (
                  <button
                    onClick={() => handleStartDownload(index)}
                    className="mt-3 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    <Download size={20} />
                    <span>Download</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedCards;
