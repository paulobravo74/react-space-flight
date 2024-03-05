import { useState, useEffect } from "react";



export default function Api() {
    
    const url = "https://api.spaceflightnewsapi.net/v4/articles/"
      
    const [currentUrl, setCurrentUrl] = useState(url)
    const [_data, _setData] = useState([]);
    
    const [previous, setPrevious] = useState(null);
    const [next, setNext] = useState();
    const [pageNum, setPageNum] = useState(1)

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


    
}