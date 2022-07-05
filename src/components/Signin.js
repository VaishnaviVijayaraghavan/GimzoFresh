import React from "react";
import { useEffect } from "react";
import login from "../images/login.svg";
import "../css/style.css";
import { useForm } from "react-hook-form";
import Footer from "./footer";
import { useSelector, useDispatch } from "react-redux";
import { promiseLifeCycle } from "../slices/userLoginSlice";
import { useNavigate } from "react-router-dom";

function Signin() {
  let {
    register,
    handleSubmit,
    formState: { error },
  } = useForm();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { isSuccess, isError, errMsg, isPending } = useSelector(
    (state) => state.user
  );

  //form submission
  const onFormSubmit = (userCredObj) => {
    // console.log(usercredobj);
    dispatch(promiseLifeCycle(userCredObj));
  };

  useEffect(() => {
    if (isSuccess == true) {
      //Navigate to Userdashboard
      navigate("/Userdashboard");
    }
  }, [isSuccess, isError]);

  return (
    <>
      <div className="container">
        <br />
        <br />
        <p className="display-3 text-center">
          Log-In to experience the amazing features
        </p>
        <br />
        <br />
        <div className="container d-md-flex justify-content-md-evenly">
          <img src={login} width="350px" />
          <br />
          {/* user registration form */}
          <div className="row ">
            <div className="col-12 mx-auto">
              {isError && <h2 className="text-danger text-center">{errMsg}</h2>}
              <form onSubmit={handleSubmit(onFormSubmit)}>
                {/* username */}
                <br />
                <div class="mb-3">
                  <label for="username" class="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    {...register("username")}
                  />
                </div>
                {/* password */}
                <div class="mb-3">
                  <label for="password" class="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...register("password")}
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Log-In
                </button>
              </form>
              <br />
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default Signin;
