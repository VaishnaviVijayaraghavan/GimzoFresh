import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "./footer";

function Signup() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let Navigate = useNavigate();

  let [err, setErr] = useState({ status: false, errMsg: "" });

  //form submission
  const onFormSubmit = (userobj) => {
    // console.log(userobj);
    axios
      .post("http://localhost:4000/user/createuser", userobj)
      .then((response) => {
        let message = response.data.message;
        if (message === "success") {
          //alert("user created successfully");
          //nav to dign in programatically
          Navigate("/Signin");
        } else {
          // alert(message);
          setErr({ ...err, status: true, errMsg: message });
        }
      })
      .catch((err) => alert(err.message));
  };

  // console.log(err);

  return (
    <>
      <div className="container ">
        <br />
        <p className="display-2 text-center">Signup here</p>
        <br />
        {/* this will render if username is already taken */}
        {err.status == true && (
          <p className="text-danger text-center h3">{err.errMsg}</p>
        )}
        {/* user registration form */}
        <div className="row">
          <div className="col-12 col-sm-8 col-md-6 mx-auto">
            <form onSubmit={handleSubmit(onFormSubmit)}>
              {/* username */}
              <div class="mb-3">
                <label for="username" class="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  {...register("username", { required: true, minLength: 5 })}
                />
                {errors.username?.type == "required" && (
                  <p className="text-danger">*Username is required</p>
                )}
                {errors.username?.type == "minLength" && (
                  <p className="text-danger">
                    *Minimium 5 letters should be entered
                  </p>
                )}
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
                  {...register("password", { required: true })}
                />
                {errors.password?.type == "required" && (
                  <p className="text-danger">*Password is required</p>
                )}
              </div>
              {/* email */}
              <div class="mb-3">
                <label for="email" class="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  {...register("email", { required: true })}
                />
                {errors.email?.type == "required" && (
                  <p className="text-danger">*Email is required</p>
                )}
              </div>
              {/* date of birth */}
              <div class="mb-3">
                <label for="dob" class="form-label">
                  Date of birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  {...register("dateOfBirth", { required: true })}
                />
                {errors.dateOfBirth?.type == "required" && (
                  <p className="text-danger">*Date of birth is required</p>
                )}
              </div>

              <button type="submit" class="btn btn-primary">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default Signup;
