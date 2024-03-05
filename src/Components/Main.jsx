import { useState } from "react"

import Api from "../service/Api"
import Card from "./Card"

const url = "https://api.spaceflightnewsapi.net/v4/articles/"

export default function Main() {
    const [currentUrl, setCurrentUrl] = useState(url)
    
    const { data, previous, next} = Api(currentUrl)

    const [input, setInput] = useState(null)
    const [searchInfo, setSearchInfo] = useState("")

    const [pageNum, setPageNum] = useState(1)
    

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
        console.log(input);
    }

    const handleSearchSubmit = () => {
        if(input !== null) {
            console.log("Input " + input)
            setCurrentUrl(url + `?search=${input}`)
            if(data.length === 0) {
                console.log(data.length)
                setSearchInfo("Search: " + input + " not found")
            } else {
                console.log(data)
                setSearchInfo("Search: " + input)
            }
        } else {
            setCurrentUrl(currentUrl)
        }
            
    }
    

    return (


        <div id='container bg_red'>

            <div className='search'>
                <input type="text" defaultValue={input} onChange={getInput}></input>
                <button onClick={handleSearchSubmit}>Submit</button>
                {<p>{searchInfo}</p>}
            </div>

            <div className='container_cards'>
                {data.map((item) => {

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
    )
}