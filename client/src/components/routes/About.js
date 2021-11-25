import React from "react";
import sampleinput from "../../images/sampleinput.png";
import sampleoutput from "../../images/sampleoutput.png";

function About() {
  return (
    <div>
      <p>
        Get charts and crucial data for a list of stocks on a single page
        between the date range of your choice. Sort by return on investment,
        high, low...etc.
      </p>
      <h2>Sample Input</h2>
      <img alt="Sample Input" src={sampleinput} />
      <h2>Sample Output</h2>
      <img alt="Sample Output" src={sampleoutput} />
    </div>
  );
}

export default About;
