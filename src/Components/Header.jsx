import '../App.css'

const imgUrl = "https://th.bing.com/th/id/R.0a62171ba095feb7a646cca9b118f044?rik=tV3jZzdo4tDY0g&riu=http%3a%2f%2fhdqwalls.com%2fwallpapers%2frocket-heading-towards-space-0c.jpg&ehk=fF8ETjph3P4O5BxvP9BwEBEfDFO%2fv11u40fC5XUTO04%3d&risl=&pid=ImgRaw&r=0"


export default function Header() {
    return (
    <div id="header">
        <img src={imgUrl} className="imgBanner"></img>
        <h1 className='textBanner'>Spaceflight News</h1>
    </div>
    )
}