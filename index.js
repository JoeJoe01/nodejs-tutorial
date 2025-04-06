// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

const { ApolloClient, InMemoryCache, gql } = require('@apollo/client');
const fetch = require('node-fetch');

// Usar las variables de entorno cargadas desde el archivo .env
const HASURA_API_URL = process.env.HASURA_API_URL;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

// Crear cliente Apollo para la API de GraphQL de Hasura
const client = new ApolloClient({
  uri: HASURA_API_URL,
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret': HASURA_ADMIN_SECRET, // Autenticación de Hasura
  },
  fetch,
});

// Realizar una consulta de ejemplo para obtener las frutas
const GET_FRUTAS_QUERY = gql`
  query GetFrutas {
    frutas {
      id
      nombre
      descripcion
      precio
      unidad_medida
    }
  }
`;

// Ejecutar la consulta
client
  .query({
    query: GET_FRUTAS_QUERY,
  })
  .then((result) => {
    console.log(result.data); // Mostrar los datos obtenidos de Hasura
  })
  .catch((error) => {
    console.error('Error al obtener los datos:', error);
  });
