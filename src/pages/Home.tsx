import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '../lib/axios'
import { Post } from '../lib/interface'
import { Path } from '../lib/props'

import MarkdownViewer from '../components/MarkdownViewer'

export default function Home() {
  const navigate = useNavigate()

  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function call() {
      const response = await api.get('/post')
      setPosts(response.data)
    }

    const redirect = localStorage.getItem('redirect')
    console.log(redirect)
    if (redirect !== null) {
      localStorage.removeItem('redirect')
      localStorage.setItem('token', redirect.split('/')[3])
      navigate(Path.changePass)
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
          {posts.length > 0 && (
            <MarkdownViewer key={posts[0].idPost} markdown={posts[0].content} />
          )}
        </div>
      </div>
    </div>
  )
}
