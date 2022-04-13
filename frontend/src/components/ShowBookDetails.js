import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "../App.css";

const ShowBookDetails = () => {
  const [book, setBook] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const onDeleteClick = async (id) => {
    axios
      .delete("http://localhost:8082/api/books/" + id)
      .then((res) => {
        navigate("/list");
      })
      .catch((err) => {
        console.log("Error form ShowBookDetails_deleteClick");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/books/${params.id}`)
      .then((response) => {
        setBook(response.data);
      });
  }, []);

  return (
    <div className="ShowBookDetails">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h4 className="text-center">View Book's Info</h4>
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

        <div>
          <BookItem book={book} />
        </div>

        <div className="row">
          <div className="col-md-6">
            <a
              type="button"
              style={{backgroundColor: "#dc3545",
                borderColor: "#dc3545"}}
              className="btn btn-outline-danger btn-md btn-block"
              onClick={(e) => onDeleteClick(book._id)}
            >
              Delete Book
            </a>
            
          </div>

          <div className="col-md-6">
            <Link
              to={`/edit-book/${book._id}`}
              style={{backgroundColor: "#0dcaf0",
                borderColor: "#0dcaf0"}}
              className="btn btn-outline-info btn-md btn-block"
            >
              Edit Book
            </Link>
            
          </div>
        </div>
        {/* <br />
          <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Book</button>
          <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Book</button> */}
      </div>
    </div>
  );
};

const BookItem = (props) => {
  const book = props.book;
  return (
    <div>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>{book.title}</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Author</td>
            <td>{book.author}</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>ISBN</td>
            <td>{book.isbn}</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Publisher</td>
            <td>{book.publisher}</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Published Date</td>
            <td>{book.published_date}</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Description</td>
            <td>{book.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowBookDetails;
