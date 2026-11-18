import './Card.css'

function Card({ title, mediaUrl, tags = [], metadata = [], className = '' })  {
    console.log("Título:", title);
    console.log("Imagem recebida:", mediaUrl);
    const listaTags = Array.isArray(tags) ? tags : [];
    const listaMetadata = Array.isArray(metadata) ? metadata : [];
    return(
        <div className={`genericCard ${className} ${tags[0] || ''}`}>

            {mediaUrl && (
                <img 
                src={mediaUrl}
                alt={title}
                className='genericCardImage'
                 />
            )}

            <h2>{title}</h2>
            <div className='genericCardTags'>
                {listaTags.map((tag, index)  => (
                    <span key={index} className='genericTag'>
                        {tag}
                    </span>
                ))}
            </div>

            <div className='genericCardMetadata'>
               {listaMetadata.map((item, index) => (
                <p key={index}>
                <strong>{item.label}:</strong>
                {String(item.value ?? '')}
                </p>
                ))}
            </div>
        </div>
    )
}
export default Card