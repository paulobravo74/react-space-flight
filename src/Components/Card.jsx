export default function Card({ image, title, url, summary, site, date}) {
    return (

        <div className='card'>
            <div>
              <img src={image} className='img'></img>
            </div>
            <div> 
              <p>{title}</p>
              <a href={url} target='_blank' rel='noreferrer' alt="" title={summary}>{site}</a>
              <p>Published: {(date).slice(0,10)}</p>
            </div>
          </div>

    )
}