import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const SavedCards = ({
  savedCards,
  cardRefs,
  activeDownloadIndex,
  onBack,
  onStartDownload,
  onDownload
}) => {
  const baseClasses =
    'w-full max-w-sm md:max-w-md p-6 rounded-2xl shadow-lg border flex flex-col items-center transition-all duration-300';
  const styles = {
    template1: 'bg-white text-gray-800 backdrop-blur-md bg-opacity-80',
    template2: 'bg-gradient-to-br from-blue-100 to-blue-300 text-blue-900 backdrop-blur-md bg-opacity-90',
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-8 px-4 py-2 bg-white/80 hover:bg-white rounded shadow text-gray-800 backdrop-blur"
      >
        <ArrowLeft size={20} />
        <span>Back to Form</span>
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center text-white">Saved ID Cards</h1>

      {savedCards.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No saved cards found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {savedCards.map((card, index) => {
            const template = 'template1'; // or dynamically choose if needed
            return (
              <div key={index} className="flex flex-col items-center">
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`${baseClasses} ${styles[template]}`}
                >
                  <img
                    src={card.photoPreview}
                    alt="Student"
                    className="w-28 h-28 rounded-full object-cover border mb-3 shadow"
                  />
                  <h2 className="text-xl font-semibold mb-1">{card.name}</h2>
                  <p className="text-sm">Roll No: {card.rollNumber}</p>
                  <p className="text-sm">Class & Division: {card.classDivision}</p>
                  <p className="text-sm">Rack Number: {card.rackNumber}</p>
                  <p className="text-sm">Bus Route: {card.busRoute}</p>
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
                    className="mt-4 p-2 border rounded-lg w-full text-black"
                    defaultValue="template1"
                    onChange={(e) => onDownload(card, index, e.target.value)}
                  >
                    <option value="" disabled>
                      Choose template to download
                    </option>
                    <option value="template1">Template 1 (White Glass)</option>
                    <option value="template2">Template 2 (Cyan Glass)</option>
                  </select>
                ) : (
                  <button
                    onClick={() => onStartDownload(index)}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
