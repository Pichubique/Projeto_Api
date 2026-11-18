import { useEffect,useState} from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../App.css'
function DragonBall(){
    
    const [DBZ,setDBZ] = useState({})
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        async function buscarPersonagem(){
            try{
                const resposta = await axios.get(
                    'https://dragonball-api.com/api/characters/10'
                )

                setDBZ(resposta.data)
            }   catch(error){
                console.error('Erro ao buscar personagem:', error)
            }   finally{
                setLoading(false)
            }
        }
        buscarPersonagem()
    }, [])

    if(loading){
        return <h2>Carregando DragonBall...</h2>
    }
    return(
    
    <div className="site-container dragonball">
        <Link to='/' className="botao-home"> 
        ← Voltar para Home
        </Link>
        <h1>Dragon Ball</h1>

        <div className="card">
        <h2>{DBZ.name}</h2>

            {DBZ.image && (
                <img 
                src={DBZ.image} 
                alt={DBZ.name}
                width={200} 
                />
            )}

            <p>Raça: {DBZ.race}</p>
            <p>Ki: {DBZ.ki}</p>
            <p>Ki Maximo: {DBZ.maxKi}</p>
        </div>
        </div>
    )
}

export default DragonBall