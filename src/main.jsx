import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'

//https://servicodados.ibge.gov.br/api/v1/localidades/estados/23/municipios

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [
      {
        path:"/",
        element: <Home />,
      },
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
<RouterProvider router={router} />
)