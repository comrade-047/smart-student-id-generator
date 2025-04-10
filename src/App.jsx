import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import StudentForm from './components/StudentForm';
import IDCard from './components/IDCard';
import SavedCards from './components/SavedCards';

const NavigationButtons = ({ navigate }) => {
  const location = useLocation();

  // Hide the button if we're already on the Saved Cards page
  if (location.pathname === '/saved') return null;

  return (
    <div className="p-4 flex justify-end max-w-7xl mx-auto">
      <button
        onClick={() => navigate('/saved')}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition duration-200"
      >
        View Saved Cards
      </button>
    </div>
  );
};

const AppRoutes = ({ currentData, setCurrentData }) => {
  const navigate = useNavigate();

  return (
    <>
      <NavigationButtons navigate={navigate} />
      <div className="max-w-5xl mx-auto px-4">
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
                <div className="p-6 mt-4 text-center text-red-600 bg-red-100 rounded-lg shadow">
                  No data found. Please fill out the form first.
                </div>
              )
            }
          />
          <Route path="/saved" element={<SavedCards />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  const [currentData, setCurrentData] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-grow">
          <AppRoutes currentData={currentData} setCurrentData={setCurrentData} />
        </main>
        <footer className="text-center text-sm text-gray-500 py-4">
          &copy; {new Date().getFullYear()} Smart ID Generator | All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;
