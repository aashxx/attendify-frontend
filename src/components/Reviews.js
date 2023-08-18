import React, { useContext, useEffect, useState } from 'react';
import '../index.css';
import { motion } from 'framer-motion';
import Loader from './Loader';
import { ReviewContext } from '../contexts/ReviewContext'; // Review Context API
import { AlertContext } from '../contexts/AlertContext'; // Alerts Context API

const Reviews = () => {
    // Review Context API
    const context = useContext(ReviewContext);
    const {load, reviews, fetchReviews, addReview} = context;

    // Alerts Context API
    const alertContext = useContext(AlertContext);
    const {showAlert} = alertContext;

    // Submit button animation
    const btnAnime = () => {  
        const btn_anime = document.querySelector('#button-anime');
        btn_anime.innerHTML = '<div id="btn-loader"></div>';
        setTimeout(() => {
            btn_anime.style.width='60px';
            btn_anime.innerHTML = '<i class="fa-solid fa-check"></i>';
        }, 500);
        setTimeout(() => {
            btn_anime.style.width='120px';
            btn_anime.innerHTML = 'Submit';
        }, 3500);
    }

    // Adding a new review
    const [postReview, setPostReview] = useState({name: "", review: ""});

    const handleReviewChange = (event) => {
        setPostReview({...postReview, [event.target.name]: event.target.value});
    }

    // Submitting the review
    const handleAddReview = (event) => {
        event.preventDefault();
        addReview(postReview.name, postReview.review);
        btnAnime();
        setPostReview({name: "", review: ""});
        showAlert('Posted Review', '#f8cf38')
    }

    // Fetching the reviews
    useEffect(() => {
        fetchReviews();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='reviews'>
            <h1>Reviews</h1>
            <motion.div className='reviews-body' initial={{opacity: 0, scale: 0}} whileInView={{opacity: 1, scale: 1}} transition={{duration: 0.3}} viewport={{once: true}}>
                {
                    load ? <Loader /> :
                    reviews.map((review) => {
                        return (
                            <div className='review-item' key={review._id}>
                                <p className='review'>{review.review}</p>
                                <div className="reviewData">
                                    <p className='name'>By:{review.name}</p>
                                    <p className='date'>{new Date(review.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </motion.div>
            <motion.div className="add-reviews" initial={{opacity: 0, scale: 0}} whileInView={{opacity: 1, scale: 1}} transition={{duration: 0.3}} viewport={{once: true}}>
                <h1>Post a review</h1>
                <form onSubmit={handleAddReview} method='post'>
                    <input type="text" name='name' value={postReview.name} placeholder='Enter name' onChange={handleReviewChange} required/>
                    <textarea name="review" value={postReview.review} placeholder='Enter feedback' onChange={handleReviewChange} required></textarea>
                    <button type='submit' id='button-anime'>Submit</button>
                </form>
            </motion.div>
        </div>
    )
}

export default Reviews;
