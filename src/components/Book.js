import * as React from 'react';
import "./../css/Book.css"

const Book = ({ book, imageUrl, onUpdateBook }) => {
    const { authors, shelf, title } = book;

    const handleMoveAction = (event) => {
        const bookToMove = book;
        const shelfToBeMoved = event.target.value;
        onUpdateBook(bookToMove, shelfToBeMoved);
    };

    const formatIfMultipleAuthors = (writers) => {
        if (writers === undefined) {
            return writers;
        }
        return writers.length >= 2 ? writers.join(', ') : writers;
    };

    const isDisabled = true;
    return (
        <li className="books-grid">
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{
                            backgroundImage: `url(${imageUrl})`,
                        }}
                    >
                        <div className="book-shelf-changer">
                            <select
                                value={shelf || 'none'}
                                onChange={handleMoveAction}
                            >
                                <option disabled={isDisabled}>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                </div>
                <span className="book-title">{title}</span>
                <p className="book-authors">
                    {formatIfMultipleAuthors(authors)}
                </p>
            </div>
        </li>
    );
};

export default Book;