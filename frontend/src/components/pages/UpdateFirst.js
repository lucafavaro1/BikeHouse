import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function UpdateFirst() {
  const [listOfUsers, setListOfUsers] = useState([]);

  // when start client, open this one that is the homepage
  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers/").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  return (
    <div className="UpdateFirst">
      <div className="gobackhome mt-3">
        <Link to="/">
          <button type="button" className="btn btn-primary btn-lg  ">
            Back to Homepage
          </button>
        </Link>
      </div>

      <div className="usersDisplay">
        {listOfUsers.map((user) => {
          return (
            <div>
              <h1>Name: {user.name} </h1>
              <h1>Age: {user.age} </h1>
              <h1>Username: {user.username} </h1>
              <div className="text-center">
                <Link to="/updatesecond" state={user}>
                  <button className="bg-red-400 text-black px-3 py-1">
                    Update User
                  </button>
                </Link>
              </div>
              <h1>---------------------------</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UpdateFirst;
