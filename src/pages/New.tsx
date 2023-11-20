import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '../lib/axios'
import { GetLogin } from '../lib/login'
import { Path, State, Style } from '../lib/props'

import MarkdownEditor from '../components/MarkdownEditor'
import MarkdownViewer from '../components/MarkdownViewer'
import { ValidateButtonPost } from '../components/TextButton'

export default function New() {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (!GetLogin()) navigate(Path.home)
  }, [navigate])

  async function handleSubmit(type: string) {
    setIsLoading(true)

    if (GetLogin() !== null) {
      if (title.trim() !== '' && content.trim() !== '') {
        const post = await api.post(
          '/post',
          {
            title: title.trim(),
            content: content.trim(),
            state: type.toUpperCase(),
          },
          {
            headers: {
              idauthor: GetLogin(),
            },
          },
        )

        if (post.status === 200) navigate(Path.dash)
        else {
          alert('Ocorreu um erro, tente novamente mais tarde!')
          console.log(post)
        }
      } else alert('Não deixe o título e/ou o conteúdo em branco')
    } else {
      alert('Faça o login e tente novamente!')
    }

    setIsLoading(false)
  }

  return (
    <div className="gap-4 grid">
      <p className={Style.page.title}>New Post</p>

      <div className="mx-auto w-3/4 ">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          className="rounded-xl bg-gray-400 w-full py-2 px-4 mb-4 outline-none
        placeholder:text-[rgba(0,0,0,0.6)] placeholder:italic 
        "
        />

        <MarkdownEditor onChange={setContent} />

        <MarkdownViewer markdown={content} />

        <div className="flex gap-4 mt-4">
          <button
            className={ValidateButtonPost(!isLoading)} // {Style.button.post}
            onClick={() => handleSubmit(State.DRAFT)}
          >
            Rascunho
          </button>
          <button
            className={ValidateButtonPost(!isLoading)} // {Style.button.post}
            onClick={() => handleSubmit(State.POST)}
          >
            Postar
          </button>
        </div>
      </div>
    </div>
  )
}
