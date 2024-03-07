export default function Card({ image, title, url, summary, site, date, mode}) {

  const titleSlice = (title).slice(0,95)

    return (

        <div id='card' className={mode}>
            <div>
              <img src={image} className='img' alt=""></img>
            </div>
            
            <div> 
              <p className="card-title">{
                title.length <= titleSlice.length ? title : titleSlice + '...'
                }</p>
            
              <a href={url} target='_blank' rel='noreferrer' alt="" title={summary}>{site}</a>
              <p>Published: {(date).slice(0,10)}</p>
            </div>
          </div>

    )
}