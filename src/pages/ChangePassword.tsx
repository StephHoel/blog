import MD5 from 'crypto-js/md5'
import { useEffect, useState } from 'react'

import { TextButton, ValidateButton } from '../components/TextButton'
import Password from '../components/form/Password'

import { useNavigate } from 'react-router-dom'
import { api } from '../lib/axios'
import { Path, Style } from '../lib/props'

export default function ChangePassword() {
  const [password, setPassword] = useState('')
  const [isValidPass, setIsValidPass] = useState(true)

  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isValidPassConfirm, setIsValidPassConfirm] = useState(true)

  const [isLoading, setIsLoading] = useState(false)
  const [isSamePass, setIsSamePass] = useState(false)

  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  async function handleChangePassword() {
    setIsSamePass(password === passwordConfirm)

    if (token !== null)
      return alert('Erro inesperado! Tente novamente mais tarde!')

    if (isSamePass) {
      try {
        setIsLoading(true)
        const response = await api.post(`/reset-pass/${token}`, {
          password: MD5(password),
        })

        if (response.status === 200) {
          alert('Senha alterada com sucesso!')
          console.log('Senha alterada com sucesso!')
          navigate(Path.login)
        } else {
          alert('Erro ao alterar a senha')
          console.error('Erro ao alterar a senha')
        }
      } catch (error) {
        alert('Erro ao alterar a senha')
        console.error('Erro:', error)
      } finally {
        setIsLoading(false)
      }
    } else setIsValidPassConfirm(false)
  }

  useEffect(() => {
    localStorage.removeItem('token')
    if (token !== null) {
      console.log('token', token)
    }
  }, [])

  return (
    <form onSubmit={handleChangePassword} className={Style.form}>
      <p className={Style.title}>Alterar Senha</p>

      <Password onChange={setPassword} onValid={setIsValidPass} />

      <Password
        label={'Confirme a senha'}
        onChange={setPasswordConfirm}
        onValid={setIsValidPassConfirm}
      />

      <button
        type="submit"
        className={ValidateButton(
          !isValidPass || !isValidPassConfirm || isSamePass || isLoading,
        )}
      >
        {TextButton(
          !isValidPass || !isValidPassConfirm || isSamePass,
          isLoading,
          'Altere Sua Senha',
        )}
      </button>
    </form>
  )
}
