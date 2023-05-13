import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blanko from './pages/Blanko';
import Slido from './pages/Slido';
import Tetro from './pages/Tetro';
import Page404 from './pages/Page404';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blanko" element={<Blanko />} />
        <Route path="/slido" element={<Slido />} />
        {/* <Route path="/tetro" element={<Tetro />} /> */}
        {/* <Route path='/crossword' element={<Todo/>} /> */}
        {/* <Route path='/sudoku' element={<StarRating/>} /> */}
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
