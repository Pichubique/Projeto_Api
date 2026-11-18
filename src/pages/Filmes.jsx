import MovieList from "../componentes/MovieList"
import { Link } from 'react-router-dom'

function Filmes(){
    return(
    <div className="site-counteiner filmes">
        <Link to='/' className="botao-home"> 
        ← Voltar para Home
        </Link>
        <h1>Pesquisa de filmes</h1>
        <MovieList/>

        </div>
    )
}


export default Filmes