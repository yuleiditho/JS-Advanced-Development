const bookTitle = document.getElementById('book-title');
const bookSubtitle = document.getElementById('book-subtitle');
const bookAuthors = document.getElementById('book-authors');
const description = document.getElementById('book-description');
const bookImage = document.getElementById('book-image');
const bookPages = document.getElementById('book-pages');
const bookYear = document.getElementById('book-year');
const bookPublisher = document.getElementById('book-publisher');
const downloadBtn = document.getElementById('download-btn');
const bookDetailContainer = document.querySelector('.book-detail');

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.book-detail-container');
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');
    
    function showError(message) {
        bookDetailContainer.innerHTML = `
            <div class="error-message">
                <h1>${message}</h1>
                <a href="index.html" class="back-button">Back to Books</a>
            </div>
        `;
    }
    
    if(!bookId) {
        showError('Book ID not provided.');
        return;
    }

    container.classList.add('preload');

    fetch(`https://www.dbooks.org/api/book/${bookId}`)
        .then(response => response.json())
        .then(book => {
            if (book.status !== 'ok') {
                showError('Book not found.');
                return;
            }
            
            bookTitle.textContent = book.title;
            bookSubtitle.textContent = book.subtitle || '';
            bookAuthors.textContent = `By: ${book.authors}`;
            description.textContent = book.description;
            bookImage.src = book.image;
            bookPages.textContent = `Pages: ${book.pages}`;
            bookYear.textContent = `Year: ${book.year}`;
            bookPublisher.textContent = `Publisher: ${book.publisher}`;
            
            downloadBtn.href = book.download;
            downloadBtn.textContent = 'Download Book';

            setTimeout(() =>{
                container.classList.remove('preload');
                container.classList.add('loaded');
            }, 5);
        })
        .catch(error => {
            console.error('Error:', error);
            showError('Error loading book details.');
            container.classList.remove('preload');
        });

});