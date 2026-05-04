import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import BookCard from "../components/BookCard";
import Spinner from "../components/Spinner";

const GENRES = ["", "Fiction", "Non-Fiction", "Science", "History", "Technology", "Other"];
const LIMIT = 9;

function BookListPage() {
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const page   = Number(searchParams.get("page")  || 1);
  const search = searchParams.get("search") || "";
  const genre  = searchParams.get("genre")  || "";

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .get("/books", { params: { page, limit: LIMIT, search, genre } })
      .then(({ data }) => {
        setBooks(data.data);
        setTotal(data.total);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page, search, genre]);

  function update(key, value) {
    const next = new URLSearchParams(searchParams);
    next.set(key, value);
    if (key !== "page") next.set("page", "1");
    setSearchParams(next);
  }

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="page">
      {/* Search & Filter Bar */}
      <div className="flex gap-4 mb-4">
        <input
          className="form-control"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => update("search", e.target.value)}
        />
        <select
          className="form-control"
          value={genre}
          onChange={(e) => update("genre", e.target.value)}
        >
          {GENRES.map((g) => (
            <option key={g} value={g}>{g || "All Genres"}</option>
          ))}
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : books.length === 0 ? (
        <p className="text-muted">No books found.</p>
      ) : (
        <div className="grid">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-4 mt-4">
          <button
            className="btn btn-outline btn-sm"
            disabled={page <= 1}
            onClick={() => update("page", page - 1)}
          >
            ← Prev
          </button>
          <span className="text-muted">Page {page} of {totalPages}</span>
          <button
            className="btn btn-outline btn-sm"
            disabled={page >= totalPages}
            onClick={() => update("page", page + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default BookListPage;
