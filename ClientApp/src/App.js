import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BooksProvider } from "./context/BooksContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Book from "./pages/Book";
import BestSellers from "./pages/BestSellers";
import AboutUs from "./pages/AboutUs";
import TermsOfUse from "./pages/TermsOfUse";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BooksProvider>
      <div className={style.wrapper}>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/book" element={<Book />} />
            <Route
              exact
              path="/best-sellers/:category"
              element={<BestSellers />}
            />
            <Route exact path="/about" element={<AboutUs />} />
            <Route exact path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </BooksProvider>
  );
}
export default App;

const style = {
  wrapper: `h-screen w-full flex flex-col font-light`,
};
