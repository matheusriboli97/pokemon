import { useEffect, useState } from 'react';
import 'axios';
import './SelectPokemon.css';
import { list, getPk } from '../../services';
import MiniCard from '../Components/MiniCard/MiniCard';
import { Link } from 'react-router-dom';

function SelectPokemon() {
  const [initialPks, setInitialPks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await list().then((res) => {
        getInitialPks(res.data);
      });
    }
    fetchData();
  }, []);

  const getInitialPks = (response) => {
    let pks = [];
    response.results.forEach((res) => {
      if (res.name === 'squirtle' || res.name === 'charmander' || res.name === 'bulbasaur') {
        pks.push(res);
      }
    });
    loadPk(pks);
  }

  const loadPk = async (data) => {
    if (data) {
      let _pokemonData = await Promise.all(data.map(async pokemon => {
        let pokemonRecord = await getPk(pokemon)
        return pokemonRecord
      }))
      setInitialPks(_pokemonData);
    }
    setLoading(false);
  }

  const onDragStart = (event) => {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
  }

  const onDragOver = (event) => {
    event.preventDefault();
  }

  function onDrop(event) {
    const id = event
      .dataTransfer
      .getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    dropzone.appendChild(draggableElement);
  }

  return (
    <div>
      <div className="btn">
        <Link to='/'>
          <button >Lista de Pokémons</button>
        </Link>
      </div>
      {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
        <div className='container'>
          <section className='initial-pk'>
            <h1>Pokémons iniciais</h1>
            <div className='initial-pk-container'>
              {initialPks.map((pk, i) => {
                return (
                  <div id={`${pk.name}`} draggable='true' onDragStart={(event) => onDragStart(event)}>
                    <MiniCard key={i} pk={pk} />
                  </div>
                )
              })}
            </div>
          </section>
          <section className='selected-pk'>
            <h1>Pokémons selecionados</h1>
            <div className="selected-pk-container" onDragOver={(event) => onDragOver(event)} onDrop={(event) => onDrop(event)}>
            </div>
          </section>
        </div>
      )

      }</div>
  );
}

export default SelectPokemon;