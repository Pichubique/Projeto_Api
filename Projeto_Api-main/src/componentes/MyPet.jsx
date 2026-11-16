   
import { useState, useEffect } from 'react'
import Card from './Card'


function EvolutionNode({ evolution }) {
    const [pokemon, setPokemon] = useState(null)

    useEffect(() => {
        async function buscarPokemon() {
            try {
                const resposta = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${evolution.species.name}`
                )

                if (!resposta.ok) {
                    throw new Error("Erro ao buscar Pokémon")
                }

                const dados = await resposta.json()

                setPokemon({
                    nome: dados.name,
                    imagem: dados.sprites.other?.['official-artwork']?.front_default
                        || dados.sprites.front_default,
                    tipos: dados.types.map(t => t.type.name),
                    vida: dados.stats.find(
                        stat => stat.stat.name === "hp"
                    ).base_stat,
                    ataque: dados.stats.find(
                        stat => stat.stat.name === "attack"
                    ).base_stat
                })

            } catch (err) {
                console.error(err)
            }
        }

        buscarPokemon()
    }, [evolution.species.name])

    return (
        <div className="evolutionNode">

            {pokemon ? (
                <Card
                    className="pokemonEvolutionCard"
                    title={pokemon.nome}
                    mediaUrl={pokemon.imagem}
                    tags={pokemon.tipos}
                    metadata={[
                        { label: 'Vida', value: pokemon.vida },
                        { label: 'Ataque', value: pokemon.ataque }
                    ]}
                />
            ) : (
                <div className="evolutionLoading">
                    Carregando...
                </div>
            )}

            {evolution.evolves_to.length > 0 && (
                <div className="evolutionChildren">
                    {evolution.evolves_to.map((proximaEvolucao) => (
                        <div
                            className="evolutionBranch"
                            key={proximaEvolucao.species.name}
                        >
                            <span className="evolutionArrow">➜</span>

                            <EvolutionNode
                                evolution={proximaEvolucao}
                            />
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}


export default function PokemonPet() {
    const [pokemon, setPokemon] = useState(null)
    const [evolucao, setEvolucao] = useState(null)
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState(null)

    // FUNÇÃO PARA BUSCAR A API
    const buscarPokemonAleatorio = async () => {

        if (carregando) return

        setCarregando(true)
        setErro(null)
        setEvolucao(null)
        setPokemon(null)

        try {
            const idAleatorio = Math.floor(Math.random() * 1000) + 1

            const resposta = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${idAleatorio}`
            )

            if (!resposta.ok) {
                throw new Error("Pokémon não encontrado ou falha na rede")
            }

            const dados = await resposta.json()

            const respostaEspecie = await fetch(dados.species.url)

            if (!respostaEspecie.ok) {
                throw new Error("Erro ao buscar espécie")
            }

            const dadosEspecie = await respostaEspecie.json()

            // BUSCA A CADEIA EVOLUTIVA
            const respostaEvolucao = await fetch(
                dadosEspecie.evolution_chain.url
            )

            if (!respostaEvolucao.ok) {
                throw new Error("Erro ao buscar evolução")
            }

            const dadosEvolucao = await respostaEvolucao.json()

            setEvolucao(dadosEvolucao.chain)

           const pokemonFormatado = {
            
            nome: dados.name,
            imagem: dados.sprites.front_default,

            tipos: dados.types.map(t => t.type.name),

            vida: dados.stats.find(
            stat => stat.stat.name === "hp"
        ).base_stat,

            ataque: dados.stats.find(
            stat => stat.stat.name === "attack"
        ).base_stat
    }

            setPokemon(pokemonFormatado)

        } catch (err) {
            console.error(err)
            setErro("Não foi possível sortear um Pokémon, tente novamente")
            setPokemon(null)

        } finally {
            setCarregando(false)
        }
    }

    return (
        <div>
            <button
                onClick={buscarPokemonAleatorio}
                disabled={carregando}
            >
                {carregando ? "Sorteando..." : "Encontrar Pokémon aleatório"}
            </button>

            {carregando && (
                <p className="loadingText">
                    Procurando na grama alta...
                </p>
            )}

            {erro && (
                <p className="errorText">{erro}</p>
            )}

           {!carregando && pokemon && (
            <Card
                title={pokemon.nome}
                className='pokemonPrincipal'
                mediaUrl={pokemon.imagem}
                tags={pokemon.tipos}
                metadata={[
                    {label:'Vida', value: pokemon.vida},
                    {label:'Ataque', value: pokemon.ataque}
                ]}

                    />
            )}
            

            {pokemon && evolucao && (
                <div className="evolutionCard">
                <h3>Árvore Evolutiva</h3>

                <div className="evolutionTree">
                <EvolutionNode evolution={evolucao} />
            </div>
            </div>
            )}
        </div>
    )
}
