import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);

  useEffect(() => {
    if (deleted) {
      setDeleted(false);

      axios
        .get("http://localhost:5000/students")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [deleted]);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <h1>Students Data</h1>
      <div className="d-flex justify-content-end">
        <Link className="btn btn-success" to="/create">
          Add Data
        </Link>
      </div>
      <table className="table table-responsive table-stripe">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action Button</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => {
            return (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>
                  <Link className="btn btn-primary" to={`/view/${student.id}`}>
                    View
                  </Link>
                  <Link className="btn btn-warning" to={`/edit/${student.id}`}>
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
