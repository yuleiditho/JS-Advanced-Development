document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const cardBooks = document.getElementById('cardBooks');
    
    container.classList.add('preload');

    fetch('https://www.dbooks.org/api/recent')
        .then(response => response.json())
        .then(data => {
            if (data.status !== 'ok' || !data.books) {
                cardBooks.innerHTML = '<p>No books found.</p>';
                return;
            }
            
            data.books.forEach(book => {
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
                cardBooks.appendChild(card);
            });

            setTimeout(() => {
                container.classList.remove('preload');
                container.classList.add('loaded');
            }, 50);
        })
        .catch(error => {
            console.error('Error:', error);
            cardBooks.innerHTML = '<p>Error loading books.</p>';
            container.classList.remove('preload');
        });
});