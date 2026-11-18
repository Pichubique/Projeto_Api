import PokemonPet from "../componentes/MyPet"
import { Link } from 'react-router-dom'

function MyPokemon(){
    return(
    <div className="site-counteiner pokemon">
        <Link to='/' className="botao-home"> 
        ← Voltar para Home
        </Link>  
        <h1>Selecione Pokemon Aleatório</h1>
        <PokemonPet/>   
    </div>
    )
}

export default MyPokemon    
