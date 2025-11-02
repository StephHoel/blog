import { useEffect, useState } from 'react'

import { api } from '../lib/axios'
import { Post } from '../lib/interface'
import { GetLogin } from '../lib/login'
import { Path, State, Style } from '../lib/props'
import { formatDate } from '../lib/utils'

import LinesList from '../components/LinesList'
import { RemoveItem, SetItem } from '../lib/localStorage'
import { useRouter } from 'next/router'

export default function Dash() {
  const [draft, setDraft] = useState<Post[]>([])
  const [post, setPost] = useState<Post[]>([])

  const router = useRouter()

  function Lines(post: Post[], texto: string) {
    return post.length ? (
      <div className="grid grid-5 w-full justify-between text-xl items-center">
        <LinesList
          firstLine={true}
          date={'Update'}
          title={'Título'}
          content={'Texto'}
        />

        {post.map((line) => (
          <LinesList
            key={line.idPost}
            date={formatDate(line.updatedAt)}
            title={line.title}
            content={
              line.content.substring(0, 50) +
              (line.content.length > 50 ? '...' : '')
            }
            clickTrash={() => {
              DeleteItem(line.idPost)
            }}
            clickPencil={() => {
              SetItem('idPost', line.idPost)
              router.push(Path.edit)
            }}
          />
        ))}
      </div>
    ) : (
      <div className="justify-center items-center text-center text-xl">
        {texto}
      </div>
    )
  }

  async function DeleteItem(idPost: string) {
    await api.delete(`/post/${idPost}`, {
      headers: {
        idauthor: GetLogin(),
      },
    })

    call()
  }

  async function GetPosts(type: string) {
    type = type.toUpperCase()
    const response = await api.get('/post/state/' + type, {
      headers: {
        idauthor: GetLogin(),
      },
    })

    if (response) {
      return response.data
    }
    return []
  }

  async function call() {
    setDraft(await GetPosts(State.DRAFT))
    setPost(await GetPosts(State.POST))
  }

  useEffect(() => {
    if (!GetLogin()) router.push(Path.home)

    RemoveItem('idPost')

    call()
  }, [router])

  return (
    <div className="gap-4 grid">
      <p className={Style.page.title}>Dashboard</p>

      <p className={Style.page.subtitle}>Meus Rascunhos</p>
      {Lines(draft, 'Sem posts no rascunho')}

      <p className={Style.page.subtitle + ' mt-4'}>Minhas Publicações</p>
      {Lines(post, 'Sem posts publicados')}
    </div>
  )
}
