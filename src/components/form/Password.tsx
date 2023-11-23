import { useState } from 'react'
import { ChildProps, Style } from '../../lib/props'
import { validatePassword } from '../../lib/utils'

interface PassProps extends ChildProps {
  label?: string
}

export default function Password({
  onChange,
  onValid,
  label = 'Senha',
}: PassProps) {
  const [input, setInput] = useState('')
  const [isValid, setIsValid] = useState(true)

  return (
    <div className="grid">
      <label className={Style.label}>{label}</label>
      <input
        type="password"
        className={Style.input}
        placeholder="Senha"
        autoComplete="current-password"
        value={input}
        onChange={(e) => {
          const value = e.currentTarget.value
          setInput(value)
          onChange(value)

          const isValid = validatePassword(value)
          setIsValid(isValid)
          onValid(isValid)
        }}
      />
      {!isValid &&
        (label === 'Senha' ? (
          <div className={Style.divError}>Senha obrigatória</div>
        ) : (
          <div className={Style.divError}>As senhas precisam ser iguais</div>
        ))}
    </div>
  )
}
