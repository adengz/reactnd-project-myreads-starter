import React from 'react';
import { search } from '../BooksAPI';
import Book from '../components/Book';

class SearchPage extends React.Component {
  state = {
    searchResults: []
  }

  getCurrentShelf = (book) => {
    const idx = this.props.myBooks.findIndex(b => b.id === book.id);
    return idx === -1? 'none': this.props.myBooks[idx].shelf;
  }

  searchHandler = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.query.value.trim().toLowerCase();
    search(searchTerm)
      .then((books) => {
        books.forEach(b => {b.shelf = this.getCurrentShelf(b)});
        this.setState({searchResults: books});
      })
      .catch(() => {
        this.setState({searchResults: []});
      })
  }

  render() {
    const { _, changeShelf, toMainPage } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={toMainPage}>Close</button>
          <div className="search-books-input-wrapper">
            <form onSubmit={this.searchHandler}>
              <input type="text" name="query" placeholder="Search by title or author"/>
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map((book) => (
              <li key={book.id}>
                <Book bookObj={book} changeShelf={changeShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;