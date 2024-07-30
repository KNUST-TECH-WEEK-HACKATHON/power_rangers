import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useMode } from '../store/mode'

const RootLayout = () => {
  const { mode } = useMode();

  useEffect(() => {
    if (mode === 'dark' || (!(mode) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [mode])

  return (
    <div>
        <Outlet />
    </div>
  )
}

export default RootLayout