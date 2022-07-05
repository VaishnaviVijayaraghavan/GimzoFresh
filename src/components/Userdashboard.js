import React from "react";
import { useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import axios from "axios";

function Userdashboard() {
  let { user } = useSelector((state) => state.user);

  const getPrivateData = async () => {
    //get token from local storage
    let token = localStorage.getItem("token");

    //add token to header req obj
    let response = await axios.get("/user/privateroute", {
      headers: { authorization: token },
    });

    let data = response.data;
    console.log(data);
  };

  return (
    <>
      <div className="container text-center">
        <br />
        <div className="h4 d-flex justify-content-end">
          <Badge pill bg="dark">
            Greetings, {user.username}!
          </Badge>
          <br />
        </div>
        <button
          className="btn btn-info mt-5 d-block mx-auto"
          onClick={getPrivateData}
        >
          Get Private Data
        </button>
      </div>
    </>
  );
}

export default Userdashboard;
