import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks';

const CURRENTLY_READING_SHELF = 'currentlyReading'
const WANT_TO_READ_SHELF = 'wantToRead';
const READ_SHELF = 'read';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState((currentState) => ({
          books: currentState.books.concat(books)
        }));
      });
  }

  handleCategoryChange = (event, book) => {
    let updatedBook = Object.assign({}, book);
    updatedBook.shelf = event.target.value;

    this.setState(currentState => ({
      books: currentState.books.filter(bk => {
        return bk.id !== book.id
      }).concat(updatedBook)
    }));

    BooksAPI.update(book, event.target.value);
  }

  render() {

    const currentlyReadingBooks = this.state.books.filter(book => {
      return book.shelf === CURRENTLY_READING_SHELF
    });
    const wantToReadBooks = this.state.books.filter(book => {
      return book.shelf === WANT_TO_READ_SHELF
    });
    const readBooks = this.state.books.filter(book => {
      return book.shelf === READ_SHELF
    });

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <ListBooks
                    books={ currentlyReadingBooks }
                    onCategoryChange={this.handleCategoryChange}
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <ListBooks
                    books={ wantToReadBooks }
                    onCategoryChange={this.handleCategoryChange}
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <ListBooks
                    books={ readBooks }
                    onCategoryChange={this.handleCategoryChange}
                  />
                </div>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
