import React, {useState, useEffect} from 'react'

export function PokemonPet(){
    const[pokemon,setPokemon] = useState(null)
    const[evolucao,setEvolucao] = useState([])
    const[carregando,setCarregando] = useState(false)
    const[erro,setErro] = useState(false)

    // FUNÇÃO PARA BUSCAR A API
    const buscarPokemonAleatorio = async () => {

    }
}

