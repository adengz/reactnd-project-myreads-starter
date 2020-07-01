import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './views/MainPage';
import SearchPage from './views/SearchPage';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    myBooks: []
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
        <Route exact path="/" render={() => (
          <MainPage myBooks={this.state.myBooks} changeShelf={this.changeShelf} />
        )}/>
        <Route path="/search" render={() => (
          <SearchPage myBooks={this.state.myBooks} changeShelf={this.changeShelf} />
        )}/>
      </div>
    );
  }
}

export default BooksApp;
