import React from 'react';
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import Navbar from '../Components/Navbar/Navbar'
import "../Assets/Common.css";

function Footer(props) {
  return (
    <Footer1 className='p-3'>
      <h1 className="text-white">Soccer Pro</h1>
      <p className="text-white">Your home to every thing football</p>
    </Footer1>
  );
}

const Footer1 = styled.div`
  background-color:black;
`;

export default Footer;