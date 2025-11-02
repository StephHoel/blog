import { useEffect, useState } from 'react'

import LogoC from '../images/Steph_Hoel_c.png'

import { Path } from '../lib/props'

import MenuItem from '../components/MenuItem'
import { GetLogin } from '../lib/login'

import { AppProps } from 'next/app'

import '../styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [hasLogin, setHasLogin] = useState(false)

  useEffect(() => {
    if (GetLogin()) setHasLogin(true)
    else setHasLogin(false)
  }, [])

  return (

    <div
      className="mx-auto p-4 lg:w-4/5 h-screen grid overflow-hidden"
      id="body"
    >
      <header className="justify-between items-center select-none px-1 bg-gray-500/30 rounded-xl">
        <div className="mx-auto relative mt-8 p-4 lg:text-4xl sm:text-2xl grid items-center justify-center gap-8">
          <img
            src={LogoC}
            alt="Avatar Preto e Branco"
            className="lg:w-[80px] sm:w-[50px] mx-auto"
          />
          <p>Steph Hoel</p>
        </div>

        <nav className="grid gap-8 items-center mt-4">
          <MenuItem href={Path.home}>Home</MenuItem>
          {hasLogin ? (
            <>
              <MenuItem href={Path.dash}>Dashboard</MenuItem>
              <MenuItem href={Path.new}>Novo Post</MenuItem>
              <MenuItem href={Path.home} logout={true}>
                Sair
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem href={Path.login}>Login</MenuItem>
              <MenuItem href={Path.register}>Register</MenuItem>
            </>
          )}
        </nav>
      </header>

      <div className="grid-2 overflow-auto ml-4 -mr-2">
        <main className="px-8 pb-4 text-black font-roboto overflow-auto bg-gray-500/90 rounded-xl">
          <Component {...pageProps} />
        </main>

        <footer className="text-center items-center justify-center lg:text-xl sm:text-sm mt-4 p-1 select-none bg-gray-500/30 rounded-xl">
          Feito por Steph Hoel @2023
        </footer>
      </div>
    </div>
  )
}