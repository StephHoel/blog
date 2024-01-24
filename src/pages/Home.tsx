import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '../lib/axios'
import { Post } from '../lib/interface'
import { Path } from '../lib/props'
import { formatDate } from '../lib/utils'
import { GetItem, RemoveItem, SetItem } from '../lib/localStorage'

import MarkdownViewer from '../components/MarkdownViewer'

export default function Home() {
  const navigate = useNavigate()

  const [posts, setPosts] = useState<Post>()

  useEffect(() => {
    const redirect = GetItem('redirect')
    RemoveItem('redirect')
    // console.log(redirect)
    if (redirect !== undefined && redirect !== null) {
      const token = redirect.split('/')[3]
      if (token) {
        SetItem('token', token)
        navigate(Path.changePass)
      } else navigate(redirect)
    }

    async function call() {
      const response = await api.get('/posts/1')
      console.log(response)
      setPosts(response.data)
    }

    call()
  }, [])

  return (
    <div className="gap-4 grid">
      <div className="text-center">
        <p className="lg:text-5xl sm:text-3xl font-bold my-4">
          Steph Hoel Blog
        </p>
        <p className="lg:text-2xl sm:text-xl">Compartilhando conhecimento!</p>
      </div>

      <div className="text-center text-2xl">
        <p>Último Post</p>
        <div className="text-lg text-justify">
          {posts && (
            <>
              <p>{posts.title}</p>
              <p>
                {`por 
                ${posts.author.username} 
                em
                ${formatDate(posts.createdAt)} 
                / Última atualização: ${formatDate(posts.updatedAt)}`}
              </p>
              <MarkdownViewer key={posts.idPost} markdown={posts.content} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
