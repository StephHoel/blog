import { useState } from 'react'
import { ChildProps, Style } from '../../lib/props'
import { validateUsername } from '../../lib/utils'

export default function Username({ onChange, onValid }: ChildProps) {
  const [input, setInput] = useState('')
  const [isValid, setIsValid] = useState(true)

  return (
    <div className="grid">
      <label className={Style.label}>Usuário</label>
      <input
        type="text"
        className={Style.input}
        placeholder="usuario"
        autoComplete="username"
        value={input}
        onChange={(e) => {
          const value = e.currentTarget.value
          setInput(value)
          onChange(value)

          const isValid = validateUsername(value)
          setIsValid(isValid)
          onValid(isValid)
        }}
      />
      {!isValid && <div className={Style.divError}>Mínimo de 4 caracteres</div>}
    </div>
  )
}
