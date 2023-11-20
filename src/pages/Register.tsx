/* eslint-disable @typescript-eslint/no-explicit-any */
import MD5 from 'crypto-js/md5'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '../lib/axios'
import { GetLogin } from '../lib/login'
import { Path, Style } from '../lib/props'

import { ErrorEmail, ErrorPass, ErrorUser } from '../components/DivError'
import TextButton, { ValidateButton } from '../components/TextButton'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const [isValidUser, setIsValidUser] = useState(true)
  const [isValidPass, setIsValidPass] = useState(true)
  const [isValidEmail, setIsValidEmail] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (GetLogin()) navigate(Path.dash)
  }, [navigate])

  function validateEmail(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value

    setEmail(value)

    if (value.includes('@')) {
      const arroba = value.split('@')[1].split('.')[1]

      if (arroba) {
        setIsValidEmail(true)
      } else {
        setIsValidEmail(false)
      }
    } else {
      setIsValidEmail(false)
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    if (email.trim() === '') setIsValidEmail(false)

    if (username.trim() === '') setIsValidUser(false)

    if (password.trim() === '') setIsValidPass(false)

    if (
      email.trim() === '' ||
      username.trim() === '' ||
      password.trim() === ''
    ) {
      setIsLoading(false)
    } else {
      try {
        const register = await api.post('/register', {
          email,
          username: username.toString().trim(),
          password: MD5(password).toString(),
        })

        // console.log(register)

        if (register.status === 201) {
          alert('Cadastrado com sucesso!\nFaça o login para entrar...')
          navigate(Path.login)
        }
      } catch (err: any) {
        console.log('>', err.response.data.message)
        alert('Cadastro não realizado, tente novamente mais tarde')
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className={Style.form}>
      {/* action="trans/cadastro.php" method="post" */}
      <p className={Style.title}>Cadastro</p>

      <div className="grid">
        <label className={Style.label}>E-mail:</label>
        <input
          type="email"
          className={Style.input}
          placeholder="exemplo@email.com"
          autoComplete="email"
          value={email}
          onChange={validateEmail}
        />
        {!isValidEmail && <ErrorEmail />}
      </div>

      <div className="grid">
        <label className={Style.label}>Usuário</label>
        <input
          type="text"
          className={Style.input}
          placeholder="usuario"
          autoComplete="username"
          value={username}
          onChange={(e) => {
            const value = e.currentTarget.value
            setUsername(value)

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
          value={password}
          onChange={(e) => {
            const value = e.currentTarget.value
            setPassword(value)

            if (value.length === 0) setIsValidPass(false)
            else setIsValidPass(true)
          }}
        />
        {!isValidPass && <ErrorPass />}
      </div>

      <button
        type="submit"
        className={ValidateButton(
          !isValidUser || !isValidPass || !isValidEmail || isLoading,
        )}
      >
        {TextButton(
          !isValidUser || !isValidPass || !isValidEmail,
          isLoading,
          'Cadastrar-se',
        )}
      </button>
    </form>
  )
}
