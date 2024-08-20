import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import {useNavigate, useParams} from 'react-router-dom'

export const Player = () => {

    const {id} = useParams();

    const navigate = useNavigate();

    const [apiData, setApiData] = useState({
        name: "",
        key: "",
        published_at:"",
        type:""
    });

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjA1MzVmYjM0MDhjMWU5M2U0MWUzMmFiMTkzMmUwMSIsIm5iZiI6MTcyNDEyNjQyOS43MTA3NDcsInN1YiI6IjY2YzQxMzM0NTM5MmVhZjBjODFiMGQ3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v4_0vS0VErtxTmFnLFe3khdsVUULzYff115GR_AAv34'
        }
      };
      
      useEffect(()=> {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        .then(response => response.json())
        .then(response => setApiData(response.results[0]))
        .catch(err => console.error(err));

      },[])

    return (
        <div className='player'>
            <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}  } />
            <iframe src= {`https://www.youtube.com/embed/${apiData.key}`} 
            title='trailer' frameborder="0" width="90%" height="90%" allowFullScreen></iframe>
            <div className="player-info">
                <p>{apiData.published_at.slice(0,10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    )
}
