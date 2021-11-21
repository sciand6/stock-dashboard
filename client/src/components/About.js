import React from "react";
import sampleinput from "../images/sampleinput.png";
import sampleoutput from "../images/sampleoutput.png";

function About() {
  return (
    <div>
      <p>
        Get charts for a list of stocks on a single page ranked by return on
        investment between the date range of your choice.
      </p>
      <h2>Sample Input</h2>
      <img alt="Sample Input" src={sampleinput} />
      <h2>Sample Output</h2>
      <img alt="Sample Output" src={sampleoutput} />
    </div>
  );
}

export default About;
