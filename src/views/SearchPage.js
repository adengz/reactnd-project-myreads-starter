import React from 'react';
import { Link } from 'react-router-dom';
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
    const { changeShelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
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