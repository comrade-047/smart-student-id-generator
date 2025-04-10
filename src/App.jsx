import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import IDCard from './components/IDCard';
import SavedCards from './components/SavedCards';

const NavigationButtons = ({ navigate }) => (
  <div className="p-4 flex justify-end">
    <button
      onClick={() => navigate('/saved')}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      View Saved Cards
    </button>
  </div>
);

const AppRoutes = ({ currentData, setCurrentData }) => {
  const navigate = useNavigate();

  return (
    <>
      <NavigationButtons navigate={navigate} />
      <Routes>
        <Route
          path="/"
          element={<StudentForm onSubmit={(data) => setCurrentData(data)} />}
        />
        <Route
          path="/preview"
          element={
            currentData ? (
              <IDCard data={currentData} onBack={() => navigate('/')} />
            ) : (
              <div className="p-4 text-center text-red-500">
                No data found. Please fill out the form first.
              </div>
            )
          }
        />
        <Route path="/saved" element={<SavedCards />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

const App = () => {
  const [currentData, setCurrentData] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AppRoutes currentData={currentData} setCurrentData={setCurrentData} />
      </div>
    </Router>
  );
};

export default App;
