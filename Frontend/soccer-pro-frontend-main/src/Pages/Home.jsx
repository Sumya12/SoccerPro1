import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Userview from "../Components/Userview/Userview";
import Adminhome from "./Adminhome";
import Coachhome from './Coachhome'
import Homewithoutlogin from './Homewithoutlogin'

const Returnthemainview = ({ user , updateUser}) => {
  if (localStorage.getItem("isloggedin") === null) {
    return (
      <>
        <h1><Homewithoutlogin/></h1>
      </>
    );
  } else if (localStorage.getItem("isloggedin") === "yes") {
    if (localStorage.getItem("userrole") === "PLAYER") {
      return (
        <>
          <Userview user={user} updateUser={updateUser} />
        </>
      );
    }
    if (localStorage.getItem("userrole") === "ADMIN") {
      return (
        <>
          <Adminhome user={user} />
        </>
      );
    }
    if (localStorage.getItem("userrole") === "COACH") {
      return (
        <>
          <Coachhome user={user} />
        </>
      );
    }
    
  }
};

function Home(props) {
  const { cort, cortid } = useParams();
  let [user, setUser] = useState({
    pid: "52",
    
    isregisteredforclub: true,
    clubid: "1",
    
    isloggedin: "yes",
    email: "",


    userrole: "player",

    trainingbooking : null
    
  });
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const update = () => {
    if (user.isloggedin === "no") {
      setUser({
        isloggedin: "yes",
        userid: "",
        userrole: "",
      });
    } else {
      setUser({
        isloggedin: "no",
        userid: "",
        userrole: "",
      });
    }
  };

  useEffect(() => {}, [user]);
    return (
      <>
        {/*<img src="footbal1.gif" />*/}
        <Returnthemainview user={user} updateUser={updateUser} />
      </>
    );
}

export default Home;
