import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="app">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route 
            path="/" 
            element={<HomePage searchQuery={searchQuery} />} 
          />
          <Route 
            path="/product/:id" 
            element={<ProductPage />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
