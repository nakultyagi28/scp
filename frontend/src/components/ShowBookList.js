import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
// import Navbar from "./Navbar";
class ShowBookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8082/api/books")
      .then((res) => {
        this.setState({
          books: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowBookList");
      });
  }

  handleLogout = (e) => {
    e.preventDefault();
    window.location.href = "/login";
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  render() {
    const books = this.state.books;
    console.log("PrintBook: " + books);
    let bookList;

    if (!books) {
      bookList = "there is no book recored!";
    } else {
      bookList = books.map((book, k) => <BookCard book={book} key={k} />);
    }

    return (
      <div className="ShowBookList">
        {/* <Navbar /> */}
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <br />
              <h2 className="text-center">Books List</h2>
            </div>
            <div className="col-md-2">
              <div>
                <br />
                <figure
                  onClick={this.handleLogout}
                  style={{cursor: "pointer" }}
                >
                  <img
                    src="../../icons8-logout-58.png"
                    style={{ width: "17%", float: "right" }}
                    alt="Sign Out"
                  />
                  <figcaption>Sign Out</figcaption>
                </figure>
              </div>
            </div>
            <div className="row">
              <div className="col-md-9"></div>
              <div className="col-md-3">
                <Link
                  to="/create-book"
                  style={{ color: "#fff" }}
                  className="btn btn-outline-warning float-right"
                >
                  + Add New Book
                </Link>
                <br />
              </div>
            </div>
          </div>
          <hr />

          <div className="list">{bookList}</div>
        </div>
      </div>
    );
  }
}

export default ShowBookList;
