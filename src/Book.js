import React from 'react';
import PropTypes from 'prop-types';

function Book(props) {
  const imageLinks = props.book.imageLinks
  const thumbnailURL = imageLinks && imageLinks.thumbnail ? imageLinks.thumbnail : ''
  const authors = props.book.authors ? props.book.authors : []
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnailURL})` }}></div>
        <div className="book-shelf-changer">
          <select value={ props.book.shelf } onChange={(e) => props.onCategoryChange(e, props.book)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{ props.book.title }</div>
      { authors.map((author, index) => {
        return <div key={index} className="book-authors">{ author }</div>
      })}
      
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onCategoryChange: PropTypes.func.isRequired
}

export default Book;