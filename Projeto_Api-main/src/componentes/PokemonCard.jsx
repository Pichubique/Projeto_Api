import './PokemonCard.css'
export default function pokemonCard({
    nome,
    imagem,
    vida,
    ataque,
    tipos
}) {
    const coresPorTipo = {
        fire: "#ef4444",
        water: "#3b82f6",
        grass: "#22c55e",
        eletric: "#eab308",
        psychic: "#ec4899",
        ice: "#67e8f9",
        dragon: "#8b5cf6",
        dark: "#475569",
        fairy: "#f9a8d4",
        fighting: "#b45309",
        poison: "#a855f7",
        ground: "#d97706",
        flying: "#93c5fd",
        bug: "#84cc16",
        rock: "#a8a29e",
        ghost: "#7c3aed",
        steel: "#94a3b8",
        normal: "#a3a3a3"
    }
    const tipoPrincipal = tipos[0]
    const cor = coresPorTipo[tipoPrincipal] || "#64748b"

    return(
        <div className="pokemonCard" style={{borderColor:cor,background: `linear-gradient(145deg, ${cor}33, #ffffff)`
        }}>
            <img src={imagem} alt={nome} />

            <h2>{nome.toUpperCase()}</h2>
        <div className="pokemonTypes">
            {tipos.map((tipo) =>(
                <span key={tipo}>{tipo}</span>
            ))}
        </div>
        <div className="pokemonStatus">
            <p>Vida: {vida}</p>
            <p>Ataque: {ataque}</p>
        </div>
        </div>
    )
}