import React from 'react';
import Book from './Book';

function BookShelf(props) {
  const { title, books, changeShelf } = props;
  
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book bookObj={book} changeShelf={changeShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default BookShelf;