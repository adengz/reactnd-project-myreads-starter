import React, { Component } from 'react';
import Book from './Book';

function BookShelf(props) {
  const { title, books } = props;
  
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li>
              <Book imageLink={book.imageLink} title={book.title} authors={book.authors}/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default BookShelf;