import React from 'react';

function Book(props) {
  const { bookObj, changeShelf } = props;
  const shelfChangeHandler = (e) => {
    const newShelf = e.target.value;
    changeShelf(bookObj, newShelf);
  }

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${bookObj.imageLinks && bookObj.imageLinks.thumbnail})`
          }}
        ></div>
        <div className="book-shelf-changer">
          <select value={bookObj.shelf? bookObj.shelf:'none'} onChange={shelfChangeHandler}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{bookObj.title}</div>
      <div className="book-authors">{bookObj.authors && bookObj.authors[0]}</div>
    </div>
  );
}

export default Book;