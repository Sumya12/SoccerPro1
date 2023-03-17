import React from "react";
import styled from "styled-components";

import Navbar from "../Components/Navbar/Navbar";
import Footer from "./Footer";

function Homewithoutlogin(props) {
  return (
    <div>
      <Navbar />
      <Homewithoutloginout>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex justify-content-center align-items-center">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <h1>PLAY</h1>
                  <h1>FOOTBALL</h1>
                </div>
                <div className="d-flex flex-column">
                  <h6>
                    kickstart your career in football with our optimised training
                    batch or a personal coach.
                  </h6>
                </div>
                <div className="d-flex flex-column">
                  <a href="/login">
                    <input
                      type="submit"
                      value="login/signup"
                      className="btn btn-primary"
                    />{" "}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="footbal1.gif" />
            </div>
          </div>
        </div>
        <Extrapaddingforbottom></Extrapaddingforbottom>
      </Homewithoutloginout>
      
      <div className="footer">
        <Footer/>
      </div>
    </div>
  );
}
const Homewithoutloginout = styled.div`
  background-color:lightgray;
  img {
    width: 100%;
  }
  .footer{
    position: absolute;
    margin-bottom: 0px;
  }
  
`;
const Extrapaddingforbottom = styled.div`
  height: 100px;
`;

export default Homewithoutlogin;
