// src/components/StudentForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const classOptions = ['1A', '1B', '2A', '2B'];
const allergyOptions = ['Peanuts', 'Gluten', 'Lactose', 'Soy'];
const busRoutes = ['Route 1', 'Route 2', 'Route 3', 'Route 4'];

const StudentForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    classDivision: '',
    allergies: [],
    rackNumber: '',
    busRoute: '',
    photo: null,
    photoPreview: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      }));
    } else if (name === 'allergies') {
      const value = e.target.value;
      const checked = e.target.checked;
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
  
    // Prepare the data
    const newEntry = {
      ...formData,
      id: Date.now(), // Unique ID for referencing later
    };
  
    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('savedCards')) || [];
    const updated = [...existing, newEntry];
    localStorage.setItem('savedCards', JSON.stringify(updated));
  
    // Trigger preview page
    onSubmit(newEntry); // Pass the current entry to preview
    navigate('/preview');
  };
  

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Student Information</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="rollNumber"
          placeholder="Roll Number"
          value={formData.rollNumber}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="classDivision"
          value={formData.classDivision}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Class & Division</option>
          {classOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div>
          <label className="block mb-1">Allergies</label>
          <div className="flex flex-wrap gap-2">
            {allergyOptions.map((allergy) => (
              <label key={allergy} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  name="allergies"
                  value={allergy}
                  checked={formData.allergies.includes(allergy)}
                  onChange={handleChange}
                />
                <span>{allergy}</span>
              </label>
            ))}
          </div>
        </div>
        <input
          name="rackNumber"
          placeholder="Rack Number"
          value={formData.rackNumber}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="busRoute"
          value={formData.busRoute}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Bus Route</option>
          {busRoutes.map((route) => (
            <option key={route} value={route}>{route}</option>
          ))}
        </select>
        <div>
          <label className="block mb-1">Upload Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            required
          />
          {formData.photoPreview && (
            <img
              src={formData.photoPreview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded shadow"
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
