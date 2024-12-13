import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage';
import NotiTarahumara from './pages/Noti-tarahumara'; // Asegúrate de crear este componente
import Kardex from './pages/Kardex';
import Cursos from './pages/Cursos';
import Assign from './pages/Assign';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <div style={{ marginLeft: '0px' }}> {/* Asegúrate de ajustar el margen para dejar espacio al Sidebar */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Notitarahumara" element={<NotiTarahumara />} />
            <Route path="/Kardex" element={<Kardex />} />
            <Route path="/Cursos" element={<Cursos />} />
            <Route path="/Assign" element={<Assign />} />
            {/* Añade otras rutas aquí */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
