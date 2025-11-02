import { useEffect, useState } from 'react'

import { api } from '../lib/axios'
import { Post } from '../lib/interface'
import { GetItem, RemoveItem, SetItem } from '../lib/localStorage'
import { Path } from '../lib/props'
import { formatDate } from '../lib/utils'

import MarkdownViewer from '../components/MarkdownViewer'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const [posts, setPosts] = useState<Post>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const redirect = GetItem('redirect')
    RemoveItem('redirect')
    // console.log(redirect)
    if (redirect !== undefined && redirect !== null) {
      const token = redirect.split('/')[3]
      if (token) {
        SetItem('token', token)
        router.push(Path.changePass)
      } else router.push(redirect)
    }

    async function call() {
      const response = await api.get('/posts/1')
      // console.log(response)
      setPosts(response.data[0])
      setLoading(true)
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
          {loading && posts && (
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
