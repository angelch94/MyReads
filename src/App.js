import React from 'react'
import './App.css'
import * as BooksAPI from "./backend/BooksAPI";
import Header from "./components/Header";
import { Route } from "react-router-dom";
import BookShelf from "./components/BookShelf";
import Search from "./components/Search";

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      shelves: [
        {
          id: 'currentlyReading',
          shelfName: 'Currently Reading',
        },
        {
          id: 'wantToRead',
          shelfName: 'Want to Read',
        },
        {
          id: 'read',
          shelfName: 'Read',
        },
      ],
    };
  }

  componentDidMount() {
    //Get initial all books
    this.initialBooks()
  }

  initialBooks = () => {
    BooksAPI.getAll().then(books => this.setState({ books }))
  }

  updateBooksState = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      BooksAPI.getAll().then(books => {
        this.setState({ books })
      })
    })
  }

  render() {
    return (
      <div className="list-books">
        <Header />
        <Route
          exact
          path="/"
          render={() => (
            <BookShelf
              books={this.state.books}
              shelves={this.state.shelves}
              onUpdateBook={(book, shelf) => {
                this.updateBooksState(book, shelf);
              }}
            />
          )}
        />
        <Route
          path="/search"
          render={({ history }) => (
            <Search
              books={this.state.books}
              onUpdateBook={(book, shelf) => {
                this.updateBooksState(book, shelf);
              }}
              onSelect={() => {
                history.push('/');
              }}
            />
          )}
        />
      </div>
    )
  }

}

export default BooksApp
