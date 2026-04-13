import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Films from './pages/Films';
import Series from './pages/Series';
import NewHot from './pages/NewHot';
import MyList from './pages/MyList';
import Search from './pages/Search';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films" element={<Films />} />
          <Route path="/series" element={<Series />} />
          <Route path="/new" element={<NewHot />} />
          <Route path="/mylist" element={<MyList />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
