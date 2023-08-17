import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ContentBox from './components/ContentBox';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/:id?' element={<ContentBox />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
