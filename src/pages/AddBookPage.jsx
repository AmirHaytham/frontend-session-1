import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const GENRES = ["Fiction", "Non-Fiction", "Science", "History", "Technology", "Other"];

const INITIAL = { title: "", author: "", isbn: "", genre: "", price: "", publishedYear: "" };

function AddBookPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/books", form);
      navigate(`/books/${data.data._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-narrow">
      <h2 className="mb-4">Add New Book</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input className="form-control" name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Author *</label>
          <input className="form-control" name="author" value={form.author} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>ISBN</label>
          <input className="form-control" name="isbn" value={form.isbn} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <select className="form-control" name="genre" value={form.genre} onChange={handleChange}>
            <option value="">— Select —</option>
            {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Price ($)</label>
          <input className="form-control" type="number" step="0.01" name="price" value={form.price} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Published Year</label>
          <input className="form-control" type="number" name="publishedYear" value={form.publishedYear} onChange={handleChange} />
        </div>
        <button className="btn btn-primary btn-block" disabled={loading}>
          {loading ? "Saving..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}

export default AddBookPage;
