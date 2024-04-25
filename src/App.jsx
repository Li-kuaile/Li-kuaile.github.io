import { Routes , Route,Navigate } from 'react-router-dom'

import Blog from './pages/Blog/Blog'
import Resume from './pages/Resume/Resume'
import NotFound from './pages/NotFound/NotFound'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/resume" />} />
      <Route path="/resume" element={<Resume/>} />
      <Route path="/blog/*" element={<Blog/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
