function searchBooks() {
  const query = document.getElementById('searchInput').value;
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Clear previous results

  if (!query) {
    alert("Please enter a book name.");
    return;
  }

  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const books = data.docs.slice(0, 10); // Show top 10 results

      if (books.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
      }

      books.forEach(book => {
        const title = book.title;
        const author = book.author_name ? book.author_name.join(', ') : "Unknown Author";
        const coverId = book.cover_i;
        const coverURL = coverId
          ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
          : 'https://via.placeholder.com/80x120?text=No+Cover';

        const bookEl = document.createElement('div');
        bookEl.className = 'book';
        bookEl.innerHTML = `
          <img src="${coverURL}" alt="Cover">
          <div>
            <h3>${title}</h3>
            <p><strong>Author:</strong> ${author}</p>
          </div>
        `;

        resultsContainer.appendChild(bookEl);
      });
    })
    .catch(err => {
      resultsContainer.innerHTML = `<p>Error fetching results.</p>`;
      console.error(err);
    });
}