import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';




function CatProfile() {
    let history = useHistory();
    let dispatch = useDispatch();
    let catProfile = useSelector(store => store.catProfile)
//   const [heading, setHeading] = useState('Functional Component');

useEffect(() => {
    dispatch({type: 'FETCH_CAT_PROFILE' })
}, [dispatch])

const handleClick = (catId) => {
    history.push(`/catmedical/${catId}`);
    dispatch({ type: 'FETCH_MEDICAL', payload: catId})
  }

// console.log("catId catprofile", catId)

  return (
    <main>
        <h3>Select a Profile! </h3>

        
    <section>
        {catProfile.map(cat => {
            return(
                <div key={cat.id}>
                    
                    
{/* render cat picture - currently not working   */}
                    <img onClick={() => handleClick(cat.id)}
                    src={cat.pet_photo}
                    alt={cat.name}
                    />
                </div>
            )
        })}
    </section>
    </main>
  );
}

export default CatProfile;
