
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import MovieList from './componentes/MovieList'
//import MouseTracker from './components/mouseTracker';

function App() {
  const API_KEY = '65710bf0';

  const [perfil, setPerfil] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [DBZ, setDBZ] = useState({})
  const [pokemon, setPokemon] = useState({})
  const [filme, setFilme] = useState({})
  const [text, setText] = useState(() => {
    return localStorage.getItem('easy-input') || '';
  });

  //Atividade etapa 1, variaveis de estado movies, query e queryloading
  //Atividade etapa 1 até aqui

  //Atividade etapa 2 variaveis de estado showtrakcer
  //

  useEffect(() => {
    const getData = async () => {
      // As requisições são executadas independentemente.
      // Se uma API falhar, as outras ainda poderão funcionar.
      const requisicoes = await Promise.allSettled([
        axios.get(
          "https://6a79e554674f43f4db11ebc8.mockapi.io/api/person/1"
        ),
        axios.get(
          "https://dragonball-api.com/api/characters/10"
        ),
        axios.get(
          "https://pokeapi.co/api/v2/pokemon/raichu"
        ),
        axios.get(
          `https://www.omdbapi.com/?i=tt0803096&apikey=${API_KEY}`
        )
      ]);

      let sucessos = 0;

      // Primeira API: perfil
      if (requisicoes[0].status === 'fulfilled') {
        setPerfil(requisicoes[0].value.data);
        sucessos++;
      } else {
        console.error('Erro na API de perfil:', requisicoes[0].reason);
      }

      // Segunda API: Dragon Ball
      if (requisicoes[1].status === 'fulfilled') {
        setDBZ(requisicoes[1].value.data);
        sucessos++;
      } else {
        console.error('Erro na API de Dragon Ball:', requisicoes[1].reason);
      }

      // Terceira API: Pokémon
      if (requisicoes[2].status === 'fulfilled') {
        setPokemon(requisicoes[2].value.data);
        sucessos++;
      } else {
        console.error('Erro na API de Pokémon:', requisicoes[2].reason);
      }

      // Quarta API: filme
      if (requisicoes[3].status === 'fulfilled') {
        const dadosFilme = requisicoes[3].value.data;

        if (dadosFilme.Response !== 'False') {
          setFilme(dadosFilme);
          sucessos++;
        } else {
          console.error('Erro na API de filmes:', dadosFilme.Error);
        }
      } else {
        console.error('Erro na API de filmes:', requisicoes[3].reason);
      }

      // Só apresenta o erro geral se nenhuma API funcionar.
      setError(sucessos === 0);
      setLoading(false);
    };

    getData().catch((error) => {
      console.error('Erro inesperado ao carregar os dados:', error);
      setError(true);
      setLoading(false);
    });
  }, []);

  // Toda vez que o 'text' mudar, o useEffect será acionado e salvará no localStorage
  useEffect(() => {
    localStorage.setItem('easy-input', text);
    console.log('Fácil: Salvando no localStorage ->', text);
  }, [text]);

  //Atividade etapa 1, useEffect pesquisa de filme
  //Atividade 1 até aqui

  if (loading) {
    return <div>Loading</div>;
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
    );
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          {DBZ.image && (
            <img
              src={DBZ.image}
              className="base"
              width="170"
              height="179"
              alt="Personagem de Dragon Ball"
            />
          )}
        </div>

        <div>
          <h1>{perfil.nome || 'Perfil não disponível'}</h1>
        </div>

        <div className="card">
          <h2>UseEffect Nível Fácil: Sincronizar com LocalStorage</h2>
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

        {/*Atividade etapa 1 renderizar pesquisa de filmes aqui */}
           <MovieList />

        {/*Atividade etapa 1 renderizar pesquisa de filmes até aqui */}

        {/*Atividade etapa 2 renderizar mousetracker aqui */}

      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <h2>Filme que não gostei</h2>

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
          <p></p>
          <p></p>
        </div>

        <div id="social">
          <h2>Meu pet</h2>

          <p>{pokemon.name || 'Pokémon não disponível'}</p>

          {pokemon.sprites?.front_default && (
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name || 'Pokémon'}
            />
          )}

          <p>{pokemon.types?.[0]?.type?.name || ''}</p>
        </div>
      </section>

      <div className="ticks"></div>
    </>
  );
}

export default App;
