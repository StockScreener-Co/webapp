import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { PortfolioPage } from './pages/PortfolioPage/PortfolioPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio/:id" element={<PortfolioPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
