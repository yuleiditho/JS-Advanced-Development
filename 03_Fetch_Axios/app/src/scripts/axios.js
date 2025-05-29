document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('resultsContainer');

    function showMessage(type, text) {
        resultsContainer.innerHTML = `
            <div class="message-container">
                <div class="message-content message-${type}">
                    <p>${text}</p>
                </div>
            </div>
        `;
    }

    function displayBooks(books) {
        resultsContainer.innerHTML = '';
        
        if(!books || books.length === 0) {
            showMessage('empty', 'No books found');
            return;
        }

        const booksGrid = document.createElement('div');
        booksGrid.className = 'books-grid';
        
        books.forEach(book => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${book.image}">
                <h2>${book.title}</h2>
                <p>By: ${book.authors || 'Unknown author'}</p>
                <button>View Details</button>
            `;
            
            card.querySelector('button').addEventListener('click', () => {
                window.location.href = `info.html?id=${book.id}`;
            });
            
            booksGrid.appendChild(card);
        });
        
        resultsContainer.appendChild(booksGrid);
    }

    function searchBooks() {
        const query = searchInput.value.trim();
        if (!query) return;

        showMessage('loading', 'Searching books...');

        axios.get(`https://www.dbooks.org/api/search/${query}`)
            .then(response => {
                if (response.data.status === 'ok') {
                    displayBooks(response.data.books);
                } else {
                    showMessage('empty', 'No books found');
                }
            })
            .catch(error => {
                console.error('Search error:', error);
                showMessage('error', 'Error searching books. Please try again.');
            });
    }

    searchBtn.addEventListener('click', searchBooks);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchBooks();
    });
});