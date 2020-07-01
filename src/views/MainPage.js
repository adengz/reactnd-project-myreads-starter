import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from '../components/BookShelf';

function MainPage(props) {
  const { myBooks, changeShelf } = props;
  const currentlyReading = myBooks.filter(book => book.shelf === 'currentlyReading');
  const wantToRead = myBooks.filter(book => book.shelf === 'wantToRead');
  const read = myBooks.filter(book => book.shelf === 'read');

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf title="Currently Reading" books={currentlyReading} changeShelf={changeShelf}/>
          <BookShelf title="Want to Read" books={wantToRead} changeShelf={changeShelf}/>
          <BookShelf title="Read" books={read} changeShelf={changeShelf}/>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
}

export default MainPage;