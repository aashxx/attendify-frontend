import React, { createContext, useState } from 'react';

export const ReviewContext = createContext();

const ReviewState = (props) => {
  
  // Connecting to the backend server
  const host = "https://attendify-7snh.onrender.com/";
  const [reviews, setReviews] = useState([]);
  const [load, setLoad] = useState(true);

  // View all reviews
  const fetchReviews = async () => {
      // API call for server side
      props.setProgress(30);
      const response = await fetch(`${host}api/reviews/fetchreviews`, {
        method: 'GET',
        headers: {
            "content-type": "application/json",
        }
    });
    setLoad(true);
    const json = await response.json();
    props.setProgress(70);
    //Client side
    setReviews(json);
    setLoad(false);
    props.setProgress(100);
  }

  // Add a review
  const addReview = async (name, review) => {
    // API call for server side
    const response = await fetch(`${host}api/reviews/addreview`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({name, review})
    });
    setLoad(true);
    const newReview = await response.json();

    // Client side
    setReviews(reviews.concat(newReview));
    setLoad(false);
  }

  return (
    <ReviewContext.Provider value={{load, reviews, fetchReviews, addReview}}>
      {props.children}
    </ReviewContext.Provider>
  )
}

export default ReviewState;
