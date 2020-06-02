import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'


class SearchPage extends Component {
  state = {
    searchText: '',
    books: []
  }

  handleCloseButton = () => {
    this.props.historyObject.push('/')
  }

  handleSearchText = (event) => {
    this.setState({
      searchText: event.target.value
    }, () => {
      if (this.state.searchText.length < 1) {
        this.setState({ books: [] })
      } else {
        BooksAPI.search(this.state.searchText)
          .then(res => {
            this.setState({
              books: res
            })
          })
      }
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={this.handleCloseButton}>Close</button>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
  
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.searchText}
              onChange={this.handleSearchText}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ListBooks
            books={this.state.books}
            onCategoryChange={this.props.handleCategoryChange}
          />
        </div>
      </div>
    )
  }
}

export default SearchPage;