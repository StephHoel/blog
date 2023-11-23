import { useState } from 'react'
import { ChildProps, Style } from '../../lib/props'
import { validateEmail } from '../../lib/utils'

export default function Email({ onChange, onValid }: ChildProps) {
  const [input, setInput] = useState('')
  const [isValid, setIsValid] = useState(true)

  return (
    <div className="grid">
      <label className={Style.label}>E-mail:</label>
      <input
        type="email"
        className={Style.input}
        placeholder="exemplo@email.com"
        autoComplete="email"
        value={input}
        onChange={(e) => {
          const value = e.currentTarget.value
          setInput(value)
          onChange(value)

          const isValid = validateEmail(value)
          setIsValid(isValid)
          onValid(isValid)
        }}
      />
      {!isValid && <div className={Style.divError}>E-mail inválido</div>}
    </div>
  )
}
