import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [_title, _setTitle] = useState("null");

  
  
  
  
  useEffect(() => {
    fetch("https://api.spaceflightnewsapi.net/v4/articles/")
    .then((response) => response.json())
    .then((data) => setData(data.results))
    .catch((error) => console.error(error));
  }, []);

  
  

  return (
    <div>
      <h1>Spaceflight News</h1>
      <h2>{_title}</h2>
      <button onClick={() => _setTitle("Paulo")}>Click</button>
        {data.map((e) => {
          <h2 key={e.id}>Hello</h2>
      })}
    </div>
  );
}

export default App;
