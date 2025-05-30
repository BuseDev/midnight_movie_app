import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
