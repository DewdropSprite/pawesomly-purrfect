import React from "react";

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h3>Technologies used:</h3>
        <li>React</li>
        <li>Redux</li>
        <li>Sagas</li>
        <li>Node</li>
        <li>Express</li>
        <li>MaterialUI</li>
        <li>Multer is a node.js middleware I used for photo uploads.</li>

        <h3>Challenges Faced:</h3>
        <li>Implementing Multer and getting pictures to save in the right location on my server.</li>
        <li>Asynchronous transactions - when adding a profile information needed to go to multiple tables.</li>

        <h3>Things to look for in the future:</h3>
        <li>
          Cloud storage for the user to add more photos as well as documents or
          receipts that one might receive from their vet or adoption agency.
        </li>



        <h3>Thanks to!</h3>
        <p>Prime for creating a program that fosters growth as a developer, but most importantly the interpersonal skills and confidence I have gained. </p>
      </div>
    </div>
  );
}

export default AboutPage;
