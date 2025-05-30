import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Sets from "./pages/Sets";
import FavoritesPage from "./pages/FavoritesPage";
import { FavoritesProvider } from "./Context/FavoritesContext";
import CardDetailPage from "./pages/CardDetailPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <FavoritesProvider>
        <Router>
          {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav> */}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sets" element={<Sets />} />
            <Route path="/about" element={<About />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/card/:id" element={<CardDetailPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </>
  );
}

export default App;
