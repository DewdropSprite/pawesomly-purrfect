import React from "react";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about">
      <div>
        <p id="technologies">Technologies used:</p>
        <li>React</li>
        <li>Redux</li>
        <li>Sagas</li>
        <li>Node</li>
        <li>Express</li>
        <li>MaterialUI</li>
        <li>Luxon to adjust dates</li>
        <li>Multer is a node.js middleware I used for photo uploads.</li>

        <p id="challenges">Challenges Faced:</p>
        <li>Not knowing how quickly 2 weeks would go by</li>
        <li>
          Asyncronous transactions where multiple databases were affected.
        </li>
        <li>
          Implementing Multer and getting pictures to save in the right location
          on my server.
        </li>


        <p id="next">Things to look for in the future:</p>
        <li>Add more information to the database - sex, weight, allergies, medications, food etc.</li>
        <li>The ability to edit multiple items at a time.</li>
        <li>Alert that lets the user know there's a vaccine or appointment that is overdue.</li>
        <li>Report view of all cat information for a quick lookover.</li>
        <li>
          The option of keeping a memorial profile in a virtual cemetary instead of permanently deleting the profile when a pet has passed.
        </li>

        <li>
          Cloud storage for the user to add more photos as well as documents or
          receipts that one might receive from their vet or adoption agency.
        </li>
        <li>Transfer a pet's profile to another user (adoption, rehoming)</li>
        <li>Adding features like giph's, pictures, cat facts to the home page using 3rd party API's and then having the cat profiles on a different page.</li>
        <li>Be able to favorite giph's, pictures, facts and add to a favorites page to view at any time.</li>
        <li>"social network" where users can friend eachother and see public content of eachother's cats.</li>
        <li>Blog to talk about all things cats</li>


      </div>
    </div>
  );
}

export default AboutPage;
