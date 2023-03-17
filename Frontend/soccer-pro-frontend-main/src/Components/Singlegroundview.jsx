import React from "react";
import styled from "styled-components";

function Singlegroundview({ground, setVisiblegroundbooking, setGroundid, setGround}) {
  return (
    <Singlegroundview1>
      <div className="bg-coach p-3 ">
        <h5>
          <u>ground name: </u>
          {ground.name}
        </h5>
        <h6>
          <u>ground size: </u>
          {ground.size}
        </h6>
        <h6>
          <u>ground capacity: </u>
          {ground.capacity}
        </h6>
        
        <div
          className="cursor_pointer"
          onClick={() => { setVisiblegroundbooking(true); setGroundid(ground.ground_id); setGround(ground) }}
        >
          <h3 className="w-100 book-now-coach text-center">
            Book the ground
          </h3>
        </div>
      </div>
    </Singlegroundview1>
  );
}

const Singlegroundview1 = styled.div`
  .bg-coach {
    background-color: #ffcd24;
    border-radius: 20px;
  }
  .book-now-coach {
    background-color: #2aabe4;
    border-radius: 20px;
  }
`;

export default Singlegroundview;
