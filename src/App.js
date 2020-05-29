import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './MainPage'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
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
    return (
      <div className="app">
        <Route path='/search' render={({history}) => {
          return (
            <SearchPage historyObject={history}/>
          )
        }}/>
        <Route exact path='/' render={({history}) => {
          return (
            <MainPage
              books={this.state.books}
              handleCategoryChange={this.handleCategoryChange}
              historyObject={history}
            />
          )
        }}/>
      </div>
    )
  }
}

export default BooksApp
