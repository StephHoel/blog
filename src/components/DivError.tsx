import { Style } from '../lib/props'

export function ErrorUser() {
  return <div className={Style.divError}>Mínimo de 4 caracteres</div>
}

export function ErrorPass() {
  return <div className={Style.divError}>Senha obrigatória</div>
}

export function ErrorEmail() {
  return <div className={Style.divError}>E-mail inválido</div>
}
