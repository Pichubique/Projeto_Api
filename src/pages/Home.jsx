
import { useEffect, useState } from 'react'
import axios from 'axios'
import '../App.css'
import { Link } from 'react-router-dom'

import MovieList from '../componentes/MovieList'
import PokemonPet from '../componentes/MyPet'


function Home() {

  const API_KEY = '65710bf0'

  const [perfil, setPerfil] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [DBZ, setDBZ] = useState({})
  const [pokemon, setPokemon] = useState({})
  const [filme, setFilme] = useState({})
  const [tema, setTema] = useState('claro')

  const [text, setText] = useState(() => {
    return localStorage.getItem('easy-input') || ''
  })

  useEffect(() => {

    const getData = async () => {

      const requisicoes = await Promise.allSettled([
        axios.get(
          "https://6a79e554674f43f4db11ebc8.mockapi.io/api/person/1"
        ),
        axios.get(
          "https://dragonball-api.com/api/characters/10"
        ),
        axios.get(
          "https://pokeapi.co/api/v2/pokemon/lugia"
        ),
        axios.get(
          `https://www.omdbapi.com/?i=tt0803096&apikey=${API_KEY}`
        )
      ])

      let sucessos = 0

      if (requisicoes[0].status === 'fulfilled') {
        setPerfil(requisicoes[0].value.data)
        sucessos++
      }

      if (requisicoes[1].status === 'fulfilled') {
        setDBZ(requisicoes[1].value.data)
        sucessos++
      }

      if (requisicoes[2].status === 'fulfilled') {
        setPokemon(requisicoes[2].value.data)
        sucessos++
      }

      if (requisicoes[3].status === 'fulfilled') {
        const dadosFilme = requisicoes[3].value.data

        if (dadosFilme.Response !== 'False') {
          setFilme(dadosFilme)
          sucessos++
        }
      }

      setError(sucessos === 0)
      setLoading(false)
    }

    getData().catch((error) => {
      console.error('Erro inesperado:', error)
      setError(true)
      setLoading(false)
    })

  }, [])

  useEffect(() => {
    localStorage.setItem('easy-input', text)
  }, [text])

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return (
      <div>
        <h2>Ocorreu um erro inesperado</h2>
        <p>Não foi possível carregar os dados de nenhuma API.</p>

        <button onClick={() => window.location.reload()}>
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className={`site-container ${tema}`}>

      <button onClick={() => setTema(
        tema === "claro" ? "escuro" : "claro"
      )}>
        {tema === "claro" ? "🌙 Tema escuro" : "☀️ Tema claro"}
      </button>

      {/* SEGMENTO DRAGON BALL */}
      <section className="segmento dragonball">

        <Link to='/dragonBall'>Ver Pagina Completa</Link>

        <h2>{perfil.nome || 'Perfil não disponível'}</h2>

       

        <div className="card">
          <h3>Sincronizar com LocalStorage</h3>

          <p>
            O que você digitar será salvo automaticamente.
            Se recarregar a página, não perderá a informação.
          </p>

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite algo para salvar..."
          />
        </div>

      </section>

      {/* SEGMENTO FILMES */}
      <section className="segmento filmes">

        <Link to='/Filmes'>Ver Pagina Completa</Link>

        <h2>FILMES</h2>

       

        <div id="docs">
          <h3>Filme que não gostei</h3>

          <p>{filme.Title || 'Filme não disponível'}</p>

          {filme.Poster && filme.Poster !== 'N/A' && (
            <img
              src={filme.Poster}
              width="170"
              alt={filme.Title || 'Pôster do filme'}
            />
          )}

          <p>{filme.Ratings?.[1]?.Source || ''}</p>
          <p>{filme.Ratings?.[1]?.Value || ''}</p>
        </div>

      </section>

      {/* SEGMENTO POKÉMON */}
      <section className="segmento pokemon">

        <Link to='/MyPokemon'>Ver Pagina Completa</Link>

        <h2>POKÉMON</h2>

        

      </section>

    </div>
  )
}

export default Home



