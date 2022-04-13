import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../App.css";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [published_date, setPublished_date] = useState("");
  const [publisher, setPublisher] = useState("");

  const navigate = useNavigate();

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
      .post("http://localhost:8082/api/books", data)
      .then((res) => {
        setTitle("");
        setIsbn("");
        setAuthor("");
        setDescription("");
        setPublished_date("");
        setPublisher("");
        navigate("/list");
      })
      .catch((err) => {
        console.log("Error in CreateBook!");
      });
  };

  return (
    <div className="CreateBook">
      {/* <Navbar /> */}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="text-center">Create new book</h2>
          </div>
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to="/list"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#fff",
                  float: "right",
                }}
                className="btn btn-outline-warning float-left"
              >
                Show BooK List
              </Link>

              <br />
              <hr />
            </div>
          </div>
        </div>
        <div className="row">
          <section className="createBookSection">
            <div className="row">
              <div className="col-md-6 m-auto">
                <form noValidate onSubmit={handleSubmit}>
                  <div className="form-group">
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
                    <input
                      type="text"
                      placeholder="Publisher of this Book"
                      name="publisher"
                      className="form-control"
                      value={publisher}
                      onChange={(e) => setPublisher(e.target.value)}
                    />
                  </div>

                  <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
