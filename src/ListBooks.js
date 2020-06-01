import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

function ListBooks(props) {
  if (props.books.error) {
    return (
      <p>
        Sorry. Could not find a book or author that matches your search text.
      </p>
    )
  }
  return (
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
  )
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onCategoryChange: PropTypes.func.isRequired
}

export default ListBooks;