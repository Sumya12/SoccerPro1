import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import Navbar from '../Components/Navbar/Navbar'

const getalltrainingsfunc = async () => {
  const response = await axios.get(
    `${
      process.env.REACT_APP_BACKEND_URL
    }/club/getAllTrainingGroup/${localStorage.getItem("clubid")}`
  );
  return response.data;
};

const getallcoachesfunc = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/coach/all`
  );
  return response.data;
};

function Userupcomingevents(props) {
  const {
    data: alltrainings,
    isLoading: alltrainingsloading,
    refetch: refetchalltrainings,
  } = useQuery("get_all_training", () => getalltrainingsfunc(), {
    refetchOnMount: false,
    refetchInterval: 5000,
  });

  const {
    data: allcoaches,
    isLoading: allcoachesloading,
    refetch: refetchallcoaches,
  } = useQuery("get_all_coaches", () => getallcoachesfunc(), {
    refetchOnMount: false,
    refetchInterval: 5000,
  });

  //console.log(alltrainings);

  if (alltrainingsloading || allcoachesloading) return "hello";
  return (
    <>
      <Navbar user={alltrainings} />
      <div className="container">
        <h1>upcoming traing group</h1>
        {!localStorage.getItem("trainingbooking") && (
          <h1>You did't join any training group</h1>
        )}
        {alltrainings.map((t) => {
          if (t.training_id == localStorage.getItem("trainingbooking")) {
            return (
              <>
                <Outersectionsingletrainingview>
                  <div className="bg-training p-3 ">
                    <h3>
                      <u>training batch name: </u>
                      {t.name}
                    </h3>
                    <h5>
                      <u>start date: </u>
                      {t.startDate}
                    </h5>{" "}
                    <h5>
                      {" "}
                      <u>end date: </u>
                      {t.endDate}
                    </h5>
                    <h6>
                      {" "}
                      <u>batch date: </u> {t.time}
                    </h6>
                    <h6>
                      <u>coach name :</u> {t.coach.user.name}
                    </h6>
                  </div>
                </Outersectionsingletrainingview>
              </>
            );
          }
        })}

        <hr />
        <h1>Your coach booking</h1>
        {!localStorage.getItem("coachbooking") && (
          <h6>You did't book any personal coach</h6>
        )}
        {allcoaches.map((c) => {
          if (c.coach_id == localStorage.getItem("coachbooking")) {
            return (
              <>
                <Outersectionsingletrainingview>
                  <div className="bg-training p-3 ">
                    <h3>
                      <u>coach name: </u>
                      {c.user.name}
                    </h3>
                    <h5>
                      <u>contacts: </u>
                      {c.user.email}
                    </h5>{" "}
                  </div>
                </Outersectionsingletrainingview>
              </>
            );
          }
        })}
      </div>
    </>
  );
}

const Outersectionsingletrainingview = styled.div`
  .bg-training {
    background-color: #ffcd24;
    border-radius: 20px;
  }
  .book-now-coach {
    background-color: #2aabe4;
    border-radius: 20px;
  }
`;

export default Userupcomingevents;
