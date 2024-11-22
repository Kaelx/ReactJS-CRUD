import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function View() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get_student/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="container">
      <h1>Student {id}</h1>
      <div className="d-flex justify-content-end">
        <Link className="btn btn-secondary" to="/">
          Go Back
        </Link>
      </div>
      {data.map((student) => {
        return (
          <ul className="list-group" key={student["id"]}>
            <li className="list-group-item">
              <b>Name:</b> {student["name"]}
            </li>
            <li className="list-group-item">
              <b>Gender:</b> {student["gender"]}
            </li>
            <li className="list-group-item">
              <b>Age:</b> {student["age"]}
            </li>
            <li className="list-group-item">
              <b>Email:</b> {student["email"]}
            </li>
          </ul>
        );
      })}
    </div>
  );
}

export default View;
