import { MD5 } from 'crypto-js'
import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { api } from '../lib/axios'
import { GetLogin, SetLogin } from '../lib/login'
import { Path, Style } from '../lib/props'

import { TextButton, ValidateButton } from '../components/TextButton'
import Password from '../components/form/Password'
import Username from '../components/form/Username'

export default function Home() {
  const [username, setUsername] = useState('')
  const [isValidUser, setIsValidUser] = useState(true)

  const [password, setPassword] = useState('')
  const [isValidPass, setIsValidPass] = useState(true)

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (GetLogin()) navigate(Path.dash)
  }, [navigate])

  async function handleSubmitLogin(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    if (username.trim() === '' && password.trim() === '') {
      setIsValidPass(false)
      setIsValidUser(false)
      setIsLoading(false)
    } else {
      try {
        const login = await api.post('/login', {
          username: username.toString().trim(),
          password: MD5(password).toString(),
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

        <Username onChange={setUsername} onValid={setIsValidUser} />

        <Password onChange={setPassword} onValid={setIsValidPass} />

        <button
          type="submit"
          className={ValidateButton(!isValidUser || !isValidPass || isLoading)}
        >
          {TextButton(!isValidUser || !isValidPass, isLoading, 'Entrar')}
        </button>
      </form>

      <Link
        to={Path.forgotPass}
        className="flex gap-1 justify-center text-2xl py-4 cursor-pointer"
      >
        Esqueceu a senha?
      </Link>
    </>
  )
}
