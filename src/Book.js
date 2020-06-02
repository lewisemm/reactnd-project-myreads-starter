import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'

  class Book extends Component {
    static propTypes = {
      book: PropTypes.object.isRequired,
      onCategoryChange: PropTypes.func.isRequired
    }

    state = {
      shelf: 'none'
    }

    componentDidMount = () => {
      BooksAPI.get(this.props.book.id)
        .then(book => {
          this.setState({
            shelf: book.shelf
          })
        })
    }

    handleShelfChange = (event) => {
      // updates the book object's shelf property
      this.props.onCategoryChange(event, this.props.book)
      // updates the shelf state property for this component
      this.setState({
        shelf: event.target.value
      })
    }

    render = () => {
      const imageLinks = this.props.book.imageLinks
      const thumbnailURL = imageLinks && imageLinks.thumbnail ? imageLinks.thumbnail : ''
      const authors = this.props.book.authors ? this.props.book.authors : []
      return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnailURL})` }}></div>
            <div className="book-shelf-changer">
              <select value={ this.state.shelf } onChange={this.handleShelfChange}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{ this.props.book.title }</div>
          { authors.map((author, index) => {
            return <div key={index} className="book-authors">{ author }</div>
          })}
        </div>
      )
    }
}

export default Book;