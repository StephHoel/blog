import { Style } from '../lib/props'

/* eslint-disable prettier/prettier */
export default function TextButton(
  campo: boolean,
  loading: boolean,
  text: string,
) {
  return campo
    ? 'Preencha os campos antes de clicar aqui'
    : loading
      ? 'Aguarde, carregando...'
      : text
}

export function ValidateButton(validFields: boolean) {
  return Style.button.all + (validFields ? Style.button.not : Style.button.yes)
}

export function ValidateButtonPost(validFields: boolean) {
  return Style.button.post + Style.button.all + (validFields ? Style.button.yes : Style.button.not)
}