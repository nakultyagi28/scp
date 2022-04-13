// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import '../App.css';
// // import Navbar from "./Navbar";

// class UpdateBookInfo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: '',
//       isbn: '',
//       author: '',
//       description: '',
//       published_date: '',
//       publisher: ''
//     };
//   }

//   componentDidMount() {
//     // console.log("Print id: " + this.props.match.params.id);
//     axios
//       .get('http://localhost:8082/api/books/'+this.props.match.params.id)
//       .then(res => {
//         // this.setState({...this.state, book: res.data})
//         this.setState({
//           title: res.data.title,
//           isbn: res.data.isbn,
//           author: res.data.author,
//           description: res.data.description,
//           published_date: res.data.published_date,
//           publisher: res.data.publisher
//         })
//       })
//       .catch(err => {
//         console.log("Error from UpdateBookInfo");
//       })
//   };

//   onChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   onSubmit = e => {
//     e.preventDefault();

//     const data = {
//       title: this.state.title,
//       isbn: this.state.isbn,
//       author: this.state.author,
//       description: this.state.description,
//       published_date: this.state.published_date,
//       publisher: this.state.publisher
//     };

//     axios
//       .put('http://localhost:8082/api/books/'+this.props.match.params.id, data)
//       .then(res => {
//         this.props.history.push('/show-book/'+this.props.match.params.id);
//       })
//       .catch(err => {
//         console.log("Error in UpdateBookInfo!");
//       })
//   };

//   render() {
//     return (
//       <div className="UpdateBookInfo">
//         {/* <Navbar /> */}
//         <div className="container">
//           <div className="row">
//             <div className="col-md-8 m-auto">
//               <br />
//               <Link to="/list" className="btn btn-outline-warning float-left">
//                   Show BooK List
//               </Link>
//             </div>
//             <div className="col-md-8 m-auto">
//               <h1 className="display-4 text-center">Edit Book</h1>
//               <p className="lead text-center">
//                   Update Book's Info
//               </p>
//             </div>
//           </div>

//           <div className="col-md-8 m-auto">
//           <form noValidate onSubmit={this.onSubmit}>
//             <div className='form-group'>
//               <label htmlFor="title">Title</label>
//               <input
//                 type='text'
//                 placeholder='Title of the Book'
//                 name='title'
//                 className='form-control'
//                 value={this.state.title}
//                 onChange={this.onChange}
//               />
//             </div>
//             <br />

//             <div className='form-group'>
//             <label htmlFor="isbn">ISBN</label>
//               <input
//                 type='text'
//                 placeholder='ISBN'
//                 name='isbn'
//                 className='form-control'
//                 value={this.state.isbn}
//                 onChange={this.onChange}
//               />
//             </div>

//             <div className='form-group'>
//             <label htmlFor="author">Author</label>
//               <input
//                 type='text'
//                 placeholder='Author'
//                 name='author'
//                 className='form-control'
//                 value={this.state.author}
//                 onChange={this.onChange}
//               />
//             </div>

//             <div className='form-group'>
//             <label htmlFor="description">Description</label>
//               <input
//                 type='text'
//                 placeholder='Describe this book'
//                 name='description'
//                 className='form-control'
//                 value={this.state.description}
//                 onChange={this.onChange}
//               />
//             </div>

//             <div className='form-group'>
//             <label htmlFor="published_date">Published Date</label>
//               <input
//                 type='date'
//                 placeholder='published_date'
//                 name='published_date'
//                 className='form-control'
//                 value={this.state.published_date}
//                 onChange={this.onChange}
//               />
//             </div>
//             <div className='form-group'>
//             <label htmlFor="publisher">Publisher</label>
//               <input
//                 type='text'
//                 placeholder='Publisher of this Book'
//                 name='publisher'
//                 className='form-control'
//                 value={this.state.publisher}
//                 onChange={this.onChange}
//               />
//             </div>

//             <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Book</button>
//             </form>
//           </div>

//         </div>
//       </div>
//     );
//   }
// }

// export default UpdateBookInfo;

import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "../App.css";

const UpdateBookInfo = () => {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [published_date, setPublished_date] = useState("");
  const [publisher, setPublisher] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/books/" + params.id)
      .then((res) => {
        setTitle(res.data.title);
        setIsbn(res.data.isbn);
        setAuthor(res.data.author);
        setDescription(res.data.description);
        setPublished_date(res.data.published_date);
        setPublisher(res.data.publisher);
      })
      .catch((err) => {
        console.log("Error from UpdateBookInfo");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      isbn: isbn,
      author: author,
      description: description,
      published_date: published_date,
      publisher: publisher,
    };

    axios
      .put("http://localhost:8082/api/books/" + params.id, data)
      .then((res) => {
        navigate("/show-book/" + params.id);
      })
      .catch((err) => {
        console.log("Error in UpdateBookInfo!");
      });
  };

  return (
    <div className="UpdateBookInfo">
      {/* <Navbar /> */}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h4 className="text-center">Update Book's Info</h4>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Link to="/list" className="btn btn-outline-warning float-left">
                Show Book List
              </Link>
              <br />
              <hr />
            </div>
          </div>
        </div>

        <div className="col-md-8 m-auto">
          <form noValidate onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Title of the Book"
                name="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                placeholder="ISBN"
                name="isbn"
                className="form-control"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                placeholder="Author"
                name="author"
                className="form-control"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                placeholder="Describe this book"
                name="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="published_date">Published Date</label>
              <input
                type="date"
                placeholder="published_date"
                name="published_date"
                className="form-control"
                value={published_date}
                onChange={(e) => setPublished_date(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="publisher">Publisher</label>
              <input
                type="text"
                placeholder="Publisher of this Book"
                name="publisher"
                className="form-control"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />
            </div>

            <button
              type="submit"
              style={{ backgroundColor: "#0dcaf0", borderColor: "#0dcaf0" }}
              className="btn btn-outline-info btn-md btn-block"
            >
              Update Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBookInfo;
