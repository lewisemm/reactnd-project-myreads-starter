import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'

const CURRENTLY_READING_SHELF = 'currentlyReading'
const WANT_TO_READ_SHELF = 'wantToRead'
const READ_SHELF = 'read'

class MainPage extends Component {

  static propTypes = {
    historyObject: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    handleCategoryChange: PropTypes.func.isRequired
  }

  handleAddBook = () => {
    this.props.historyObject.push('/search')
  }

  render() {
    const currentlyReadingBooks = this.props.books.filter(book => {
      return book.shelf === CURRENTLY_READING_SHELF
    });
    const wantToReadBooks = this.props.books.filter(book => {
      return book.shelf === WANT_TO_READ_SHELF
    });
    const readBooks = this.props.books.filter(book => {
      return book.shelf === READ_SHELF
    });

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ListBooks
                  books={ currentlyReadingBooks }
                  onCategoryChange={this.props.handleCategoryChange}
                />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ListBooks
                  books={ wantToReadBooks }
                  onCategoryChange={this.props.handleCategoryChange}
                />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ListBooks
                  books={ readBooks }
                  onCategoryChange={this.props.handleCategoryChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <button onClick={this.handleAddBook}>Add a book</button>
        </div>
      </div>
    )
  }
}

export default MainPage