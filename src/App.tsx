import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Metrics from './pages/Metrics';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
