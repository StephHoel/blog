import { MD5 } from 'crypto-js'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '../lib/axios'
import { GetLogin, SetLogin } from '../lib/login'
import { Path, Style } from '../lib/props'

import { ErrorPass, ErrorUser } from '../components/DivError'
import TextButton, { ValidateButton } from '../components/TextButton'

export default function Home() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const [isValidUser, setIsValidUser] = useState(true)
  const [isValidPass, setIsValidPass] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (GetLogin()) navigate(Path.dash)
  }, [navigate])

  async function handleSubmitLogin(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    if (user.trim() === '' && pass.trim() === '') {
      setIsValidPass(false)
      setIsValidUser(false)
      setIsLoading(false)
    } else {
      try {
        const login = await api.post('/login', {
          username: user.toString().trim(),
          password: MD5(pass).toString(),
        })

        // console.log(login)

        if (login.status === 200) {
          SetLogin(login.data.idLogin)
          navigate(Path.dash)
        }
      } catch (err: any) {
        // console.log(err)
        console.log('>', err.response.data.message)
        alert(
          'Login não encontrado\nUsuário e/ou senha inválidos\nTem certeza que você está registrado?',
        )
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmitLogin} className={Style.form}>
        <p className={Style.title}>Login</p>

        <div className="grid">
          <label className={Style.label}>Usuário</label>
          <input
            type="text"
            className={Style.input}
            placeholder="Usuário"
            autoComplete="username"
            value={user}
            onChange={(e) => {
              const value = e.currentTarget.value
              setUser(value)

              if (value.length < 4) setIsValidUser(false)
              else setIsValidUser(true)
            }}
          />
          {!isValidUser && <ErrorUser />}
        </div>

        <div className="grid">
          <label className={Style.label}>Senha</label>
          <input
            type="password"
            className={Style.input}
            placeholder="Senha"
            autoComplete="current-password"
            value={pass}
            onChange={(e) => {
              const value = e.currentTarget.value
              setPass(value)

              if (value.length === 0) setIsValidPass(false)
              else setIsValidPass(true)
            }}
          />
          {!isValidPass && <ErrorPass />}
        </div>

        <button
          type="submit"
          className={ValidateButton(!isValidUser || !isValidPass || isLoading)}
        >
          {TextButton(!isValidUser || !isValidPass, isLoading, 'Entrar')}
        </button>
      </form>

      <div className="flex gap-1 justify-center text-2xl py-4">
        <form name="pass" action="recuperar.php" method="POST">
          <input type="hidden" name="operation" value="pass" />
          <a id="Link" onClick={() => 'document.pass.submit()'}>
            Esqueceu a senha?
          </a>
        </form>
      </div>
    </>
  )
}
