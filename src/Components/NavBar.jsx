import { useState } from 'react'
import '../App.css'


export default function NavBar() {

    const [articles, setArticles] = useState("articles/")
    const [reports, setReports] = useState("reports/")
    const [blogs, setBlogs] = useState("blogs/")

    const handleArticles = () => {
        setArticles(articles)
        console.log("Articles")
    }

    const handleReports = () => {
        setReports(reports)
        console.log("Reports")
    }

    const handleBlogs = () => {
        setBlogs(blogs)
        console.log("Blogs")
    }

    return (
        <nav className="navbar">
            <button type="button" className="button_nav" onClick={handleArticles}>Articles</button>
            <button type="button" className="button_nav" onClick={handleReports}>Reports</button>
            <button type="button" className="button_nav" onClick={handleBlogs}>Blogs</button>
        </nav>
    )
}