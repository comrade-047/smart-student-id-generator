// components/IDCard.jsx
import React, { forwardRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const templateStyles = {
  template1: 'bg-white bg-opacity-60 text-gray-900 backdrop-blur-lg',
  template2: 'bg-cyan-100 bg-opacity-50 text-blue-900 backdrop-blur-l',
};

const IDCard = forwardRef(({ data, template }, ref) => {
  const baseClasses =
    'w-full max-w-sm md:max-w-md p-6 rounded-2xl shadow-xl border border-white/20 flex flex-col items-center';

  return (
    <div
      ref={ref}
      className={`${baseClasses} ${templateStyles[template]} transition-all duration-300`}
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
        <div className="mt-2 text-sm text-red-500 text-center">
          Allergies: {data.allergies.join(', ')}
        </div>
      )}
      <div className="mt-4">
        <QRCodeCanvas value={JSON.stringify(data)} size={96} />
      </div>
    </div>
  );
});

export default IDCard;
