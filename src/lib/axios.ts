import axios from 'axios'

export const api = axios.create({
  // baseURL: 'http://localhost:3333',
  // baseURL: 'https://blog-server-igs1.onrender.com', // old
  baseURL: 'https://lista-compras-server.onrender.com',
})
