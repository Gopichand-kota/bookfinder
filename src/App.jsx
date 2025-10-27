import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [q, setQ] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  async function search(e) {
    e.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    setError("");
    setBooks([]);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=20`
      );
      const data = await res.json();
      const list = (data.docs || []).map((d) => ({
        key: d.key,
        title: d.title,
        author: d.author_name?.join(", "),
        year: d.first_publish_year,
        cover_i: d.cover_i,
        first_sentence: d.first_sentence?.join(" ") || "",
      }));
      setBooks(list);
    } catch {
      setError("Search failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function closePopup() {
    setSelectedBook(null);
  }

  return (
    <>
      <h1>Book Finder</h1>
      <div className="container">
        <form onSubmit={search} className="search-bar">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search books by title, author, or subject..."
          />
          <button type="submit">Search</button>
        </form>

        {loading && <p>Loading books...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="books-grid">
          {books.map((b) => (
            <div key={b.key} className="book-card" onClick={() => setSelectedBook(b)}>
              {b.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`}
                  alt={b.title}
                />
              ) : (
                <div
                  style={{
                    height: 240,
                    background: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#777",
                    borderRadius: "8px",
                  }}
                >
                  No Cover
                </div>
              )}
              <h3>{b.title}</h3>
              <p>{b.author}</p>
              <p style={{ color: "#777" }}>{b.year || ""}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedBook && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopup}>✖</button>
            {selectedBook.cover_i && (
              <img
                src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`}
                alt={selectedBook.title}
                className="popup-img"
              />
            )}
            <h2>{selectedBook.title}</h2>
            <p><strong>Author:</strong> {selectedBook.author}</p>
            <p><strong>Year:</strong> {selectedBook.year}</p>
            {selectedBook.first_sentence && (
              <p><strong>Description:</strong> {selectedBook.first_sentence}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
