import { useState, useEffect } from "react";


export default function Api(url) {
      
    const [data, setData] = useState([]);
    
    const [previous, setPrevious] = useState(null);
    const [next, setNext] = useState();

    useEffect(() => {
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data.results)
          setPrevious(data.previous)
          setNext(data.next)
        })
        .catch((error) => console.error(error));
      }, [url]);
    
      return { data, previous, next}
}