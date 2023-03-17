import { Upcoming } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";

import Navbar from "../Components/Navbar/Navbar";
import axios from "axios";

import Footer from './Footer'


const coachsessionsfunc = async(user) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/coach/getAlTrainingGroup/${localStorage.getItem("pid")}`
  );
  return response.data;
}

const coachsessionspfunc = async() => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/coach/getAllPersonalTrainee/${localStorage.getItem("pid")}`
  );
  return response.data;
}

// parent component
function Coachhome({ user }) {
  const [upcomingevents, setUpcomingevents] = useState([
    "evt1",
    "evt2",
    "evt3",
    "evt4",
  ]);

  const {
    data: coachsessions,
    isLoading: coachsessionsloading,
    refetch: refetchcoachsessions,
  } = useQuery("get_all_coache_season", () => coachsessionsfunc(user), {
    refetchOnMount: false,
    refetchInterval: 5000,
  });


  const {
    data: coachsessionsp,
    isLoading: coachsessionsploading,
    refetch: refetchcoachsessionsp,
  } = useQuery("get_all_coache_seasonp", () => coachsessionspfunc(user), {
    refetchOnMount: false,
    refetchInterval: 5000,
  });


  //console.log(coachsessions)


  if(coachsessionsloading || coachsessionsploading) return "loading"
  return (
    <Coachviewoutside>
      <Navbar user={user} />
      <div className="container my-5">
        <h1>Your upcoming events</h1>
        <Upcomingevents className="container">
          <table style={{ width: "100%" }} className="p-2">
            <tr className="heading_row h2">
              <th>event name </th>
              <th>start date</th>
              <th>end date</th>
              <th>event time</th>
            </tr>
            {coachsessions.map((singleevent) => (
              <tr className="not_heading_row my-1 h6">
                <td>{singleevent.name}</td>
                <td>{singleevent.startDate}</td>
                <td>{singleevent.endDate}</td>
                <td>{singleevent.time}</td>
              </tr>
            ))}
          </table>

          <h1 className="my-3">Your upcoming personal Student.</h1>
          <table style={{ width: "100%" }} className="p-2">
            <tr className="heading_row h2">
              <th>player name </th>
              <th>player contacts</th>
            </tr>
            {coachsessionsp.map((singleevent) => (
              <tr className="not_heading_row my-1 h6">
                <td>{singleevent.player.user.name}</td>
                <td>{singleevent.player.user.email}</td>
              </tr>
            ))}


          </table>
        </Upcomingevents>
      </div>
      <Extrapaddingforbottom></Extrapaddingforbottom>
      <Footer />
    </Coachviewoutside>
  );
}
const Upcomingevents = styled.div`
  .heading_row {
    background-color: #ffcd24;
    color: white;
  }
  .not_heading_row {
    background-color: #2aabe4;
    color: white;
  }
`;
const Coachviewoutside = styled.div``;
const Extrapaddingforbottom = styled.div`
  height: 350px;
`;

export default Coachhome;
