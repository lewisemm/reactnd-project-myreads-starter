import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

function ListBooks(props) {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        { props.books.map(book => {
          return (
            <li key={book.id}>
              <Book
                book={book}
                onCategoryChange={props.onCategoryChange}
              />
            </li>
          )
        })}
      </ol>
    </div>
  )
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onCategoryChange: PropTypes.func.isRequired
}

export default ListBooks;