import React from "react";
import styled from 'styled-components'

function Singlecoachcard(props) {
  return (
    <>
      <Outersectionsinglecoachview>
        <div className="bg-coach p-3 ">
          <h2>coach name goes here</h2>
          <h6>how many years of exp..</h6>
          <h6>$200 per hour</h6>
          <div className="d-flex flex-row">
            <div>s1</div> <div>s2</div> <div>s3</div> <div>s4</div>
          </div>
        </div>
      </Outersectionsinglecoachview>
    </>
  );
}
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

export default Singlecoachcard;
