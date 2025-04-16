import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Notes from './components/Notes'
import ViewNotes from './components/ViewNotes'

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path:"/notes",
      element:
      <div>
        <Navbar />
        <Notes />
      </div>
    },
    {
      path:"/notes/:id",
      element:
      <div>
        <Navbar />
        <ViewNotes />
      </div>
    },
  ]
)
function App() {

  return (
    <>
     <div className=' rounded-xl p-4'>
      <RouterProvider router={router}/>
     </div>
    </>
  )
}

export default App
