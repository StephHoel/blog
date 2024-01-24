import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '../lib/axios'
import { Post } from '../lib/interface'
import { Path, State, Style } from '../lib/props'

import MarkdownEditor from '../components/MarkdownEditor'
import { ValidateButtonPost } from '../components/TextButton'
import { GetLogin } from '../lib/login'
import { GetItem } from '../lib/localStorage'

export default function Edit() {
  const [post, setPost] = useState<Post>()

  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const idPost = GetItem('idPost')

    async function load() {
      const response = await api.get(`/post/${idPost}`)
      console.log(response.data[0])
      setPost(response.data[0])
      setTitle(response.data[0].title)
      setContent(response.data[0].content)
    }

    load()
  }, [])

  async function handleSubmit(type: string) {
    setIsLoading(true)

    if (GetLogin() !== null && GetLogin() === post?.idAuthor) {
      if (title.trim() !== '' && content.trim() !== '') {
        const update = await api.put(
          '/post',
          {
            idPost: post.idPost.trim(),
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

        if (update.status === 204) navigate(Path.dash)
        else {
          alert('Ocorreu um erro, tente novamente mais tarde!')
          setIsLoading(false)
          console.log(update)
        }
      } else alert('Não deixe o título e/ou o conteúdo em branco')
    } else {
      alert('Faça o login e tente novamente!')
    }

    setIsLoading(false)
  }

  return (
    <div className="gap-4 grid">
      <p className={Style.page.title}>Edite sua publicação</p>

      {post !== undefined && (
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

          <MarkdownEditor onChange={setContent} value={content} />

          {/* <MarkdownViewer markdown={content} /> */}

          <div className="flex gap-4 mt-4">
            <button
              className={ValidateButtonPost(!isLoading)}
              onClick={() => handleSubmit(State.DRAFT)}
            >
              Rascunho
            </button>
            <button
              className={ValidateButtonPost(!isLoading)}
              onClick={() => handleSubmit(State.POST)}
            >
              Postar
            </button>
          </div>
        </div>
      )}

      {/* <div>{post && post.content}</div> */}
    </div>
  )
}
