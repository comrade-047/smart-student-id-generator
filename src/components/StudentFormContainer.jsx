import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentForm from './StudentForm'; // adjust path as needed

const StudentFormContainer = ({ onSubmit }) => {
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
    <StudentForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default StudentFormContainer;
