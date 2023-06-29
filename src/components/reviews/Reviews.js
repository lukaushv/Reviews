import {useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import React from 'react';
import axios from 'axios';

const Reviews = ({getFilmData,film,reviews,setReviews}) => {
    
    const revText = useRef();
    let params = useParams();
    const filmId = params.filmId;
    useEffect(()=>{
        getFilmData(filmId);
    },[])

    const addReview = async (e) =>{
        e.preventDefault();
        const rev = revText.current;
        try
        {
            const response = await axios.post('http://localhost:8080/api/reviews', {reviewBody:rev.value,imdbId:filmId});
            const newReview = response.data;

            const updatedReviews = [...reviews, newReview];
          
            rev.value = "";
          
            await setReviews(updatedReviews);
            
        }
        catch(err)
        {
            console.error(err);
        }
        
    } 
  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img key={film?.imdbId} src={film?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {   
                    reviews
                    ?.sort((a, b) => new Date(b.created) - new Date(a.created))
                    .map((review, index) => {
                        return(
                            <React.Fragment key={index}>
                                <Row>
                                    <Col>{review.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </React.Fragment>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
  )
}

export default Reviews