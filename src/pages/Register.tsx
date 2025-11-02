/* eslint-disable @typescript-eslint/no-explicit-any */
import MD5 from 'crypto-js/md5'
import { FormEvent, useEffect, useState } from 'react'

import { api } from '../lib/axios'
import { GetLogin } from '../lib/login'
import { Path, Style } from '../lib/props'

import { TextButton, ValidateButton } from '../components/TextButton'
import Email from '../components/form/Email'
import Password from '../components/form/Password'
import Username from '../components/form/Username'
import { useRouter } from 'next/router'

export default function Register() {
  const [username, setUsername] = useState('')
  const [isValidUser, setIsValidUser] = useState(true)

  const [password, setPassword] = useState('')
  const [isValidPass, setIsValidPass] = useState(true)

  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(true)

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (GetLogin()) router.push(Path.dash)
  }, [router])

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
          router.push(Path.login)
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

      <Email onChange={setEmail} onValid={setIsValidEmail} />

      <Username onChange={setUsername} onValid={setIsValidUser} />

      <Password onChange={setPassword} onValid={setIsValidPass} />

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
