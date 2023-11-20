import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    //
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
        <div className="text-lg text-justify"></div>
        {/* e lógica para mostrar o último post */}
      </div>
    </div>
  )
}
