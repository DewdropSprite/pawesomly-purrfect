import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function CatList() {
  let history = useHistory();
  let dispatch = useDispatch();
  let catProfile = useSelector((store) => store.catProfile);
  //   const [heading, setHeading] = useState('Functional Component');

  useEffect(() => {
    dispatch({ type: "FETCH_CAT_PROFILE" });
  }, [dispatch]);

  const handlecatprofile = (catId) => {
    history.push(`/catprofile/${catId}`);
    dispatch({ type: "FETCH_CAT_PROFILE", payload: catId });
  };

  const handleAddCat = () => {
    history.push(`/catform`);
  };

  return (
    <main>
      <h3>Tiffany's Cats </h3>

      <section>
        {catProfile.map((cat) => {
          return (
            <div key={cat.id}>
              <img
                onClick={() => handlecatprofile(cat.id)}
                src={cat.photo_url}
                alt={cat.name}
                style={{ width: "200px", height: "auto" }}
              />
            </div>
          );
        })}
      </section>
      <button onClick={handleAddCat}>Add a Cat</button>
    </main>
  );
}

export default CatList;
