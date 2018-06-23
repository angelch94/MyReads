import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './../backend/BooksAPI';
import "./../css/Search.css"
import { Link } from "react-router-dom";

class Search extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            searchValue: '',
            updatedResults: [],
        };
    }

    render() {
        const { books, onUpdateBook } = this.props;
        const shelvesBooksState = new Map();
        books.forEach(book => {
            shelvesBooksState.set(book.id, book.shelf);
        });

        const handleSearchValue = e => {
            let searchValue = e.target.value;
            if (searchValue === '' || searchValue === undefined) {
                this.setState({ searchValue: '' });
            } else {
                this.setState({ searchValue });
                BooksAPI.search(this.state.searchValue)
                    .then(initialResults => {
                        let updatedResults = initialResults.map(
                            (result) => {
                                if (shelvesBooksState.has(result.id) === true) {
                                    const shelf = shelvesBooksState.get(result.id);
                                    return {
                                        ...result,
                                        shelf,
                                    };
                                }
                                return {
                                    ...result,
                                };
                            },
                        );
                        this.setState({
                            updatedResults,
                            error: false,
                        });
                    })
                    .catch(() => {
                        this.setState({
                            error: true,
                        });
                    });
            }
        };

        return (
            <div>
                <div className="search-books-bar">
                    <form className="search-books-input-wrapper" >
                        <input className="search-books-bar-input"
                            onChange={e => handleSearchValue(e)}
                            placeholder="Introduce your search term."
                            value={this.state.searchValue}
                        />
                    </form>
                </div>

                <div className="search-books-results">
                    <ol className="search-books-ol">
                        {this.state.error && (
                            <div styles={{ textAlign: "center" }}>
                                There are no results for this input, please make sure that you typed the correct keyword:
                <p>
                                    Android, Art, Artificial Intelligence, Astronomy, Austen,
                                    Baseball, Basketball, Bhagat, Biography, Brief, Business,
                                    Camus, Cervantes, Christie, Classics, Comics, Cook, Cricket,
                                    Cycling, Desai, Design, Development, Digital Marketing, Drama,
                                    Drawing, Dumas, Education, Everything, Fantasy, Film, Finance,
                                    First, Fitness, Football, Future, Games, Gandhi, Homer,
                                    Horror, Hugo, Ibsen, Journey, Kafka, King, Lahiri, Larsson,
                                    Learn, Literary Fiction, Make, Manage, Marquez, Money,
                                    Mystery, Negotiate, Painting, Philosophy, Photography, Poetry,
                                    Production, Programming, React, Redux, River, Robotics,
                                    Rowling, Satire, Science Fiction, Shakespeare, Singh,
                                    Swimming, Tale, Thrun, Time, Tolstoy, Travel, Ultimate,
                                    Virtual Reality, Web Development, iOS
                </p>
                                <p style={{ textAlign: "center" }}> Other Results that may interest you:</p>
                            </div>
                        )}
                        {this.state.updatedResults.length > 0 &&
                            this.state.updatedResults.map(
                                (searchResult) => (
                                    <Book
                                        key={searchResult.id}
                                        book={searchResult}
                                        imageUrl={
                                            searchResult.imageLinks !== undefined
                                                ? searchResult.imageLinks.smallThumbnail
                                                : ''
                                        }
                                        onUpdateBook={onUpdateBook}
                                    />
                                ),
                            )}
                    </ol>
                </div>
                <div className="close-search">
                    <Link className="close-search-link" to="/">Go back</Link>
                </div>
            </div>
        );
    }
}

export default Search;