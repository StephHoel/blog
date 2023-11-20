import { Route, Routes } from 'react-router-dom'
import './index.css'

import { Path } from './lib/props'

import Layout from './Layout'
import Dash from './pages/Dash'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
  return (
    <Routes>
      <Route path={Path.home} element={<Layout />}>
        <Route index element={<Home />} />

        <Route path={Path.login} element={<Login />} />
        <Route path={Path.register} element={<Register />} />
        <Route path={Path.dash} element={<Dash />} />
      </Route>
    </Routes>
  )
}
