import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";

function UpdateSecond() {
  const parameters = useLocation();
  const [name, setName] = useState(parameters.state.name);
  const [age, setAge] = useState(parameters.state.age);
  const [username, setUsername] = useState(parameters.state.username);

  const updateFields = async (name, age, username, id) => {
    try {
      const res = await Axios.put("http://localhost:3001/updateUser", {
        name,
        age,
        username,
        id,
      });
      if (res.data !== null) {
        alert("User Modified!");
      } else {
        alert("Something wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="updateSecond">
      <div className="homepage mt-3">
        <Link to="/">
          <button type="button" className="btn btn-primary btn-lg  ">
            Back to homepage
          </button>
        </Link>
      </div>

      <div className="update mt-3">
        <Link to="/update">
          <button type="button" className="btn btn-secondary btn-lg ">
            Back to previous page
          </button>
        </Link>
      </div>

      <div className="updateUser mt-3">
        <div>
          <input
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            type="number"
            value={age}
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />
          <input
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <button
            onClick={() =>
              updateFields(name, age, username, parameters.state._id)
            }
          >
            Update fields
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateSecond;
