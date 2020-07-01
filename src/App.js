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
    myBooks: [],
    showSearchPage: false
  }

  changeShelf = (book, newShelf) => {
    const idx = this.state.myBooks.findIndex(b => b.id === book.id);
    let myBooksUpdated = [...this.state.myBooks];
    if (idx === -1) {
      book.shelf = newShelf;
      myBooksUpdated.push(book);
    } else if (newShelf === 'none') {
      myBooksUpdated = myBooksUpdated.filter(b => b.id !== book.id);
    } else {
      myBooksUpdated[idx].shelf = newShelf;
    }
    BooksAPI.update(book, newShelf).then(() => {
      this.setState({myBooks: myBooksUpdated});
    });
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({myBooks: books});
    });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage
            myBooks={this.state.myBooks}
            changeShelf={this.changeShelf}
            toMainPage={() => this.setState({showSearchPage: false})}
          />
        ) : (
          <MainPage
            myBooks={this.state.myBooks}
            changeShelf={this.changeShelf}
            toSearchPage={() => this.setState({showSearchPage: true})}
          />
        )}
      </div>
    );
  }
}

export default BooksApp;
