import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PackagesPage from './pages/PackagesPage';
import ItineraryPage from './pages/ItineraryPage';
import SafariBookingPage from './pages/SafariBookingPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/safari-booking" element={<SafariBookingPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
