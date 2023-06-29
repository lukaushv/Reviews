import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';
import './App.css';
import axios from 'axios';


function App() {
  const [films, setFilms] = useState();
  const [film, setFilm] = useState();
  const [reviews, setReviews] = useState([]);

  const getFilms = async () =>{

    try{
      const response = await axios.get("http://localhost:8080/api/films")
      setFilms(response.data);

    }catch(err){
      console.log(err);
    }
  }

  const getFilmData = async (imdbId) => {
    const currpoint = 'http://localhost:8080/api/films';
    try 
    {
        const response = await axios.get(currpoint+`/${imdbId}`);
        const singlefilm = response.data;
        setFilm(singlefilm);
        const lastFiveReviews = singlefilm.reviewIds.slice(-10);
        const updatedReviews = [...reviews, ...lastFiveReviews];
        setReviews(updatedReviews);
    } 
    catch (error) 
    {
      console.error(error);
    }

  }


  useEffect(()=>{
    getFilms();
  },[])

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route path="/" element={<Home films={films} />} ></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
            <Route path="/Reviews/:filmId" element ={<Reviews getFilmData = {getFilmData} film = {film} reviews = {reviews} setReviews = {setReviews} />}></Route>
            <Route path="*" element = {<NotFound/>}></Route>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
