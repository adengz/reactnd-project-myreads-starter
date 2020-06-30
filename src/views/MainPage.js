import React from 'react';
import BookShelf from '../components/BookShelf';

function MainPage(props) {
  const {currentlyReading, wantToRead, read, toSearchPage } = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf title="Currently Reading" books={currentlyReading}/>
          <BookShelf title="Want to Read" books={wantToRead}/>
          <BookShelf title="Read" books={read}/>
        </div>
      </div>
      <div className="open-search">
        <button onClick={toSearchPage}>Add a book</button>
      </div>
    </div>
  );
}

export default MainPage;