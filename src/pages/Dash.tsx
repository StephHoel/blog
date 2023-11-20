import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { GetLogin } from '../lib/login'
import { Path } from '../lib/props'

export default function Dash() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!GetLogin()) navigate(Path.home)
  }, [navigate])

  return <>Dash Blog</>
}
