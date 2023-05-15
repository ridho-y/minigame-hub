import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
// import Footer from './components/Footer';
import Home from './pages/Home';
import Blanko from './pages/Blanko';
import Slido from './pages/Slido';
import Tetris from './pages/Tetris';
import Page404 from './pages/Page404';
import Game2048 from './pages/Game2048';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#417555',
    },
    secondary: {
      main: '#e6b000',
    },
    background: {
      paper: '#f7f7f7',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blanko" element={<Blanko />} />
          <Route path="/slido" element={<Slido />} />
          <Route path="/tetris" element={<Tetris />} />
          <Route path="/2048" element={<Game2048 />} />
          {/* <Route path='/crossword' element={<Todo/>} /> */}
          {/* <Route path='/sudoku' element={<StarRating/>} /> */}
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
        {/* <Footer /> */}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
