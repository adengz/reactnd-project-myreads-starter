import React from 'react';
import MainPage from './views/MainPage';
import SearchPage from './views/SearchPage';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    allBooks: [],
    showSearchPage: false
  }

  changeShelf = (book, newShelf) => {
    const idx = this.state.allBooks.findIndex(b => b.id === book.id);
    const updatedBooks = [...this.state.allBooks];
    updatedBooks[idx].shelf = newShelf;
    BooksAPI.update(book, newShelf).then(() => {
      this.setState({allBooks: updatedBooks});
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({allBooks: books});
    });
  }

  render() {
    const currentlyReading = this.state.allBooks.filter(book => book.shelf === 'currentlyReading');
    const wantToRead = this.state.allBooks.filter(book => book.shelf === 'wantToRead');
    const read = this.state.allBooks.filter(book => book.shelf === 'read');

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage toMainPage={() => this.setState({showSearchPage: false})}/>
        ) : (
          <MainPage
            currentlyReading={currentlyReading}
            wantToRead={wantToRead}
            read={read}
            changeShelf={this.changeShelf}
            toSearchPage={() => this.setState({showSearchPage: true})}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
