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
      <h1 className="text-4xl font-bold text-white text-center mb-8  drop-shadow">Student Information Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 backdrop-blur-2xl text-white border border-white/20 rounded-3xl shadow-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-2 rounded-xl bg-white/20 placeholder-white/80 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="rollNumber"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            required
            className="p-2 rounded-xl bg-white/20 placeholder-white/80 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            name="classDivision"
            value={formData.classDivision}
            onChange={handleChange}
            required
            className="p-2 rounded-xl bg-white/20 placeholder-white/80 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="p-2 rounded-xl bg-white/20 placeholder-white/80 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="p-2 rounded-xl bg-white/20 placeholder-white/80 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-white">Allergies</label>
          <div className="flex flex-wrap gap-4">
            {allergyOptions.map((allergy) => (
              <label key={allergy} className="flex items-center gap-2 text-white/90">
                <input
                  type="checkbox"
                  name="allergies"
                  value={allergy}
                  checked={formData.allergies.includes(allergy)}
                  onChange={handleChange}
                  className="accent-blue-400 w-5 h-5"
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
              className="mt-2 p-2 rounded-xl bg-white/20 placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-1/2"
              required
            />
          )}
        </div>

        <div>
          <label className="block mb-2 font-semibold text-white">Upload Student Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full p-2 rounded-xl bg-white/20 text-white border border-white/30 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
          {formData.photoPreview && (
            <img
              src={formData.photoPreview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-full shadow-lg border-4"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white text-lg font-semibold py-3 rounded-xl shadow-lg hover:from-teal-500 hover:to-blue-600 transition duration-300"
        >
          Generate ID
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
