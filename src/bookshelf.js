import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './book'

class BookShelves extends React.Component {

    static propTypes = {
        bookList: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    }

    state = {
        shelfs: [
            {title:"Currently Reading", value:"currentlyReading"},
            {title:"Want to Read", value:"wantToRead"},
            {title:"Read", value:"read"}
        ]
    }

    filterBooks(shelf) {
      return this.props.bookList.filter(book=>book.shelf === shelf.value)
    }

    render() {
        var shelfs = this.state.shelfs;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <div className="list-books-title-search">
                        {<Link to="/search">Search</Link>}
                        {/*<button type="button" onClick={()=> this.props.history.push("/search")}>Search</button>*/}
                    </div>
                    <div className="list-books-title-heading">
                        <h1>MyReads</h1>
                    </div>
                </div>
                <div className="list-books-content">
                    <div>
                        {
                            shelfs.map(shelf=> {
                                return (
                                  <div className="bookshelf">
                                  <h2 className="bookshelf-title">{shelf.title}</h2>
                                  <div className="bookshelf-books">
                                    <ol className="books-grid">
                                      { this.filterBooks(shelf).map((book,index) => {
                                          return <Book key={index} book={book}  onUpdateShelf={this.props.onUpdateShelf}/>
                                      })}
                                    </ol>
                                  </div>
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default BookShelves
