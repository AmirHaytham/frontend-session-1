import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link className="navbar-brand" to="/">BookBrowser</Link>
        <div className="navbar-links">
          <Link to="/">Books</Link>
          <Link className="btn btn-outline btn-sm" to="/books/new">
            + Add Book
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
