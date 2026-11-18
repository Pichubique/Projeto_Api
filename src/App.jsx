
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import DragonBall from './pages/DragonBall'
import Filmes from './pages/Filmes'
import Pokemon from './pages/Pokemon'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dragonBall" element={<DragonBall />} />
        <Route path="/filmes" element={<Filmes />} />
        <Route path="/MyPokemon" element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App