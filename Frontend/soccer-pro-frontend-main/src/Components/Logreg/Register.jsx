import React, { useState, useEffect } from "react";

import "./login.css";
import "../../Assets/Common.css";
import Navbaronlyhome from "../Navbar/Navbar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const Register = () => {
  const [drole, setDrole] = useState("PLAYER");

  const trytoregister = () => {
    if (formdata.password != formdata.conpass) {
      //console.log("passwoed not match");
      toast.error("🚫 password not match", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    } else if (formdata.password === "") {
      toast.error("🚫 password too small", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    if (formdata.email === "") {
      toast.error("🚫 username too small", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    } else {
      var validEmail = formdata.email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (!validEmail) {
        toast.error("🚫 enter valid email id", {
          position: "top-right",
          autoClose: 2000,
        });
        return;
      }
    }
    //var parts = formdata.username.match(/.{1,15}/g);
    //var new_username = parts.join(" ");

    let user = {
      name: formdata.username,
      email: formdata.email,
      password: formdata.password,
      roles:drole
    };

    //console.log(user);
    axios.post(process.env.REACT_APP_BACKEND_URL + "/user/add", user).then(
      (response) => {
        //console.log(response.data);
        if (response.data == 1) {
          toast.success("Success ! try login", {
            position: "top-right",
            autoClose: 2000,
          });
        } else if (response.data == 400) {
          toast.error("Email already present! try login", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      },
      (error) => {}
    );

    //console.log(user);
  };

  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    conpass: "",
    username: "",
  });
  const update = (event) => {
    let val = event.target.value;
    let name = event.target.name;
    setFormdata((prev) => {
      if (name === "email") {
        return {
          email: val,
          password: prev.password,
          conpass: prev.conpass,
          username: prev.username,
        };
      } else if (name === "password") {
        return {
          email: prev.email,
          password: val,
          conpass: prev.conpass,
          username: prev.username,
        };
      } else if (name === "conpass") {
        return {
          email: prev.email,
          password: prev.password,
          conpass: val,
          username: prev.username,
        };
      } else {
        return {
          email: prev.email,
          password: prev.password,
          conpass: prev.conpass,
          username: val,
        };
      }
    });
    ////console.log(formdata)
  };

  return (
    <div class="login_css">
      <ToastContainer />
      <Navbaronlyhome />
      <div>
        <div class="container-fluid">
          <div class="row login_page_outside">
            {/*<div className="col-xl-1 col-lg-2 col-md-3 col-sm-0 left_block">
                            <Sidebar/>
    </div>*/}
            <div class="col-xl-12 col-lg-10 px-lg-5 px-0 col-sm-12 main_login_window py-5">
              <div class="login_inside p-5">
                {/*<div class="welcome_back h3 text-center">
                                    welcome back <br/><br/> <i class="fa-solid fa-face-smile-beam fa-2x"></i>
    </div>*/}
                <div class="login_to_your_acc h1 text-center">
                  Register Here
                  <h6>you are registering as a {drole}</h6>
                </div>

                <div class="p-large mt-3">
                  {/*Enter Username*/}
                  <div class="px-3 py-2 mt-3 input">
                    <div class="row">
                      <div class="col-lg-2 col-2">
                        <i
                          class="fa fa-user-circle-o fa-2x"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div class="col-lg-10 col-10">
                        <input
                          onChange={update}
                          class="w-100 p-3"
                          name="username"
                          type="text"
                          placeholder="username"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="p-large">
                  {/*Enter Email Adress*/}
                  <div class="px-3  mt-3 input">
                    <div class="row">
                      <div class="col-lg-2 col-2">
                        <i class="fa-solid fa-at fa-2x"></i>
                      </div>
                      <div class="col-lg-10 col-10">
                        <input
                          onChange={update}
                          class="w-100 p-3"
                          name="email"
                          type="email"
                          placeholder="emailId"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="p-large mt-3">
                  {/*Enter password*/}
                  <div class="px-3 py-2 mt-3 input">
                    <div class="row">
                      <div class="col-lg-2 col-2">
                        <i class="fa-solid fa-lock fa-2x"></i>
                      </div>
                      <div class="col-lg-10 col-10">
                        <input
                          onChange={update}
                          class="w-100 p-3"
                          name="password"
                          type="password"
                          placeholder="password"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="p-large mt-3">
                  {/*Enter password*/}
                  <div class="px-3 py-2 mt-3 input">
                    <div class="row">
                      <div class="col-lg-2 col-2">
                        <i class="fa-solid fa-lock-open fa-2x"></i>
                      </div>
                      <div class="col-lg-10 col-10">
                        <input
                          onChange={update}
                          class="w-100 p-3"
                          name="conpass"
                          type="password"
                          placeholder="confirm your password"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/*<div class="p-large mt-3 forgot_password make_it_pointer px-3">
                                    Forgot password<i class="fa-regular fa-circle-question px-2"></i>
</div>*/}

                <div
                  class="h2 text-center mt-3 make_it_pointer login_button p-3 cursor_pointer"
                  onClick={trytoregister}
                >
                  REGISTER {/*<i class="fa-solid fa-fingerprint"></i>*/}
                </div>

                {drole === "PLAYER" && (
                  <div class="p-small register_here text-center cursor_pointer_1" onClick={()=>setDrole("COACH")}>
                    <h6>register as a coach</h6>
                  </div>
                )}{drole === "COACH" && (
                  <div class="p-small register_here text-center cursor_pointer_1" onClick={()=>setDrole("PLAYER")}>
                    <h6>register as a player</h6>
                  </div>
                )}

                <div class="p-small register_here text-center">
                  <a
                    href="/login"
                    class="cursor_pointer"
                    style={{ color: "#3c4852" }}
                  >
                    already have an account{" "}
                    <span class="underline_it">login here</span>{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
