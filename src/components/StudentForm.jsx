import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const classOptions = ['1A', '1B', '2A', '2B'];
const allergyOptions = ['Peanuts', 'Gluten', 'Lactose', 'Soy', 'Other'];
const busRoutes = ['Route 1', 'Route 2', 'Route 3', 'Route 4'];

const StudentForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    classDivision: '',
    allergies: [],
    otherAllergy: '',
    rackNumber: '',
    busRoute: '',
    photo: null,
    photoPreview: null,
  });

  const handleChange = (e) => {
    const { name, value, files, checked } = e.target;
    if (name === 'photo') {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      }));
    } else if (name === 'allergies') {
      setFormData((prev) => ({
        ...prev,
        allergies: checked
          ? [...prev.allergies, value]
          : prev.allergies.filter((a) => a !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let finalAllergies = [...formData.allergies];
    if (finalAllergies.includes('Other') && formData.otherAllergy.trim() !== '') {
      finalAllergies = finalAllergies.filter(a => a !== 'Other');
      finalAllergies.push(formData.otherAllergy.trim());
    }

    const newEntry = {
      ...formData,
      allergies: finalAllergies,
      id: Date.now(),
    };

    const existing = JSON.parse(localStorage.getItem('savedCards')) || [];
    localStorage.setItem('savedCards', JSON.stringify([...existing, newEntry]));
    onSubmit(newEntry);
    navigate('/preview');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Student Information Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 border rounded w-full"
          />
          <input
            name="rollNumber"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            required
            className="p-3 border rounded w-full"
          />
          <select
            name="classDivision"
            value={formData.classDivision}
            onChange={handleChange}
            required
            className="p-3 border rounded w-full"
          >
            <option value="">Select Class & Division</option>
            {classOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <select
            name="busRoute"
            value={formData.busRoute}
            onChange={handleChange}
            required
            className="p-3 border rounded w-full"
          >
            <option value="">Select Bus Route</option>
            {busRoutes.map((route) => (
              <option key={route} value={route}>{route}</option>
            ))}
          </select>
          <input
            name="rackNumber"
            placeholder="Rack Number"
            value={formData.rackNumber}
            onChange={handleChange}
            required
            className="p-3 border rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Allergies</label>
          <div className="flex flex-wrap gap-4">
            {allergyOptions.map((allergy) => (
              <label key={allergy} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="allergies"
                  value={allergy}
                  checked={formData.allergies.includes(allergy)}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                <span>{allergy}</span>
              </label>
            ))}
          </div>

          {formData.allergies.includes('Other') && (
            <input
              type="text"
              name="otherAllergy"
              placeholder="Please specify"
              value={formData.otherAllergy}
              onChange={handleChange}
              className="mt-3 p-3 border rounded w-full md:w-1/2"
              required
            />
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Upload Student Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          {formData.photoPreview && (
            <img
              src={formData.photoPreview}
              alt="Preview"
              className="mt-4 w-32 h-32 object-cover rounded-full shadow border"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Generate ID
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
