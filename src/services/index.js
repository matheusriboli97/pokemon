import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/'
});

export const list = (offset=0, limit=20) => {
  return api
    .get(
      `?limit=${limit}&offset=${offset}`,
    );
}

export const getPk= async ({url}) => {
  console.log(url);
  return new Promise((resolve, reject) => {
      fetch(url).then(res => res.json())
          .then(data => {
              resolve(data)
          })
  });
}
