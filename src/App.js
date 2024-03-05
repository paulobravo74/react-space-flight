import { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import Card from './Components/Card';
import Main from './Components/Main';

function App() {

  const url = "https://api.spaceflightnewsapi.net/v4/articles/"
  
  const [currentUrl, setCurrentUrl] = useState(url)
  const [_data, _setData] = useState([]);
  
  const [input, setInput] = useState(null)
  const [searchInfo, setSearchInfo] = useState("")
    
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState();
  const [pageNum, setPageNum] = useState(1)
  
    
  // ---------- Fetch ----------
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

  
  // ---------- Buttons ----------
  const handlePreviousClick = () => {
    setCurrentUrl(previous)
    pageNum - 1 === 0? setPageNum(1) : setPageNum(pageNum - 1);
  }

  const handleNextClick = () => {
    setCurrentUrl(next)
    setPageNum(pageNum + 1)
  }




// ---------- Search ----------
  const getInput = (e) => {
    setInput(e.target.value)
  }


  const handleSearchSubmit = () => {
      if(input !== null) {
        console.log("Input " + input)
        setCurrentUrl(url + `?search=${input}`)
        if(_data.length === 0) {
            console.log(_data.length)
            setSearchInfo("Search: " + input + " not found")
          } else {
            console.log(_data)
            setSearchInfo("Search: " + input)
          }
      } else {
        setCurrentUrl(currentUrl)
      }
        
  }
  
  

  return (
    <div className='home'>
      <Header />
      <Main />

      <div id='container bg_red'>
        <div className='search'>
          <input type="text" defaultValue={input} onChange={getInput}></input>
          <button onClick={handleSearchSubmit}>Submit</button>
          {<p>{searchInfo}</p>}
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
