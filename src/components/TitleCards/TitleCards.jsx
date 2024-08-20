import React, {useEffect, useRef, useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import {Link} from 'react-router-dom' 

export const TitleCards = ( {title, category} ) => {

const [apiData,setApiData] = useState([]);

const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjA1MzVmYjM0MDhjMWU5M2U0MWUzMmFiMTkzMmUwMSIsIm5iZiI6MTcyNDEyNjQyOS43MTA3NDcsInN1YiI6IjY2YzQxMzM0NTM5MmVhZjBjODFiMGQ3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v4_0vS0VErtxTmFnLFe3khdsVUULzYff115GR_AAv34'
  }
};



const handleWheel = (event) => {
  event.preventDefault;
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response => setApiData(response.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel', handleWheel)
} ,[ ])
  return    (
        <div className='title-cards'>
          <h2>{title? title : "Popular on Netflix"}</h2>
          <div className="card-list" ref={cardsRef}>
            {apiData.map((card,index)=>{
              return <Link to={`/player/${card.id}`} className='card' key = {index}>
              <div className='card' key={index}>
                              <img src={`https://image.tmdb.org/t/p/w500` + 
                                card.backdrop_path } alt="" />
                              <p>{card.original_title}</p>
                          </div>
                          </Link >
            } )
            }
          </div>
        </div>
  )
}
