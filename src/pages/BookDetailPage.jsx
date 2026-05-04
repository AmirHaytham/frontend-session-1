import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Spinner from "../components/Spinner";

function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/books/${id}`)
      .then(({ data }) => setBook(data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (!window.confirm("Delete this book?")) return;
    try {
      await api.delete(`/books/${id}`);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <Spinner />;
  if (error)   return <div className="page"><div className="alert alert-error">{error}</div></div>;
  if (!book)   return null;

  return (
    <div className="page-medium">
      <div className="card">
        <h2>{book.title}</h2>
        <p className="text-muted mt-4">by {book.author}</p>
        <hr className="mt-4" />
        <p><strong>Genre:</strong> {book.genre || "—"}</p>
        <p><strong>ISBN:</strong> {book.isbn || "—"}</p>
        <p><strong>Price:</strong> {book.price != null ? `$${book.price.toFixed(2)}` : "—"}</p>
        <p><strong>Year:</strong> {book.publishedYear || "—"}</p>

        <div className="flex gap-4 mt-4">
          <button className="btn btn-outline btn-sm" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>
            Delete Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;
