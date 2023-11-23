import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '../lib/axios'
import { Path, Style } from '../lib/props'

import { TextButton, ValidateButton } from '../components/TextButton'
import Email from '../components/form/Email'
import Username from '../components/form/Username'

export default function ForgotPass() {
  const [username, setUsername] = useState('')
  const [isValidUser, setIsValidUser] = useState(true)

  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(true)

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    setEmail(email.trim())
    if (email === '') setIsValidEmail(false)

    setUsername(username.trim())
    if (username === '') setIsValidUser(false)

    if (email === '' || username === '') {
      setIsLoading(false)
    } else {
      try {
        const response = await api.post('/forgot-pass', {
          email,
          username,
        })

        // console.log(response)

        switch (response.status) {
          case 204:
            alert(
              'E-mail de recuperação enviado, confira sua caixa de entrada!',
            )
            navigate(Path.login)
            break
          case 404:
            // se retorna 404, não existe usuario e email, avisa "não encontrado"
            alert(
              'E-mail e/ou usuário não encontrado, confira o que você digitou e tente novamente',
            )
            break
          default:
            alert('Erro na verificação, tente novamente mais tarde')
            break
        }
      } catch (err: any) {
        // se retorna 400, erro, mostrar detalhes do erro no console e avisa "erro, tente novamente mais tarde"
        console.log('>', err.response.data.message)
        alert('Erro na verificação, tente novamente mais tarde')
      } finally {
        setIsLoading(false)
      }
    }
  }

  // <?php include("trans/log.php");
  // 	switch($_POST['operation']) {
  // 		case "pass":
  // 			$title = "Recuperar senha";
  // 			$subtitle = "<h2>Recupere sua senha</h2>";
  // 			$formStart = '<form action="trans/recuperando.php" method="post">';
  // 			$table = '<center><table width="600px"><tr>'.
  // 				'<td width="300px">Usu&aacute;rio:</td><td width="300px"><input name="user" type="text" size="50" /></td></tr>'.
  // 				'<tr><td>Email:</td><td><input name="email" type="text" size="50" /></td></tr>'.
  // 				'</table></center>';
  // 			$formEnd = "<input type='hidden' name='mode' value='pass'>".
  // 				'<input type="submit" value="Procurar" /></form>';
  // 			salvaLog("Visitante: Recuperando senha", "allBlog/recuperar.php");
  // 		break;

  // 		case "user":
  // 			$title = "Recuperar usu&aacute;rio";
  // 			$subtitle = "<h2>Lembre seu nome de usu&aacute;rio</h2>";
  // 			$formStart = '<form action="trans/recuperando.php" method="post">';
  // 			$table = '<center><table width="600px"><tr>'.
  // 				'<tr><td>Email:</td><td><input name="email" type="text" size="50" /></td></tr>'.
  // 				'<td width="300px">Senha:</td><td width="300px"><input name="pass" type="password" size="50" /></td></tr>'.
  // 				'</table></center>';
  // 			$formEnd = "<input type='hidden' name='mode' value='user'>".
  // 				'<input type="submit" value="Procurar" /></form>';
  // 			salvaLog("Visitante: Recuperando usuario", "allBlog/recuperar.php");
  // 		break;

  // 		case "email":
  // 			$title = "Recuperar usu&aacute;rio";
  // 			$subtitle = "<script>alert('Verifique o email cadastado!');</script>";
  // 			salvaLog("Visitante: Recuperacao pedida", "allBlog/recuperar.php");
  // 		break;

  // 		default:
  // 			$title="Recuperar";
  // 			salvaLog("Visitante: Recuperar", "allBlog/recuperar.php");
  // 		break;
  // 	}
  // ?>

  return (
    <form onSubmit={handleSubmit} className={Style.form}>
      {/*  action="trans/recuperando.php" method="post" */}
      {/* <input type="hidden" name="mode" value="pass" /> */}

      <p className={Style.title}>Recupere sua senha</p>

      <Username onChange={setUsername} onValid={setIsValidUser} />

      <Email onChange={setEmail} onValid={setIsValidEmail} />

      <button
        type="submit"
        className={ValidateButton(!isValidUser || !isValidEmail || isLoading)}
      >
        {TextButton(!isValidUser || !isValidEmail, isLoading, 'Recuperar')}
      </button>
    </form>
  )
}
