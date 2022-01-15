import { useEffect, useState } from 'react';
import 'axios';
import './Home.css';
import { list, getPk } from '../../services';
import Card from '../Components/Card/Card';
import { Link } from 'react-router-dom';

const Home = () => {
  const [pokemonData, setPokemonData] = useState([])
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let response = {};
      await list(offset).then(res => {
        response = res.data;
      });
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, [])

  const next = async () => {
    setLoading(true);
    const off = offset + 20;
    setOffset(off);
    let response = {};
    await list(off).then(res => {
      response = res.data;
    })
    await loadPokemon(response.results);
    setLoading(false);
  }

  const prev = async () => {
    if (offset === 0) return;
    setLoading(true);
    const off = offset - 20;
    setOffset(off);
    let response = {};
    await list(off).then(res => {
      response = res.data;
    })
    await loadPokemon(response.results);
    setLoading(false);
  }

  const loadPokemon = async (data) => {
    if (data) {
      let _pokemonData = await Promise.all(data.map(async pokemon => {
        let pokemonRecord = await getPk(pokemon);
        return pokemonRecord
      }))
      setPokemonData(_pokemonData);
    }
  }

  return (
    <div>
      {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
        <>
          <div className="btn">
            <Link to='select-pk'>
              <button >Selecionar Pokemon Inicial</button>
            </Link>
          </div>
          <div className="grid-container">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pk={pokemon} />
            })}
          </div>
          <div className="btn">
            <button onClick={prev}>Anterior</button>
            <button onClick={next}>Próximo</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;