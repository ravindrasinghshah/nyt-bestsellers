import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from './components/Home';
import TermsOfUse from './components/TermsOfUse';
import Book from './components/Book';
import NotFound from './components/NotFound';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <div className={style.wrapper}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/book" element={<Book />} />

          <Route exact path="/about" element={<AboutUs />} />
          <Route exact path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
export default App;

const style = {
  wrapper: `h-screen w-screen flex flex-col font-light`,
};