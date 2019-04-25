import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelves from './bookshelf'
import { Route, Router, Switch } from 'react-router-dom'
import history from "./History";
import SearchBook from './searchBooks'

class BooksApp extends React.Component {
  state = {
      displaySearch: false,
      listOfBooks : [],
      listOfSearchedBooks: []
  }

  componentDidMount(){
      BooksAPI.getAll().then(data=> {
          this.setState({listOfBooks:data});
      })
  }

  clearSearchResult(){
      this.setState(()=>({
          listOfSearchedBooks: []
      }));
  }

  updateShelf (book, shelf){
      BooksAPI.update(book,shelf)
      .then(data=>{
          if(this.state.listOfBooks.some(bookItem=> bookItem.id===book.id)){
              this.setState((prevState)=> ({
                  listOfBooks : prevState.listOfBooks.map(item=> {
                      if(item.id === book.id){
                          item.shelf = shelf;
                      }
                      return item;
                  })
              }));
          }
          else {
              book.shelf = shelf;
              this.setState((prevState)=> ({
                  listOfBooks : [...prevState.listOfBooks,book]
              }));
          }
      });
  }

  searchBooks(query) {
      if(query){
          BooksAPI.search(query)
          .then(data=> {
              this.setState(()=>({
                  listOfSearchedBooks : data.error? []: data.map(bookData=> {
                      var matchedBook = this.state.listOfBooks.filter(book=> book.id===bookData.id);
                      if(matchedBook && matchedBook.length>0){
                          bookData.shelf = matchedBook[0].shelf;
                      }
                      else {
                          bookData.shelf = "none";
                      }
                      return bookData;
                  })
              }))
          })
      }
      else {
         this.clearSearchResult();
      }
  }


  render() {
    return (
      <div>
          <Router history={history}>
              <Switch>
                  <Route exact path="/" render={()=> (
                      <BookShelves bookList={this.state.listOfBooks} onUpdateShelf={this.updateShelf.bind(this)}/>
                  )} />
                  <Route path="/search" render={({history})=> (
                      <SearchBook listOfSearchedBooks={this.state.listOfSearchedBooks} searchBooks={this.searchBooks.bind(this)} onUpdateShelf={this.updateShelf.bind(this)} onBackPress={()=> {
                          this.clearSearchResult();
                          history.push("/");
                      }} />
                  )} />
              </Switch>
          </Router>
      </div>
    )
  }
}

export default BooksApp
