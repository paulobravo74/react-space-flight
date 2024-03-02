import { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';

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
      <Header />

      <div className='container_cards'>
        {_data.map((item) => {
          return (
          <div className='card'>
            <div>
              <img src={item.image_url} className='img'></img>
            </div>
            <div> 
              <p>{item.title}</p>
              <a href={item.url} target='_blank'>{item.news_site}</a>
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
