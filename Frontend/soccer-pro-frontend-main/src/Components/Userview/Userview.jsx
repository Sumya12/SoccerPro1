import { React, useState, useEffect } from "react";
import "../../Assets/Common.css";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "react-query";
import axios from "axios";
import Footer from "../../Pages/Footer";

import Singlegroundview from "../../Components/Singlegroundview";

// * child component to view a single traing batch and register
const Singletrainingview = ({
  handleButtonClick,
  training,
  user,
  tgroupid,
  setTgroupid,
  jointrainggroup,
}) => {
  const checkplayercountandbooktraingbatch = (tid) => {
    if (training.playerCount >= 2) {
      toast.error("sorry the training group is full", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    } else {
      booktraingbatch(tid)
    }
  }
  const booktraingbatch = (training_id) => {
    //handleButtonClick()
    setTgroupid(training_id);
  };
  return (
    <Outersectionsingletrainingview>
      <div className="bg-training p-3 ">
        <h3>
          <u>training batch name: </u>
          {training.name}
        </h3>
        <h5>
          <u>start date: </u>
          {training.startDate}
        </h5>{" "}
        <h5>
          {" "}
          <u>end date: </u>
          {training.endDate}
        </h5>
        <h6>
          {" "}
          <u>batch date: </u> {training.time}
        </h6>
        <h6>
          <u>coach name :</u> {training.coach.user.name}
        </h6>
        <div
          onClick={() => checkplayercountandbooktraingbatch(training.training_id)}
          className="cursor_pointer"
        >
          <h3 className="w-100 book-now-coach text-center">Book now</h3>
        </div>
      </div>
    </Outersectionsingletrainingview>
  );
};
// child component to view a single coach and book a coach
const Singlecoachview = ({ coach, user, setCoachbooked }) => {
  const handlecoachbooking = (coach_id) => {
    //////console.log("----", coach_id)
    if (localStorage.getItem("coachbooking") !== null) {
      toast.warning("you have already booked a personal coach", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      axios
        .post(
          process.env.REACT_APP_BACKEND_URL +
            "/player/bookPersonalCoach/" +
            coach_id +
            "/" +
            localStorage.getItem("pid")
        )
        .then(
          (response) => {
            ////console.log("----", response);
            if (response.data == 1) {
              toast.success("your request has been sent to admin", {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          },
          (error) => {}
        );
    }
  };

  return (
    <Outersectionsinglecoachview>
      <div className="bg-coach p-3 ">
        <h5>
          <u>coach name: </u>
          {coach.user.name}
        </h5>
        <h6>
          <u>coach contacts: </u>
          {coach.user.email}
        </h6>
        <div
          onClick={() => handlecoachbooking(coach.coach_id)}
          className="cursor_pointer"
        >
          <h3 className="w-100 book-now-coach text-center">
            Request for the coach
          </h3>
        </div>
      </div>
    </Outersectionsinglecoachview>
  );
};

const Showbookingdateandtime = ({ booking }) => {
  if (booking.bookingdate === "none" && booking.bookingtime === "none") {
    return <></>;
  } else if (booking.bookingdate != "none" && booking.bookingtime != "none") {
    return (
      <>
        <h6>
          The current booking date is{" "}
          <span style={{ color: "#34bbcc" }}>{booking.bookingdate}</span> and
          time is
          <span style={{ color: "#34bbcc" }} className="px-2">
            {booking.bookingtime}
          </span>{" "}
        </h6>
      </>
    );
  }
};

const getallgroundsfunc = async () => {
  if (localStorage.getItem("clubid") === null) {
    return [];
  }
  const response = await axios.get(
    `${
      process.env.REACT_APP_BACKEND_URL
    }/admin/getAllGround/${localStorage.getItem("clubid")}`
  );
  return response.data;
};
const getallcoachesfunc = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/coach/all`
  );
  return response.data;
};
const getalltrainingsfunc = async (user) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/club/getAllTrainingGroup/${user.clubid}`
  );
  return response.data;
};

// parent component
function Userview({ user, updateUser }) {
  const [visiblegroundbooking, setVisiblegroundbooking] = useState(false); // groundbooking overlay show or not
  const [personalcoachbooking, setPersonalcoachbooking] = useState(false); // personal coach booking overlay show or not
  const [tgroupid, setTgroupid] = useState(-1); //
  const [paymetpage, setPaymetpage] = useState(false); //
  const [groundid, setGroundid] = useState(-1);
  const [ground ,setGround] = useState({});



  const [bookedslot, setBookedslot] = useState([]);

  const [clubid, setClubid] = useState(-1);
  const [selectedDivIndex, setSelectedDivIndex] = useState(-1);
  const [booking, setBooking] = useState({
    bookingdate: "none",
    bookingtime: "none",
  });
  const [timeslot1, setTimeslot1] = useState([
    "08:00-10:00",
    "10:00-12:00",
    "12:00-14:00",
    "14:00-16:00",
    "16:00-18:00",
    "18:00-20:00",
    "20:00-22:00",
  ]);
  const [timeslot, setTimeslot] = useState([
    "08:00-10:00",
    "10:00-12:00",
    "12:00-14:00",
    "14:00-16:00",
    "16:00-18:00",
    "18:00-20:00",
    "20:00-22:00",
  ]);

  //join the club player
  const joinclub = () => {
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL +
          `/player/joinclub/${clubid}?pid=+${parseInt(
            localStorage.getItem("pid")
          )}`
      )
      .then(
        (response) => {
          if (response.data == 1) {
            localStorage.setItem("isregisteredforclub", true);
            localStorage.setItem("clubid", clubid);
            toast.success("succesfully joined the club", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setPaymetpage(false);
          }
        },
        (error) => {
          ////console.log("some error");
        }
      );
  };

  // book a training group
  const jointrainggroup = () => {
    //////console.log(tgroupid);
    if (localStorage.getItem("trainingbooking") !== null) {
      toast.warning("you are already in a traing group\n contact your admin", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      axios
        .post(
          process.env.REACT_APP_BACKEND_URL +
            "/player/joingroup/" +
            tgroupid +
            "/" +
            localStorage.getItem("pid")
        )
        .then(
          (response) => {
            ////console.log(response.data);
            if (response.data !== 0) {
              toast.success("succesfully joined the trainng group", {
                position: toast.POSITION.TOP_RIGHT,
              });
              f1();
              //window.location.reload();
            } else {
            }
          },
          (error) => {
            ////console.log("some error");
          }
        );
    }
  };
  useEffect(() => {
    jointrainggroup();
  }, [tgroupid]);

  const bookground = () => {
    ////console.log("herere");
    const bookgrounobj = {
      date: booking.bookingdate,
      time: booking.bookingtime,
    };
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL +
          "/player/bookGround/" +
          localStorage.getItem("pid") +
          "/" +
          groundid,
        bookgrounobj
      )
      .then(
        (response) => {
          ////console.log(response);
          if (response.data == 1) {
            toast.success("succesfully booked the ground", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setBooking({
              bookingdate: "none",
              bookingtime: "none",
            });
            setSelectedDivIndex(-1);
            setVisiblegroundbooking(false);
          }
        },
        (error) => {
          toast.success("choose valid date and time", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      );
  };


  //______________________________________________

  //check if already in a traing group
  const f1 = () => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/player/hasTrainingGroup/" +
          localStorage.getItem("pid")
      )
      .then(
        (response) => {
          ////console.log("traing", "--", response.data);
          if (response.data != 0) {
            localStorage.setItem("trainingbooking", response.data);
          }
        },
        (error) => {
          ////console.log(error);
        }
      );
  };
  useEffect(() => {
    f1();
  }, []);
  //______________________________________________

  // check for personal coach
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/player/hasCoach/" +
          localStorage.getItem("pid")
      )
      .then(
        (response) => {
          if (response.data != 0) {
            localStorage.setItem("coachbooking", response.data);
          }
        },
        (error) => {
          ////console.log(error);
        }
      );
  }, []);
  //___________________________________________-

  const {
    data: allgrounds,
    isLoading: allgroundsloading,
    refetch: refetchallplayers,
  } = useQuery("get_all_grounds", () => getallgroundsfunc(), {
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

  const {
    data: alltrainings,
    isLoading: alltrainingsloading,
    refetch: refetchalltrainings,
  } = useQuery("get_all_training", () => getalltrainingsfunc(user), {
    refetchOnMount: false,
    refetchInterval: 5000,
  });

  ////console.log(alltrainings);

  // common for coach booking and traing season booking...
  function handleButtonClick() {
    window.scrollTo(0, 0);
    setVisiblegroundbooking(!visiblegroundbooking);
  }

  useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL +
          "/admin/getBookedSlots/" +
          groundid +
          "?date=" +
          booking.bookingdate
      )
      .then(
        (response) => {
          //console.log(response);
          setBookedslot(response.data);

          setTimeslot(timeslot1);
          const newtimeslot = [];
          timeslot1.map((t) => {
            let flag = false;
            response.data.map((d) => {
              if (d.time === t) {
                flag = true;
              }
            });
            if (!flag) {
              newtimeslot.push(t);
            }
          });
          setTimeslot(newtimeslot);
        },
        (error) => {}
      );
  }, [booking.bookingdate]);

  function handlebookingdate(event) {
    //console.log(groundid);
    setBooking({ ...booking, bookingdate: event.target.value });
    //console.log("hereree");
  }

  const handlebookingtime = (val, index) => {
    setBooking({ ...booking, bookingtime: val });
    setSelectedDivIndex(index);
  };

  // onclick on `book coach` show a tost and raise a request for admin
  const handlecoachbooking = () => {
    setPersonalcoachbooking(true);
    /*//consoletoast.success("your request has been sent to a admin", {
      position: "top-right",
      autoClose: 2000,
    });*/
  };

  const cancealcoachbooking = () => {
    setPersonalcoachbooking(false);
  };

  if (allgroundsloading || alltrainingsloading || allcoachesloading) {
    return "loading";
  }

  const istherein = (sts, arr) => {
    //console.log("____" + arr);
    //console.log("hereereree33333");
    arr.map((a) => {
      if (a.time == sts) {
        return true;
      }
    });
    return false;
  };

  //////console.log(allcoaches);
  return (
    <>
      <ToastContainer />
      <Outersectionuserview>
        <Navbar user={user} />

        {!localStorage.getItem("isregisteredforclub") && (
          <Registerforaclub className="container my-5">
            <h1>Register for a club first to get all the Benefits</h1>
            <input
              type="text"
              placeholder="enter the club name to register for it"
              className="px-3"
              onChange={(event) => {
                setClubid(event.target.value);
                ////console.log(clubid);
              }}
            />
            <input
              type="submit"
              value="register"
              className="btn btn-primary mx-5"
              onClick={() => setPaymetpage(true)}
            />
            <p style={{ color: "red" }} className="p-small">
              *please do not share this code with others. for more price realted
              details contact the clubs
            </p>
          </Registerforaclub>
        )}
        {paymetpage && (
          <div className="container bg-success text-white p-5">
            <h1>the price for joining this club is $200</h1>
            <input
              type="submit"
              value="pay and register"
              className="btn-info"
              onClick={joinclub}
            />
          </div>
        )}
        {visiblegroundbooking && (
          <div className="overlay">
            <div className="bookoutside p-3">
              <div className="row">
                <div className="col-lg-6">
                  <h5>Ground details</h5>
                  <Outersectionsingletrainingview className="mb-5">
                    <div className="bg-training p-3 ">
                      <h2> <u>ground name: </u> {ground.name}</h2>
                      <h6><u>ground size: </u> {ground.size}</h6>
                      <h6><u>ground capacity: </u>{ground.capacity}</h6>
                    </div>
                  </Outersectionsingletrainingview>
                </div>
                <div className="col-lg-6">
                  <h2>choose a date and time..</h2>
                  <input type="date" onChange={handlebookingdate} />
                  <div className="row my-3">
                    {timeslot.map((single_time_slot, index) => {
                      return (
                        <div className="col-lg-6">
                          <div
                            className="singletimeslot h6 cursor_pointer px-3"
                            onClick={() =>
                              handlebookingtime(single_time_slot, index)
                            }
                            style={{
                              backgroundColor:
                                selectedDivIndex === index ? "red" : "#38bacf",
                            }}
                          >
                            {single_time_slot}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Showbookingdateandtime booking={booking} />
                  <div className="row">
                    <div className="col-lg-6">
                      <div
                        className="h5 text-white book_now text-center p-2 cursor_pointer"
                        onClick={() => bookground()}
                      >
                        Book now
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div
                        className="h5 canceal_now text-center p-2 cursor_pointer"
                        onClick={() => {
                          setBooking({
                            bookingdate: "none",
                            bookingtime: "none",
                          });
                          setSelectedDivIndex(-1);
                          setVisiblegroundbooking(false);
                        }}
                      >
                        cancel now
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {personalcoachbooking && (
          <div className="overlay">
            <div className="bookoutside p-3">
              <div className="row">
                <div className="col-lg-6">
                  <h5>Ground details</h5>
                  <Outersectionsingletrainingview className="mb-5">
                    <div className="bg-training p-3 ">
                      <h2>ground name goes here</h2>
                      <h6>ground dimensions goes here</h6>
                    </div>
                  </Outersectionsingletrainingview>

                  <h5>Coach details</h5>
                  <Outersectionsinglecoachview>
                    <div className="bg-coach p-3 ">
                      <h2>coach name goes here</h2>
                      <h6>how many years of exp..</h6>
                      <div className="d-flex flex-row">
                        <div>s1</div> <div>s2</div> <div>s3</div> <div>s4</div>
                      </div>
                    </div>
                  </Outersectionsinglecoachview>
                </div>
                <div className="col-lg-6">
                  <h2 className="">choose a date and time....</h2>

                  <div className="d-flex flex-row justify-content-between">
                    <div>
                      <h5>start date</h5>
                      <input type="date" onChange={handlebookingdate} />
                    </div>
                    <div>
                      <h5>end date</h5>
                      <input type="date" onChange={handlebookingdate} />
                    </div>
                  </div>

                  <div className="row my-3">
                    {timeslot.map((single_time_slot, index) => (
                      <div className="col-lg-6">
                        <div
                          className="singletimeslot h6 cursor_pointer px-3"
                          onClick={() =>
                            handlebookingtime(single_time_slot, index)
                          }
                          style={{
                            backgroundColor:
                              selectedDivIndex === index ? "red" : "#38bacf",
                          }}
                        >
                          {single_time_slot}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Showbookingdateandtime booking={booking} />
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="h5 text-white book_now text-center p-2 cursor_pointer">
                        Book now
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div
                        className="h5 canceal_now text-center p-2 cursor_pointer"
                        onClick={() => {
                          setBooking({
                            bookingdate: "none",
                            bookingtime: "none",
                          });
                          setSelectedDivIndex(-1);
                          cancealcoachbooking();
                        }}
                      >
                        cancel now
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!personalcoachbooking &&
          !visiblegroundbooking &&
          localStorage.getItem("isregisteredforclub") && (
            <div className="container">
              <h1 className="mt-5">book a ground for personal training</h1>
              <div className="row">
                {allgrounds.map((ground, index) => (
                  <div className="col-lg-4 my-2" key={index}>
                    <Singlegroundview
                      ground={ground}
                      setVisiblegroundbooking={setVisiblegroundbooking}
                      setGroundid={setGroundid}
                      setGround = {setGround}
                    />
                  </div>
                ))}
              </div>
              <h1 className="mt-5">book a coach for personal training</h1>
              <div className="row">
                {allcoaches.map((coach, index) => (
                  <div className="col-lg-4 my-2" key={index}>
                    <Singlecoachview coach={coach} user={user} />
                  </div>
                ))}
              </div>
              <h1 className="mt-5">Book a training batch to upskill</h1>
              <div className="row">
                {alltrainings.map((training) => (
                  <div className="col-lg-4 my-2 singletrain">
                    <Singletrainingview
                      handleButtonClick={handleButtonClick}
                      training={training}
                      user={user}
                      tgroupid={tgroupid}
                      setTgroupid={setTgroupid}
                      jointrainggroup={jointrainggroup}
                    />
                  </div>
                ))}
              </div>
              *
            </div>
          )}

        <Extrapaddingforbottom></Extrapaddingforbottom>
        <div classname="footer">
          <Footer />
        </div>
      </Outersectionuserview>
    </>
  );
}
const Outersectionuserview = styled.div`
  background-color:lightgray;
  .overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: grey;
    z-index: 1;
  }
  .canceal_now {
    border: 1px solid #38bacf;
    color: #38bacf;
    background-color: white;
  }
  .bookoutside {
    width: 50%;
    height: 50%;
    background-color: white;
  }
  input[type="date"] {
    border: 2px solid #dddcdd;
    border-radius: 5px;
  }
  .singletimeslot {
    background-color: #38bacf;
    border-radius: 5px;
    color: white;
  }
  .book_now {
    background-color: #38bacf;
    border-radius: 5px;
    color: white;
  }
`;
const Outersectionsinglecoachview = styled.div`
  .bg-coach {
    background-color: #ffcd24;
    border-radius: 20px;
  }
  .book-now-coach {
    background-color: #2aabe4;
    border-radius: 20px;
  }
`;
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
const Registerforaclub = styled.div`
  input[type="text"] {
    border: 2px solid #2aabe4;
    height: 40px;
    border-radius: 20px;
    width: 80%;
  }
`;
const Extrapaddingforbottom = styled.div`
  height: 100px;
`;

export default Userview;
