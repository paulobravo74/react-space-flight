import { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';

function App() {
  const [_data, _setData] = useState([]);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState();
  
    
  const baseUrl = "https://api.spaceflightnewsapi.net/v4/articles/"
  
  useEffect(() => {
    fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      _setData(data.results)
      setPrevious(data.previous)
      console.log(data.next)
      setNext(data.next)
    })
    .catch((error) => console.error(error));
  }, []);

  
  

  return (
    <div className='home'>
      <Header />

      <div className='container_cards'>
        {_data.map((item, key) => {
          return (
          <div className='card'>
            <div>
              <img src={item.image_url} className='img'></img>
            </div>
            <div> 
              <p>{item.title}</p>
              <a href={item.url} target='_blank' rel='noreferrer' alt="">{item.news_site}</a>
            </div>
          </div>
          )
        })}
      </div>
      <div>
        <button type='button' onClick={(e) => {
          e.preventDefault();
          window.location.href={previous};
          }}>Previous</button>
        <button type="button" onClick={(e) => {
          e.preventDefault();
          window.location.href={next};
          }}>Next</button>
      </div>
    </div>
  );
}

export default App;
