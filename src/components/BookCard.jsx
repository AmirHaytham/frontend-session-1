import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div className="card">
      <h3>{book.title}</h3>
      <p className="text-muted">{book.author}</p>
      <span className="badge">{book.genre || "Unknown"}</span>
      <p className="mt-4">
        {book.price != null ? `$${book.price.toFixed(2)}` : "—"}
      </p>
      <Link className="btn btn-outline btn-sm mt-4" to={`/books/${book._id}`}>
        View Details
      </Link>
    </div>
  );
}

export default BookCard;
