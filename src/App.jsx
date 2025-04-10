import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import IDCardContainer from './components/IDCardContainer';
import SavedCardsContainer from './components/SavedCardsContainer';
import StudentFormContainer from './components/StudentFormContainer';

const NavigationButtons = ({ navigate }) => {
  const location = useLocation();

  // Hide the button if we're already on the Saved Cards page
  if (location.pathname === '/saved') return null;

  return (
    <div className="p-4 flex justify-end max-w-7xl mx-auto">
      <button
        onClick={() => navigate('/saved')}
        className="px-6 py-2 rounded-xl bg-blue-600  font-semibold shadow-lg text-white bg-gradient-to-r from-teal-400 to blue-500 hover:from-blue-500 hover:to-teal-400 transition duration-300"
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
            element={<StudentFormContainer onSubmit={(data) => setCurrentData(data)} />}
          />
          <Route
            path="/preview"
            element={
              currentData ? (
                <IDCardContainer data={currentData} onBack={() => navigate('/')} />
              ) : (
                <div className="p-6 mt-4 text-center text-red-600 bg-red-100 rounded-lg shadow">
                  No data found. Please fill out the form first.
                </div>
              )
            }
          />
          <Route path="/saved" element={<SavedCardsContainer />} />
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
      <div className="min-h-screen bg-gradient-to-tr from-teal-400 via-blue-400 to-cyan-500 text-white flex flex-col">
        <main className="flex-grow">
          <AppRoutes currentData={currentData} setCurrentData={setCurrentData} />
        </main>
        <footer className="text-center text-sm text-white/80 py-4 backdrop-blur-sm">
          &copy; {new Date().getFullYear()} Smart ID Generator | All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;
