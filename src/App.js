import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [_data, _setData] = useState([]);
  
    
  const baseUrl = "https://api.spaceflightnewsapi.net/v4/articles/"
  const [id, setId] = useState(22761)
  
  useEffect(() => {
    fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      _setData(data.results)
    })
    .catch((error) => console.error(error));
  }, []);

  
  

  return (
    <div className='home'>
      <h1>Spaceflight News</h1>
      
      <div className='container_cards bg_red'>
        {_data.map((item) => {
          return (
          <div className='card bg_green'>
            <div>
              <img src={item.image_url} className='img'></img>
            </div>
            <div> 
              <p>{item.title}</p>
              <p>News: {item.news_site}</p>
            </div>
          </div>
          )
        })}
      </div>
      <div>
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}

export default App;
