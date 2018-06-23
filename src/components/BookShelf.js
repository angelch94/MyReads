import * as React from 'react';
import Book from './Book';
import "./../css/BookShelf.css"
import { Link } from "react-router-dom";

const BookShelf = ({ books, shelves, onUpdateBook }) => (
  <div className="list-books-content">
    {shelves.map(shelf => (
      <div className="bookshelf" key={shelf.id}>
        <div className="bookshelf-title">{shelf.shelfName}</div>
        <div className="bookshelf-books">
          <ol className="bookshelf-ol">
            {books
              .filter(books => books.shelf === shelf.id)
              .map(book => (
                <Book
                  key={book.id}
                  book={book}
                  imageUrl={
                    book.imageLinks !== undefined
                      ? book.imageLinks.smallThumbnail
                      : ''
                  }
                  onUpdateBook={onUpdateBook}
                />
              ))}
          </ol>
        </div>
      </div>
    ))}
    <div className="open-search">
      <Link to="/search">Add a Book</Link>
    </div>
  </div>
);

export default BookShelf;