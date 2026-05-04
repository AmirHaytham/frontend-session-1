import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import BookListPage from "./pages/BookListPage.jsx";
import BookDetailPage from "./pages/BookDetailPage.jsx";
import AddBookPage from "./pages/AddBookPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookListPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/books/new" element={<AddBookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
