import { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import Card from './Components/Card';

function App() {

  
  const [currentUrl, setCurrentUrl] = useState("https://api.spaceflightnewsapi.net/v4/articles/")
  const [_data, _setData] = useState([]);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState();
  const [pageNum, setPageNum] = useState(1)
  const [input, setInput] = useState("")
  
    
  
  useEffect(() => {
    fetch(currentUrl)
    .then((response) => response.json())
    .then((data) => {
      _setData(data.results)
      setPrevious(data.previous)
      setNext(data.next)
    })
    .catch((error) => console.error(error));
  }, [currentUrl]);

  
  const handlePreviousClick = () => {
    setCurrentUrl(previous)
    pageNum - 1 === 0? setPageNum(1) : setPageNum(pageNum - 1);
  }

  const handleNextClick = () => {
    setCurrentUrl(next)
    setPageNum(pageNum + 1)
  }

  const getInput = (e) => {
    setInput(e.target.value)
  }

  const handleSearchSubmit = () => {

    console.log("Search");
    console.log(`${input}`);

    for (let pageBase = 0; pageBase <= 90; pageBase += 10) {
      if(pageBase === 0) {
        setCurrentUrl(currentUrl)
      } else {
        setCurrentUrl(`https://api.spaceflightnewsapi.net/v4/articles/?limit=10&offset=${pageBase}`)
      }
      console.log("PageBase: " + pageBase);
      _data.find((e) => {e.news_site === input ? console.log(e) : console.log("Not Found")})
    }
    
    
  }
  
  

  return (
    <div className='home'>
      <Header />

      <div id='container'>
        <div className='search'>
          <input type="text" defaultValue={input} onChange={getInput}></input>
          <button onClick={handleSearchSubmit}>Submit</button>
        </div>

        <div className='container_cards'>
          {_data.map((item) => {
            
            return (

              <Card
                key={item.id}
                image={item.image_url}
                title={item.title}
                url={item.url}
                summary={item.summary}
                site={item.news_site}
                date={item.published_at}
              />

              /*
            <div className='card'>
              <div>
                <img src={item.image_url} className='img'></img>
              </div>
              <div> 
                <p>{item.title}</p>
                <a href={item.url} target='_blank' rel='noreferrer' alt="" title={item.summary}>{item.news_site}</a>
                <p>Published: {(item.published_at).slice(0,10)}</p>
              </div>
            </div>
            */
            )
          })}
        </div>
      
        <div>
          <button type="button" onClick={handlePreviousClick}>Previous</button>
          <button type="button" onClick={handleNextClick}>Next</button>
        </div>
        
        <p>Page {pageNum}</p>
      </div>
   
    </div>
  );
}

export default App;
