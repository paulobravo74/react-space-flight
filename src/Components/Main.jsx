import { useEffect, useState } from "react"

import { Api } from "../service/Api"
import Card from "./Card"

const url = "https://api.spaceflightnewsapi.net/v4/"



export default function Main() {

    const [data, setData] = useState([]);
    
    const [previous, setPrevious] = useState(null);
    const [next, setNext] = useState();

    const [list, setList] = useState("articles/")

    const [cardsNumber, setCardsNumber] = useState(6)
    
    const [currentUrl, setCurrentUrl] = useState(url + `${list}?limit=${cardsNumber}`)
    //console.log(currentUrl)

    useEffect(() => {
        const fetchData = async () => {
            const response = await Api(currentUrl);
            setData(response.results);
            setPrevious(response.previous)
            setNext(response.next)
        };

        fetchData();
    }, [currentUrl]);

    

    const [mode, setMode] = useState('lightMode')
    const [cardMode, setCardMode] = useState('lightCardMode')

    const [input, setInput] = useState(null)
    const [searchInfo, setSearchInfo] = useState("")

    const [pageNum, setPageNum] = useState(1)
    

    // ---------- Buttons ----------
    const handleArticles = () => {
        const newList = "articles";
        setList(newList)
        const newUrl = `${url}${newList}/?limit=${cardsNumber}`
        setCurrentUrl(newUrl)
    }

    const handleReports = () => {
        const newList = "reports";
        setList(newList)
        const newUrl = `${url}${newList}/?limit=${cardsNumber}`
        setCurrentUrl(newUrl)
    }

    const handleBlogs = () => {
        const newList = "blogs";
        setList(newList)
        const newUrl = `${url}${newList}/?limit=${cardsNumber}`
        setCurrentUrl(newUrl)
    }

    const handlePreviousClick = () => {
        setCurrentUrl(previous)
        pageNum - 1 === 0 ? setPageNum(1) : setPageNum(pageNum - 1);
    }

    const handleNextClick = () => {
        setCurrentUrl(next)
        setPageNum(pageNum + 1)
    }

    
    // ---------- Dark/Light Mode ----------
    const handleLightMode = () => {
        setMode('lightMode')
        setCardMode('lightCardMode')
    }
    
    const handleDarkMode = () => {
        setMode('darkMode')
        setCardMode('darkCardMode')
    }


    // ---------- Search ----------
    const getInput = (e) => {
        setInput(e.target.value)
        console.log(input);
    }

    const handleSearchSubmit = () => {
        if(input !== null) {
            console.log("Input " + input)
            setCurrentUrl(`${url}${list}?limit=${cardsNumber}&search=${input}`)
            setPageNum(1)
            console.log(currentUrl)
            if(data.length === 0) {
                //console.log(data.length)
                setSearchInfo(`Search: ${input} not found`)
            } else {
                console.log(data)
                setSearchInfo(`Search: ${input}`)
            }
        } else {
            setCurrentUrl(currentUrl)
        }
            
    }


    // ---------- news/page ----------

    const getNewsPage = (e) => {
        setCardsNumber(e.target.value)
        //console.log(cardsNumber)
    }

    const handleNewsPage = () => {
        setCurrentUrl(url + `${list}?limit=${cardsNumber}`)
        setPageNum(1)
    }

    // ---------- home ----------
    const home = () => {
        setCurrentUrl(`${url}${list}?limit=${cardsNumber}`)
        setPageNum(1)
    }

    

    return (

        <div id='container' className={mode}>

            <nav className="navbar">
                <button type="button" className="button_nav" onClick={handleArticles}>Articles</button>
                <button type="button" className="button_nav" onClick={handleReports}>Reports</button>
                <button type="button" className="button_nav" onClick={handleBlogs}>Blogs</button>
            </nav>

            <p>{list}</p>

            <div className="buttonMode">
                <button type="button" onClick={handleLightMode}>Light</button>
                <button type="button" onClick={handleDarkMode}>Dark</button>
            </div>

            <div className='search'>
                <input type="text" defaultValue={input} onChange={getInput} placeholder="Search..."></input>
                <button onClick={handleSearchSubmit}>Submit</button>
                <p>{searchInfo}</p>

                <input type="text" onChange={getNewsPage} placeholder="news/page" />
                <button onClick={handleNewsPage}>Submit</button>
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
                            mode={cardMode}
                        />
                    )

                })}
            </div>

            <div>
                <button type="button" onClick={handlePreviousClick}>Previous</button>
                <button type="button" onClick={handleNextClick}>Next</button>
            </div>
                
            <button type="button" onClick={home}>Home</button>
            
            <p>Page {pageNum}</p>
                
        </div>
    )
    
}